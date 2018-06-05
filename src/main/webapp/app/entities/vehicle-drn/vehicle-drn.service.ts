import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { VehicleDrn } from './vehicle-drn.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<VehicleDrn>;

@Injectable()
export class VehicleDrnService {

    private resourceUrl =  SERVER_API_URL + 'api/vehicles';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(vehicle: VehicleDrn): Observable<EntityResponseType> {
        const copy = this.convert(vehicle);
        return this.http.post<VehicleDrn>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(vehicle: VehicleDrn): Observable<EntityResponseType> {
        const copy = this.convert(vehicle);
        return this.http.put<VehicleDrn>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<VehicleDrn>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<VehicleDrn[]>> {
        const options = createRequestOption(req);
        return this.http.get<VehicleDrn[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<VehicleDrn[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: VehicleDrn = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<VehicleDrn[]>): HttpResponse<VehicleDrn[]> {
        const jsonResponse: VehicleDrn[] = res.body;
        const body: VehicleDrn[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to VehicleDrn.
     */
    private convertItemFromServer(vehicle: VehicleDrn): VehicleDrn {
        const copy: VehicleDrn = Object.assign({}, vehicle);
        copy.createdDateTime = this.dateUtils
            .convertDateTimeFromServer(vehicle.createdDateTime);
        copy.modifiedDateTime = this.dateUtils
            .convertDateTimeFromServer(vehicle.modifiedDateTime);
        return copy;
    }

    /**
     * Convert a VehicleDrn to a JSON which can be sent to the server.
     */
    private convert(vehicle: VehicleDrn): VehicleDrn {
        const copy: VehicleDrn = Object.assign({}, vehicle);

        copy.createdDateTime = this.dateUtils.toDate(vehicle.createdDateTime);

        copy.modifiedDateTime = this.dateUtils.toDate(vehicle.modifiedDateTime);
        return copy;
    }
}
