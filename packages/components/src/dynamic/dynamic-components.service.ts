import {
    Compiler,
    Inject,
    Injectable,
    NgModuleFactory,
    NgModuleFactoryLoader,
    NgModuleRef,
    Optional,
    Type,
} from '@angular/core';
import { DYNAMIC_COMPONENTS } from '@xm-ngx/components/dynamic/dynamic.injectors';
import { DynamicComponents } from '@xm-ngx/components/dynamic/dynamic.module';
import * as _ from 'lodash';
import { CNgModuleFactory, DynamicComponentsBase, IDynamicComponent } from './dynamic-components-base';

@Injectable()
export class DynamicComponentsService extends DynamicComponentsBase {

    private elementsLoading: Map<string, Promise<Type<unknown>>> = new Map<string, Promise<Type<unknown>>>();

    constructor(private moduleRef: NgModuleRef<unknown>,
                private loader: NgModuleFactoryLoader,
                @Optional() private compiler: Compiler,
                @Optional() @Inject(DYNAMIC_COMPONENTS) protected dynamics: DynamicComponents[]) {
        super(_.keyBy(_.flatMap(dynamics || []), 'selector'));
    }

    public async load<T>(selector: string): Promise<Type<T>> {
        const tR = this.resolve<T>(selector);
        if (tR) {
            return tR;
        }

        if (this.elementsLoading.has(selector)) {
            return await this.elementsLoading.get(selector) as Type<T>;
        }

        const dynamicElement = this.getSync<T>(selector);
        const loadedElement = this.getLazyComponent<T>(dynamicElement);
        this.elementsLoading.set(selector, loadedElement);

        return await loadedElement;
    }

    public loadTenantModuleFactory<T>(selector: string): Promise<CNgModuleFactory<T>> {
        const module = selector.split('/')[0];

        const modulePath = this.resolveTenantModulePath(module);

        return this.loadModuleFactory(modulePath);
    }

    public resolveTenantModulePath(module: string): string {
        const commons: string[] = ['ext-common', 'ext-common-csp', 'ext-common-entity'];

        const rootClass = module.split('-').map((e) => e[0].toUpperCase() + e.slice(1)).join('');
        const extName = module.split('-').reverse()[0];
        const extRootClass = `${extName.charAt(0).toUpperCase() + extName.slice(1)}WebappExtModule`;
        let modulePath: string;
        if (commons.includes(module)) {
            modulePath = `src/app/ext-commons/${module}/${module}.module#${rootClass}Module`;
        } else {
            modulePath = `src/app/ext/${extName}-webapp-ext/module/${extName}-webapp-ext.module#${extRootClass}`;
        }

        return modulePath;
    }

    public async loadModuleFactory<T>(moduleImport: Promise<CNgModuleFactory<T>> | string): Promise<CNgModuleFactory<T>> {
        let elementModuleOrFactory: CNgModuleFactory<T>;
        if (typeof moduleImport === 'string') {
            elementModuleOrFactory = await this.loader.load(moduleImport);
        } else {
            elementModuleOrFactory = await moduleImport;
        }

        let elModuleFactory: CNgModuleFactory<T>;
        if (elementModuleOrFactory instanceof NgModuleFactory) {
            elModuleFactory = elementModuleOrFactory as CNgModuleFactory;
        } else {
            elModuleFactory = await this.compiler.compileModuleAsync(elementModuleOrFactory) as CNgModuleFactory;
        }

        return elModuleFactory;
    }

    private async getLazyComponent<T>(lazy: IDynamicComponent<T>): Promise<Type<T>> {
        if (!lazy.loadChildren) {
            throw new Error(`The "${lazy.selector}" is not lazy component!`);
        }

        const elmoduleFactory = await this.loadModuleFactory<T>(lazy.loadChildren());
        const elementModuleRef = elmoduleFactory.create(this.moduleRef.injector);
        if (!elementModuleRef.instance.entry || elementModuleRef.instance.resolve) {
            throw new Error(`ERROR: the "${elmoduleFactory.moduleType}" module expected to have `
                + 'a "entry" field or "resolve" method!'
                + 'E.g. class MyClass{ entry = YourComponent; }');
        }

        return elementModuleRef.instance.entry || await elementModuleRef.instance.resolve(lazy.selector);
    }
}
