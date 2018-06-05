import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { JobDrn } from './job-drn.model';
import { JobDrnPopupService } from './job-drn-popup.service';
import { JobDrnService } from './job-drn.service';
import { VehicleDrn, VehicleDrnService } from '../vehicle-drn';

@Component({
    selector: 'jhi-job-drn-dialog',
    templateUrl: './job-drn-dialog.component.html'
})
export class JobDrnDialogComponent implements OnInit {

    job: JobDrn;
    isSaving: boolean;

    vehicles: VehicleDrn[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private jobService: JobDrnService,
        private vehicleService: VehicleDrnService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.vehicleService.query()
            .subscribe((res: HttpResponse<VehicleDrn[]>) => { this.vehicles = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.job.id !== undefined) {
            this.subscribeToSaveResponse(
                this.jobService.update(this.job));
        } else {
            this.subscribeToSaveResponse(
                this.jobService.create(this.job));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<JobDrn>>) {
        result.subscribe((res: HttpResponse<JobDrn>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: JobDrn) {
        this.eventManager.broadcast({ name: 'jobListModification', content: 'OK'});
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
    selector: 'jhi-job-drn-popup',
    template: ''
})
export class JobDrnPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jobPopupService: JobDrnPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.jobPopupService
                    .open(JobDrnDialogComponent as Component, params['id']);
            } else {
                this.jobPopupService
                    .open(JobDrnDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
