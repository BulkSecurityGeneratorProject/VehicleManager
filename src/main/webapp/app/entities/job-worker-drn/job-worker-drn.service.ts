import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { JobWorkerDrn } from './job-worker-drn.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<JobWorkerDrn>;

@Injectable()
export class JobWorkerDrnService {

    private resourceUrl =  SERVER_API_URL + 'api/job-workers';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(jobWorker: JobWorkerDrn): Observable<EntityResponseType> {
        const copy = this.convert(jobWorker);
        return this.http.post<JobWorkerDrn>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(jobWorker: JobWorkerDrn): Observable<EntityResponseType> {
        const copy = this.convert(jobWorker);
        return this.http.put<JobWorkerDrn>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<JobWorkerDrn>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<JobWorkerDrn[]>> {
        const options = createRequestOption(req);
        return this.http.get<JobWorkerDrn[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<JobWorkerDrn[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: JobWorkerDrn = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<JobWorkerDrn[]>): HttpResponse<JobWorkerDrn[]> {
        const jsonResponse: JobWorkerDrn[] = res.body;
        const body: JobWorkerDrn[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to JobWorkerDrn.
     */
    private convertItemFromServer(jobWorker: JobWorkerDrn): JobWorkerDrn {
        const copy: JobWorkerDrn = Object.assign({}, jobWorker);
        copy.createdDateTime = this.dateUtils
            .convertDateTimeFromServer(jobWorker.createdDateTime);
        copy.modifiedDateTime = this.dateUtils
            .convertDateTimeFromServer(jobWorker.modifiedDateTime);
        return copy;
    }

    /**
     * Convert a JobWorkerDrn to a JSON which can be sent to the server.
     */
    private convert(jobWorker: JobWorkerDrn): JobWorkerDrn {
        const copy: JobWorkerDrn = Object.assign({}, jobWorker);

        copy.createdDateTime = this.dateUtils.toDate(jobWorker.createdDateTime);

        copy.modifiedDateTime = this.dateUtils.toDate(jobWorker.modifiedDateTime);
        return copy;
    }
}
