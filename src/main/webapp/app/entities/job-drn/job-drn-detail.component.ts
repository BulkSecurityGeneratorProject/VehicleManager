import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { JobDrn } from './job-drn.model';
import { JobDrnService } from './job-drn.service';

@Component({
    selector: 'jhi-job-drn-detail',
    templateUrl: './job-drn-detail.component.html'
})
export class JobDrnDetailComponent implements OnInit, OnDestroy {

    job: JobDrn;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private jobService: JobDrnService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInJobs();
    }

    load(id) {
        this.jobService.find(id)
            .subscribe((jobResponse: HttpResponse<JobDrn>) => {
                this.job = jobResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJobs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'jobListModification',
            (response) => this.load(this.job.id)
        );
    }
}
