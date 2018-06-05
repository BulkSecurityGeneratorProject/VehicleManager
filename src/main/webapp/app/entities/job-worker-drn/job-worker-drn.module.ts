import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VehicleManagerSharedModule } from '../../shared';
import {
    JobWorkerDrnService,
    JobWorkerDrnPopupService,
    JobWorkerDrnComponent,
    JobWorkerDrnDetailComponent,
    JobWorkerDrnDialogComponent,
    JobWorkerDrnPopupComponent,
    JobWorkerDrnDeletePopupComponent,
    JobWorkerDrnDeleteDialogComponent,
    jobWorkerRoute,
    jobWorkerPopupRoute,
    JobWorkerDrnResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...jobWorkerRoute,
    ...jobWorkerPopupRoute,
];

@NgModule({
    imports: [
        VehicleManagerSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        JobWorkerDrnComponent,
        JobWorkerDrnDetailComponent,
        JobWorkerDrnDialogComponent,
        JobWorkerDrnDeleteDialogComponent,
        JobWorkerDrnPopupComponent,
        JobWorkerDrnDeletePopupComponent,
    ],
    entryComponents: [
        JobWorkerDrnComponent,
        JobWorkerDrnDialogComponent,
        JobWorkerDrnPopupComponent,
        JobWorkerDrnDeleteDialogComponent,
        JobWorkerDrnDeletePopupComponent,
    ],
    providers: [
        JobWorkerDrnService,
        JobWorkerDrnPopupService,
        JobWorkerDrnResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleManagerJobWorkerDrnModule {}
