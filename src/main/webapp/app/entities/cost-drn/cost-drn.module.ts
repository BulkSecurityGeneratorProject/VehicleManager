import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VehicleManagerSharedModule } from '../../shared';
import {
    CostDrnService,
    CostDrnPopupService,
    CostDrnComponent,
    CostDrnDetailComponent,
    CostDrnDialogComponent,
    CostDrnPopupComponent,
    CostDrnDeletePopupComponent,
    CostDrnDeleteDialogComponent,
    costRoute,
    costPopupRoute,
    CostDrnResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...costRoute,
    ...costPopupRoute,
];

@NgModule({
    imports: [
        VehicleManagerSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CostDrnComponent,
        CostDrnDetailComponent,
        CostDrnDialogComponent,
        CostDrnDeleteDialogComponent,
        CostDrnPopupComponent,
        CostDrnDeletePopupComponent,
    ],
    entryComponents: [
        CostDrnComponent,
        CostDrnDialogComponent,
        CostDrnPopupComponent,
        CostDrnDeleteDialogComponent,
        CostDrnDeletePopupComponent,
    ],
    providers: [
        CostDrnService,
        CostDrnPopupService,
        CostDrnResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleManagerCostDrnModule {}
