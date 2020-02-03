import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { UiConfigService } from '../../../modules/xm-sidebar/config/ui-config.service';
import { FeedbackDialogComponent } from './feedback-dialog/feedback-dialog.component';
import { FeedbackService } from './feedback.service';

export interface FeedbackConfig {
    feedback: {
        url: string;
    };
}

@Component({
    selector: 'xm-feedback',
    template: `
        <button *ngIf="showFeedback$ | async as config" (click)="create(config.feedback.url)" mat-button>
            <mat-icon>feedback</mat-icon>
        </button>
    `,
})
export class FeedbackComponent implements OnInit {

    public showFeedback$: Observable<FeedbackConfig>;

    constructor(protected uiConfigService: UiConfigService<FeedbackConfig>,
                protected dialog: MatDialog,
                protected feedbackService: FeedbackService) {
    }

    public ngOnInit(): void {
        this.showFeedback$ = this.uiConfigService.cache$.pipe(
            filter((i) => Boolean(i && i.feedback)));
    }

    public create(url?: string): void {
        const dialogRef = this.dialog.open(FeedbackDialogComponent, {
            width: '500px',
        });

        dialogRef.afterClosed().pipe(
            filter((i) => i),
            switchMap(res => this.feedbackService.create(res, url)),
        ).subscribe();
    }
}
