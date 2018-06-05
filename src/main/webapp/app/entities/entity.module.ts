import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { VehicleManagerVehicleDrnModule } from './vehicle-drn/vehicle-drn.module';
import { VehicleManagerJobDrnModule } from './job-drn/job-drn.module';
import { VehicleManagerJobWorkerDrnModule } from './job-worker-drn/job-worker-drn.module';
import { VehicleManagerDriverDrnModule } from './driver-drn/driver-drn.module';
import { VehicleManagerCostDrnModule } from './cost-drn/cost-drn.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        VehicleManagerVehicleDrnModule,
        VehicleManagerJobDrnModule,
        VehicleManagerJobWorkerDrnModule,
        VehicleManagerDriverDrnModule,
        VehicleManagerCostDrnModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleManagerEntityModule {}
