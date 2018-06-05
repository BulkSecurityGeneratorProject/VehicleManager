import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VehicleManagerSharedModule } from '../../shared';
import {
    JobDrnService,
    JobDrnPopupService,
    JobDrnComponent,
    JobDrnDetailComponent,
    JobDrnDialogComponent,
    JobDrnPopupComponent,
    JobDrnDeletePopupComponent,
    JobDrnDeleteDialogComponent,
    jobRoute,
    jobPopupRoute,
    JobDrnResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...jobRoute,
    ...jobPopupRoute,
];

@NgModule({
    imports: [
        VehicleManagerSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        JobDrnComponent,
        JobDrnDetailComponent,
        JobDrnDialogComponent,
        JobDrnDeleteDialogComponent,
        JobDrnPopupComponent,
        JobDrnDeletePopupComponent,
    ],
    entryComponents: [
        JobDrnComponent,
        JobDrnDialogComponent,
        JobDrnPopupComponent,
        JobDrnDeleteDialogComponent,
        JobDrnDeletePopupComponent,
    ],
    providers: [
        JobDrnService,
        JobDrnPopupService,
        JobDrnResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleManagerJobDrnModule {}
