import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { JobWorkerDrn } from './job-worker-drn.model';
import { JobWorkerDrnService } from './job-worker-drn.service';

@Component({
    selector: 'jhi-job-worker-drn-detail',
    templateUrl: './job-worker-drn-detail.component.html'
})
export class JobWorkerDrnDetailComponent implements OnInit, OnDestroy {

    jobWorker: JobWorkerDrn;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private jobWorkerService: JobWorkerDrnService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInJobWorkers();
    }

    load(id) {
        this.jobWorkerService.find(id)
            .subscribe((jobWorkerResponse: HttpResponse<JobWorkerDrn>) => {
                this.jobWorker = jobWorkerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJobWorkers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'jobWorkerListModification',
            (response) => this.load(this.jobWorker.id)
        );
    }
}
