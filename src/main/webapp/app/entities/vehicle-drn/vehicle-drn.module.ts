import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VehicleManagerSharedModule } from '../../shared';
import {
    VehicleDrnService,
    VehicleDrnPopupService,
    VehicleDrnComponent,
    VehicleDrnDetailComponent,
    VehicleDrnDialogComponent,
    VehicleDrnPopupComponent,
    VehicleDrnDeletePopupComponent,
    VehicleDrnDeleteDialogComponent,
    vehicleRoute,
    vehiclePopupRoute,
    VehicleDrnResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...vehicleRoute,
    ...vehiclePopupRoute,
];

@NgModule({
    imports: [
        VehicleManagerSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VehicleDrnComponent,
        VehicleDrnDetailComponent,
        VehicleDrnDialogComponent,
        VehicleDrnDeleteDialogComponent,
        VehicleDrnPopupComponent,
        VehicleDrnDeletePopupComponent,
    ],
    entryComponents: [
        VehicleDrnComponent,
        VehicleDrnDialogComponent,
        VehicleDrnPopupComponent,
        VehicleDrnDeleteDialogComponent,
        VehicleDrnDeletePopupComponent,
    ],
    providers: [
        VehicleDrnService,
        VehicleDrnPopupService,
        VehicleDrnResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleManagerVehicleDrnModule {}
