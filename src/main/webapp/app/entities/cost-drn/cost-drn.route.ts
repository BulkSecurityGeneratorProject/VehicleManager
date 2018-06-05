import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CostDrnComponent } from './cost-drn.component';
import { CostDrnDetailComponent } from './cost-drn-detail.component';
import { CostDrnPopupComponent } from './cost-drn-dialog.component';
import { CostDrnDeletePopupComponent } from './cost-drn-delete-dialog.component';

@Injectable()
export class CostDrnResolvePagingParams implements Resolve<any> {

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

export const costRoute: Routes = [
    {
        path: 'cost-drn',
        component: CostDrnComponent,
        resolve: {
            'pagingParams': CostDrnResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApp.cost.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cost-drn/:id',
        component: CostDrnDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApp.cost.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const costPopupRoute: Routes = [
    {
        path: 'cost-drn-new',
        component: CostDrnPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApp.cost.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cost-drn/:id/edit',
        component: CostDrnPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApp.cost.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cost-drn/:id/delete',
        component: CostDrnDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApp.cost.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
