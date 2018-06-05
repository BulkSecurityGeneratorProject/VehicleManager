import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CostDrn } from './cost-drn.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CostDrn>;

@Injectable()
export class CostDrnService {

    private resourceUrl =  SERVER_API_URL + 'api/costs';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(cost: CostDrn): Observable<EntityResponseType> {
        const copy = this.convert(cost);
        return this.http.post<CostDrn>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cost: CostDrn): Observable<EntityResponseType> {
        const copy = this.convert(cost);
        return this.http.put<CostDrn>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CostDrn>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CostDrn[]>> {
        const options = createRequestOption(req);
        return this.http.get<CostDrn[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CostDrn[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CostDrn = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CostDrn[]>): HttpResponse<CostDrn[]> {
        const jsonResponse: CostDrn[] = res.body;
        const body: CostDrn[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CostDrn.
     */
    private convertItemFromServer(cost: CostDrn): CostDrn {
        const copy: CostDrn = Object.assign({}, cost);
        copy.createdDateTime = this.dateUtils
            .convertDateTimeFromServer(cost.createdDateTime);
        copy.modifiedDateTime = this.dateUtils
            .convertDateTimeFromServer(cost.modifiedDateTime);
        return copy;
    }

    /**
     * Convert a CostDrn to a JSON which can be sent to the server.
     */
    private convert(cost: CostDrn): CostDrn {
        const copy: CostDrn = Object.assign({}, cost);

        copy.createdDateTime = this.dateUtils.toDate(cost.createdDateTime);

        copy.modifiedDateTime = this.dateUtils.toDate(cost.modifiedDateTime);
        return copy;
    }
}
