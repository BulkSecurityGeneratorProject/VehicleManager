import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DriverDrn } from './driver-drn.model';
import { DriverDrnPopupService } from './driver-drn-popup.service';
import { DriverDrnService } from './driver-drn.service';

@Component({
    selector: 'jhi-driver-drn-dialog',
    templateUrl: './driver-drn-dialog.component.html'
})
export class DriverDrnDialogComponent implements OnInit {

    driver: DriverDrn;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private driverService: DriverDrnService,
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
        if (this.driver.id !== undefined) {
            this.subscribeToSaveResponse(
                this.driverService.update(this.driver));
        } else {
            this.subscribeToSaveResponse(
                this.driverService.create(this.driver));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DriverDrn>>) {
        result.subscribe((res: HttpResponse<DriverDrn>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DriverDrn) {
        this.eventManager.broadcast({ name: 'driverListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-driver-drn-popup',
    template: ''
})
export class DriverDrnPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private driverPopupService: DriverDrnPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.driverPopupService
                    .open(DriverDrnDialogComponent as Component, params['id']);
            } else {
                this.driverPopupService
                    .open(DriverDrnDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
