/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VehicleManagerTestModule } from '../../../test.module';
import { JobWorkerDrnComponent } from '../../../../../../main/webapp/app/entities/job-worker-drn/job-worker-drn.component';
import { JobWorkerDrnService } from '../../../../../../main/webapp/app/entities/job-worker-drn/job-worker-drn.service';
import { JobWorkerDrn } from '../../../../../../main/webapp/app/entities/job-worker-drn/job-worker-drn.model';

describe('Component Tests', () => {

    describe('JobWorkerDrn Management Component', () => {
        let comp: JobWorkerDrnComponent;
        let fixture: ComponentFixture<JobWorkerDrnComponent>;
        let service: JobWorkerDrnService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerTestModule],
                declarations: [JobWorkerDrnComponent],
                providers: [
                    JobWorkerDrnService
                ]
            })
            .overrideTemplate(JobWorkerDrnComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobWorkerDrnComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobWorkerDrnService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new JobWorkerDrn(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.jobWorkers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
