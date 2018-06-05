import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DriverDrn } from './driver-drn.model';
import { DriverDrnService } from './driver-drn.service';

@Component({
    selector: 'jhi-driver-drn-detail',
    templateUrl: './driver-drn-detail.component.html'
})
export class DriverDrnDetailComponent implements OnInit, OnDestroy {

    driver: DriverDrn;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private driverService: DriverDrnService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDrivers();
    }

    load(id) {
        this.driverService.find(id)
            .subscribe((driverResponse: HttpResponse<DriverDrn>) => {
                this.driver = driverResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDrivers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'driverListModification',
            (response) => this.load(this.driver.id)
        );
    }
}
