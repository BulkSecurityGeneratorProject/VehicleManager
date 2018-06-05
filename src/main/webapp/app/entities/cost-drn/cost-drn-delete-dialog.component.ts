import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CostDrn } from './cost-drn.model';
import { CostDrnPopupService } from './cost-drn-popup.service';
import { CostDrnService } from './cost-drn.service';

@Component({
    selector: 'jhi-cost-drn-delete-dialog',
    templateUrl: './cost-drn-delete-dialog.component.html'
})
export class CostDrnDeleteDialogComponent {

    cost: CostDrn;

    constructor(
        private costService: CostDrnService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.costService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'costListModification',
                content: 'Deleted an cost'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cost-drn-delete-popup',
    template: ''
})
export class CostDrnDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private costPopupService: CostDrnPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.costPopupService
                .open(CostDrnDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
