import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VehicleManagerSharedModule } from '../../shared';
import {
    DriverDrnService,
    DriverDrnPopupService,
    DriverDrnComponent,
    DriverDrnDetailComponent,
    DriverDrnDialogComponent,
    DriverDrnPopupComponent,
    DriverDrnDeletePopupComponent,
    DriverDrnDeleteDialogComponent,
    driverRoute,
    driverPopupRoute,
    DriverDrnResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...driverRoute,
    ...driverPopupRoute,
];

@NgModule({
    imports: [
        VehicleManagerSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DriverDrnComponent,
        DriverDrnDetailComponent,
        DriverDrnDialogComponent,
        DriverDrnDeleteDialogComponent,
        DriverDrnPopupComponent,
        DriverDrnDeletePopupComponent,
    ],
    entryComponents: [
        DriverDrnComponent,
        DriverDrnDialogComponent,
        DriverDrnPopupComponent,
        DriverDrnDeleteDialogComponent,
        DriverDrnDeletePopupComponent,
    ],
    providers: [
        DriverDrnService,
        DriverDrnPopupService,
        DriverDrnResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleManagerDriverDrnModule {}
