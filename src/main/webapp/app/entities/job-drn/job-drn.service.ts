import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { JobDrn } from './job-drn.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<JobDrn>;

@Injectable()
export class JobDrnService {

    private resourceUrl =  SERVER_API_URL + 'api/jobs';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(job: JobDrn): Observable<EntityResponseType> {
        const copy = this.convert(job);
        return this.http.post<JobDrn>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(job: JobDrn): Observable<EntityResponseType> {
        const copy = this.convert(job);
        return this.http.put<JobDrn>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<JobDrn>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<JobDrn[]>> {
        const options = createRequestOption(req);
        return this.http.get<JobDrn[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<JobDrn[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: JobDrn = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<JobDrn[]>): HttpResponse<JobDrn[]> {
        const jsonResponse: JobDrn[] = res.body;
        const body: JobDrn[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to JobDrn.
     */
    private convertItemFromServer(job: JobDrn): JobDrn {
        const copy: JobDrn = Object.assign({}, job);
        copy.startDateTime = this.dateUtils
            .convertDateTimeFromServer(job.startDateTime);
        copy.endDateTime = this.dateUtils
            .convertDateTimeFromServer(job.endDateTime);
        copy.createdDateTime = this.dateUtils
            .convertDateTimeFromServer(job.createdDateTime);
        copy.modifiedDateTime = this.dateUtils
            .convertDateTimeFromServer(job.modifiedDateTime);
        return copy;
    }

    /**
     * Convert a JobDrn to a JSON which can be sent to the server.
     */
    private convert(job: JobDrn): JobDrn {
        const copy: JobDrn = Object.assign({}, job);

        copy.startDateTime = this.dateUtils.toDate(job.startDateTime);

        copy.endDateTime = this.dateUtils.toDate(job.endDateTime);

        copy.createdDateTime = this.dateUtils.toDate(job.createdDateTime);

        copy.modifiedDateTime = this.dateUtils.toDate(job.modifiedDateTime);
        return copy;
    }
}
