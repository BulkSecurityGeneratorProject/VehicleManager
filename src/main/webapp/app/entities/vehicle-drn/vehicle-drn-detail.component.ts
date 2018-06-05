import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleDrn } from './vehicle-drn.model';
import { VehicleDrnService } from './vehicle-drn.service';

@Component({
    selector: 'jhi-vehicle-drn-detail',
    templateUrl: './vehicle-drn-detail.component.html'
})
export class VehicleDrnDetailComponent implements OnInit, OnDestroy {

    vehicle: VehicleDrn;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private vehicleService: VehicleDrnService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInVehicles();
    }

    load(id) {
        this.vehicleService.find(id)
            .subscribe((vehicleResponse: HttpResponse<VehicleDrn>) => {
                this.vehicle = vehicleResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInVehicles() {
        this.eventSubscriber = this.eventManager.subscribe(
            'vehicleListModification',
            (response) => this.load(this.vehicle.id)
        );
    }
}
