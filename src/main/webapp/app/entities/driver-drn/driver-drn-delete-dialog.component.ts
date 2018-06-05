import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DriverDrn } from './driver-drn.model';
import { DriverDrnPopupService } from './driver-drn-popup.service';
import { DriverDrnService } from './driver-drn.service';

@Component({
    selector: 'jhi-driver-drn-delete-dialog',
    templateUrl: './driver-drn-delete-dialog.component.html'
})
export class DriverDrnDeleteDialogComponent {

    driver: DriverDrn;

    constructor(
        private driverService: DriverDrnService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.driverService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'driverListModification',
                content: 'Deleted an driver'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-driver-drn-delete-popup',
    template: ''
})
export class DriverDrnDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private driverPopupService: DriverDrnPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.driverPopupService
                .open(DriverDrnDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
