import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CostDrn } from './cost-drn.model';
import { CostDrnService } from './cost-drn.service';

@Component({
    selector: 'jhi-cost-drn-detail',
    templateUrl: './cost-drn-detail.component.html'
})
export class CostDrnDetailComponent implements OnInit, OnDestroy {

    cost: CostDrn;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private costService: CostDrnService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCosts();
    }

    load(id) {
        this.costService.find(id)
            .subscribe((costResponse: HttpResponse<CostDrn>) => {
                this.cost = costResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCosts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'costListModification',
            (response) => this.load(this.cost.id)
        );
    }
}
