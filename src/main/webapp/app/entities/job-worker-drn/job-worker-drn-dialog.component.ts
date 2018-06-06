import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { JobWorkerDrn } from './job-worker-drn.model';
import { JobWorkerDrnPopupService } from './job-worker-drn-popup.service';
import { JobWorkerDrnService } from './job-worker-drn.service';
import { JobDrn, JobDrnService } from '../job-drn';
import { DriverDrn, DriverDrnService } from '../driver-drn';

@Component({
    selector: 'jhi-job-worker-drn-dialog',
    templateUrl: './job-worker-drn-dialog.component.html'
})
export class JobWorkerDrnDialogComponent implements OnInit {

    jobWorker: JobWorkerDrn;
    isSaving: boolean;

    jobs: JobDrn[];

    drivers: DriverDrn[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private jobWorkerService: JobWorkerDrnService,
        private jobService: JobDrnService,
        private driverService: DriverDrnService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.jobService.query()
            .subscribe((res: HttpResponse<JobDrn[]>) => { this.jobs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.driverService.query()
            .subscribe((res: HttpResponse<DriverDrn[]>) => { this.drivers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.jobWorker.id !== undefined) {
            this.subscribeToSaveResponse(
                this.jobWorkerService.update(this.jobWorker));
        } else {
            this.subscribeToSaveResponse(
                this.jobWorkerService.create(this.jobWorker));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<JobWorkerDrn>>) {
        result.subscribe((res: HttpResponse<JobWorkerDrn>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: JobWorkerDrn) {
        this.eventManager.broadcast({ name: 'jobWorkerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
        this.jhiAlertService.error('vehicleManagerApp.jobWorker.reachedTheLimitForReservations', null, null);
        this.activeModal.dismiss(true);
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackJobById(index: number, item: JobDrn) {
        return item.id;
    }

    trackDriverById(index: number, item: DriverDrn) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-job-worker-drn-popup',
    template: ''
})
export class JobWorkerDrnPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jobWorkerPopupService: JobWorkerDrnPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.jobWorkerPopupService
                    .open(JobWorkerDrnDialogComponent as Component, params['id']);
            } else {
                this.jobWorkerPopupService
                    .open(JobWorkerDrnDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
