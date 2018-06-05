/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { VehicleManagerTestModule } from '../../../test.module';
import { JobWorkerDrnDetailComponent } from '../../../../../../main/webapp/app/entities/job-worker-drn/job-worker-drn-detail.component';
import { JobWorkerDrnService } from '../../../../../../main/webapp/app/entities/job-worker-drn/job-worker-drn.service';
import { JobWorkerDrn } from '../../../../../../main/webapp/app/entities/job-worker-drn/job-worker-drn.model';

describe('Component Tests', () => {

    describe('JobWorkerDrn Management Detail Component', () => {
        let comp: JobWorkerDrnDetailComponent;
        let fixture: ComponentFixture<JobWorkerDrnDetailComponent>;
        let service: JobWorkerDrnService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerTestModule],
                declarations: [JobWorkerDrnDetailComponent],
                providers: [
                    JobWorkerDrnService
                ]
            })
            .overrideTemplate(JobWorkerDrnDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobWorkerDrnDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobWorkerDrnService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new JobWorkerDrn(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.jobWorker).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
