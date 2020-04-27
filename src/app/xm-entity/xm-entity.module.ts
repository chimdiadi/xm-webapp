import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EntityStateModule } from '@xm-ngx/entity/entity-state';
import { StatesManagementDialogModule } from '@xm-ngx/entity/states-management-dialog';
import { TagInputModule } from 'ngx-chips';
import { ImageCropperModule } from 'ngx-img-cropper';
import { RatingModule } from '@xm-ngx/components/xm-rating';

import { XmSharedModule } from '../shared/shared.module';
import {
    AreaComponent,
    AttachmentCardComponent,
    AttachmentDetailDialogComponent,
    AttachmentListComponent,
    AttachmentService,
    AvatarDialogComponent,
    CalendarCardComponent,
    CalendarEventDialogComponent,
    CalendarService,
    CommentCardComponent,
    CommentDetailDialogComponent,
    CommentListComponent,
    CommentService,
    ContentService,
    EntityCardCompactComponent,
    EntityCardComponent,
    EntityDataCardComponent,
    EntityDetailDialogComponent,
    EntityDetailFabComponent,
    EntityListCardComponent,
    EntityListFabComponent,
    EventService,
    FunctionCallDialogComponent,
    FunctionContextService,
    FunctionListSectionCompactComponent,
    FunctionListSectionComponent,
    FunctionService,
    LinkDetailDialogComponent,
    LinkDetailNewSectionComponent,
    LinkDetailSearchSectionComponent,
    LinkedinDataItemComponent,
    LinkedinProfileComponent,
    LinkListCardComponent,
    LinkListComponent,
    LinkListTreeSectionComponent,
    LinkService,
    LocationCardNamePipe,
    LocationDetailDialogComponent,
    LocationListCardComponent,
    LocationService,
    OsmPolygonDialogComponent,
    OverpassApiService,
    RatingListSectionComponent,
    RatingService,
    TagListSectionComponent,
    TagService,
    VoteService,
    XmEntityService,
    XmEntitySpecService,
} from './';
import { AttachmentListBaseComponent } from './attachment-list/attachment-list-base.component';
import { AttachmentListSimplifiedComponent } from './attachment-list/attachment-list-simplified.component';

import { StateChangeDialogComponent } from './state-change-dialog/state-change-dialog.component';

const MODULES = [
    StatesManagementDialogModule,
    EntityStateModule,
];

@NgModule({
    imports: [
        CommonModule,
        XmSharedModule,
        RouterModule,
        ImageCropperModule,
        RatingModule,
        TagInputModule,
        MODULES,
    ],
    declarations: [
        AreaComponent,
        AttachmentCardComponent,
        AttachmentDetailDialogComponent,
        AttachmentListComponent,
        AvatarDialogComponent,
        CalendarCardComponent,
        CalendarEventDialogComponent,
        CommentCardComponent,
        CommentDetailDialogComponent,
        CommentListComponent,
        EntityCardComponent,
        EntityCardCompactComponent,
        EntityDataCardComponent,
        EntityDetailDialogComponent,
        EntityDetailFabComponent,
        EntityListCardComponent,
        EntityListFabComponent,
        FunctionCallDialogComponent,
        StateChangeDialogComponent,
        FunctionListSectionComponent,
        FunctionListSectionCompactComponent,
        LinkDetailDialogComponent,
        LinkDetailNewSectionComponent,
        LinkDetailSearchSectionComponent,
        LinkedinProfileComponent,
        LinkedinDataItemComponent,
        LinkListComponent,
        LinkListCardComponent,
        LinkListTreeSectionComponent,
        LocationDetailDialogComponent,
        LocationListCardComponent,
        OsmPolygonDialogComponent,
        RatingListSectionComponent,
        TagListSectionComponent,
        EntityListFabComponent,
        LocationCardNamePipe,
        AttachmentListSimplifiedComponent,
        AttachmentListBaseComponent,
    ],
    entryComponents: [
        AttachmentDetailDialogComponent,
        AvatarDialogComponent,
        CalendarEventDialogComponent,
        CommentDetailDialogComponent,
        EntityDetailDialogComponent,
        FunctionCallDialogComponent,
        StateChangeDialogComponent,
        LinkDetailDialogComponent,
        LocationDetailDialogComponent,
        OsmPolygonDialogComponent,
    ],
    exports: [
        MODULES,
        AreaComponent,
        AttachmentCardComponent,
        AttachmentListComponent,
        AttachmentListSimplifiedComponent,
        CalendarCardComponent,
        CommentCardComponent,
        CommentListComponent,
        EntityCardComponent,
        EntityCardCompactComponent,
        EntityDataCardComponent,
        EntityDetailFabComponent,
        EntityListCardComponent,
        EntityListFabComponent,
        FunctionListSectionComponent,
        FunctionListSectionCompactComponent,
        LinkDetailNewSectionComponent,
        LinkDetailSearchSectionComponent,
        LinkListComponent,
        LinkListCardComponent,
        LocationListCardComponent,
        RatingListSectionComponent,
        TagListSectionComponent,
    ],
    providers: [
        AttachmentService,
        CalendarService,
        CommentService,
        ContentService,
        EventService,
        FunctionService,
        FunctionContextService,
        LinkService,
        LocationService,
        OverpassApiService,
        RatingService,
        TagService,
        VoteService,
        XmEntityService,
        XmEntitySpecService,
    ],
})
export class XmEntityModule {
}
