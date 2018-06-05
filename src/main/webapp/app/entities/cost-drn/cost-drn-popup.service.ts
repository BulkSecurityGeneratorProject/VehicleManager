import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CostDrn } from './cost-drn.model';
import { CostDrnService } from './cost-drn.service';

@Injectable()
export class CostDrnPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private costService: CostDrnService

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
                this.costService.find(id)
                    .subscribe((costResponse: HttpResponse<CostDrn>) => {
                        const cost: CostDrn = costResponse.body;
                        cost.createdDateTime = this.datePipe
                            .transform(cost.createdDateTime, 'yyyy-MM-ddTHH:mm:ss');
                        cost.modifiedDateTime = this.datePipe
                            .transform(cost.modifiedDateTime, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.costModalRef(component, cost);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.costModalRef(component, new CostDrn());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    costModalRef(component: Component, cost: CostDrn): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cost = cost;
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
