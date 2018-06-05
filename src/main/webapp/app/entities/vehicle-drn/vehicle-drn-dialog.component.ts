import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleDrn } from './vehicle-drn.model';
import { VehicleDrnPopupService } from './vehicle-drn-popup.service';
import { VehicleDrnService } from './vehicle-drn.service';

@Component({
    selector: 'jhi-vehicle-drn-dialog',
    templateUrl: './vehicle-drn-dialog.component.html'
})
export class VehicleDrnDialogComponent implements OnInit {

    vehicle: VehicleDrn;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private vehicleService: VehicleDrnService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.vehicle.id !== undefined) {
            this.subscribeToSaveResponse(
                this.vehicleService.update(this.vehicle));
        } else {
            this.subscribeToSaveResponse(
                this.vehicleService.create(this.vehicle));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<VehicleDrn>>) {
        result.subscribe((res: HttpResponse<VehicleDrn>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VehicleDrn) {
        this.eventManager.broadcast({ name: 'vehicleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-vehicle-drn-popup',
    template: ''
})
export class VehicleDrnPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vehiclePopupService: VehicleDrnPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.vehiclePopupService
                    .open(VehicleDrnDialogComponent as Component, params['id']);
            } else {
                this.vehiclePopupService
                    .open(VehicleDrnDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
