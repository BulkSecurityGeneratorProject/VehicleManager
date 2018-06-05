import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { JobWorkerDrn } from './job-worker-drn.model';
import { JobWorkerDrnService } from './job-worker-drn.service';

@Injectable()
export class JobWorkerDrnPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private jobWorkerService: JobWorkerDrnService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.jobWorkerService.find(id)
                    .subscribe((jobWorkerResponse: HttpResponse<JobWorkerDrn>) => {
                        const jobWorker: JobWorkerDrn = jobWorkerResponse.body;
                        jobWorker.createdDateTime = this.datePipe
                            .transform(jobWorker.createdDateTime, 'yyyy-MM-ddTHH:mm:ss');
                        jobWorker.modifiedDateTime = this.datePipe
                            .transform(jobWorker.modifiedDateTime, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.jobWorkerModalRef(component, jobWorker);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.jobWorkerModalRef(component, new JobWorkerDrn());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    jobWorkerModalRef(component: Component, jobWorker: JobWorkerDrn): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.jobWorker = jobWorker;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
