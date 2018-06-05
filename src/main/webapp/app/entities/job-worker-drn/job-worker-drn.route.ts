import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { JobWorkerDrnComponent } from './job-worker-drn.component';
import { JobWorkerDrnDetailComponent } from './job-worker-drn-detail.component';
import { JobWorkerDrnPopupComponent } from './job-worker-drn-dialog.component';
import { JobWorkerDrnDeletePopupComponent } from './job-worker-drn-delete-dialog.component';

@Injectable()
export class JobWorkerDrnResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const jobWorkerRoute: Routes = [
    {
        path: 'job-worker-drn',
        component: JobWorkerDrnComponent,
        resolve: {
            'pagingParams': JobWorkerDrnResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApp.jobWorker.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'job-worker-drn/:id',
        component: JobWorkerDrnDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApp.jobWorker.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobWorkerPopupRoute: Routes = [
    {
        path: 'job-worker-drn-new',
        component: JobWorkerDrnPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApp.jobWorker.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'job-worker-drn/:id/edit',
        component: JobWorkerDrnPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApp.jobWorker.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'job-worker-drn/:id/delete',
        component: JobWorkerDrnDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApp.jobWorker.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
