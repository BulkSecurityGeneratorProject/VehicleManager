import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { DriverDrnComponent } from './driver-drn.component';
import { DriverDrnDetailComponent } from './driver-drn-detail.component';
import { DriverDrnPopupComponent } from './driver-drn-dialog.component';
import { DriverDrnDeletePopupComponent } from './driver-drn-delete-dialog.component';

@Injectable()
export class DriverDrnResolvePagingParams implements Resolve<any> {

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

export const driverRoute: Routes = [
    {
        path: 'driver-drn',
        component: DriverDrnComponent,
        resolve: {
            'pagingParams': DriverDrnResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApp.driver.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'driver-drn/:id',
        component: DriverDrnDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApp.driver.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const driverPopupRoute: Routes = [
    {
        path: 'driver-drn-new',
        component: DriverDrnPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApp.driver.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'driver-drn/:id/edit',
        component: DriverDrnPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApp.driver.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'driver-drn/:id/delete',
        component: DriverDrnDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApp.driver.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
