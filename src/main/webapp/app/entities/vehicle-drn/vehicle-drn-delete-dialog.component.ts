import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleDrn } from './vehicle-drn.model';
import { VehicleDrnPopupService } from './vehicle-drn-popup.service';
import { VehicleDrnService } from './vehicle-drn.service';

@Component({
    selector: 'jhi-vehicle-drn-delete-dialog',
    templateUrl: './vehicle-drn-delete-dialog.component.html'
})
export class VehicleDrnDeleteDialogComponent {

    vehicle: VehicleDrn;

    constructor(
        private vehicleService: VehicleDrnService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.vehicleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'vehicleListModification',
                content: 'Deleted an vehicle'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vehicle-drn-delete-popup',
    template: ''
})
export class VehicleDrnDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vehiclePopupService: VehicleDrnPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.vehiclePopupService
                .open(VehicleDrnDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
