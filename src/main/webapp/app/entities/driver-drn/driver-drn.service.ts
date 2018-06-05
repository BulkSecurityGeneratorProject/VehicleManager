import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { DriverDrn } from './driver-drn.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DriverDrn>;

@Injectable()
export class DriverDrnService {

    private resourceUrl =  SERVER_API_URL + 'api/drivers';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(driver: DriverDrn): Observable<EntityResponseType> {
        const copy = this.convert(driver);
        return this.http.post<DriverDrn>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(driver: DriverDrn): Observable<EntityResponseType> {
        const copy = this.convert(driver);
        return this.http.put<DriverDrn>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DriverDrn>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DriverDrn[]>> {
        const options = createRequestOption(req);
        return this.http.get<DriverDrn[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DriverDrn[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DriverDrn = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DriverDrn[]>): HttpResponse<DriverDrn[]> {
        const jsonResponse: DriverDrn[] = res.body;
        const body: DriverDrn[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DriverDrn.
     */
    private convertItemFromServer(driver: DriverDrn): DriverDrn {
        const copy: DriverDrn = Object.assign({}, driver);
        copy.createdDateTime = this.dateUtils
            .convertDateTimeFromServer(driver.createdDateTime);
        copy.modifiedDateTime = this.dateUtils
            .convertDateTimeFromServer(driver.modifiedDateTime);
        return copy;
    }

    /**
     * Convert a DriverDrn to a JSON which can be sent to the server.
     */
    private convert(driver: DriverDrn): DriverDrn {
        const copy: DriverDrn = Object.assign({}, driver);

        copy.createdDateTime = this.dateUtils.toDate(driver.createdDateTime);

        copy.modifiedDateTime = this.dateUtils.toDate(driver.modifiedDateTime);
        return copy;
    }
}
