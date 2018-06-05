import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CostDrn } from './cost-drn.model';
import { CostDrnPopupService } from './cost-drn-popup.service';
import { CostDrnService } from './cost-drn.service';
import { VehicleDrn, VehicleDrnService } from '../vehicle-drn';

@Component({
    selector: 'jhi-cost-drn-dialog',
    templateUrl: './cost-drn-dialog.component.html'
})
export class CostDrnDialogComponent implements OnInit {

    cost: CostDrn;
    isSaving: boolean;

    vehicles: VehicleDrn[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private costService: CostDrnService,
        private vehicleService: VehicleDrnService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.vehicleService
            .query({filter: 'cost-is-null'})
            .subscribe((res: HttpResponse<VehicleDrn[]>) => {
                if (!this.cost.vehicleId) {
                    this.vehicles = res.body;
                } else {
                    this.vehicleService
                        .find(this.cost.vehicleId)
                        .subscribe((subRes: HttpResponse<VehicleDrn>) => {
                            this.vehicles = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cost.id !== undefined) {
            this.subscribeToSaveResponse(
                this.costService.update(this.cost));
        } else {
            this.subscribeToSaveResponse(
                this.costService.create(this.cost));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CostDrn>>) {
        result.subscribe((res: HttpResponse<CostDrn>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CostDrn) {
        this.eventManager.broadcast({ name: 'costListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackVehicleById(index: number, item: VehicleDrn) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cost-drn-popup',
    template: ''
})
export class CostDrnPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private costPopupService: CostDrnPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.costPopupService
                    .open(CostDrnDialogComponent as Component, params['id']);
            } else {
                this.costPopupService
                    .open(CostDrnDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
