import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JobWorkerDrn } from './job-worker-drn.model';
import { JobWorkerDrnPopupService } from './job-worker-drn-popup.service';
import { JobWorkerDrnService } from './job-worker-drn.service';

@Component({
    selector: 'jhi-job-worker-drn-delete-dialog',
    templateUrl: './job-worker-drn-delete-dialog.component.html'
})
export class JobWorkerDrnDeleteDialogComponent {

    jobWorker: JobWorkerDrn;

    constructor(
        private jobWorkerService: JobWorkerDrnService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jobWorkerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'jobWorkerListModification',
                content: 'Deleted an jobWorker'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-job-worker-drn-delete-popup',
    template: ''
})
export class JobWorkerDrnDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jobWorkerPopupService: JobWorkerDrnPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.jobWorkerPopupService
                .open(JobWorkerDrnDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
