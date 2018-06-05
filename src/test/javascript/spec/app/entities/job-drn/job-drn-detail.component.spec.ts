/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { VehicleManagerTestModule } from '../../../test.module';
import { JobDrnDetailComponent } from '../../../../../../main/webapp/app/entities/job-drn/job-drn-detail.component';
import { JobDrnService } from '../../../../../../main/webapp/app/entities/job-drn/job-drn.service';
import { JobDrn } from '../../../../../../main/webapp/app/entities/job-drn/job-drn.model';

describe('Component Tests', () => {

    describe('JobDrn Management Detail Component', () => {
        let comp: JobDrnDetailComponent;
        let fixture: ComponentFixture<JobDrnDetailComponent>;
        let service: JobDrnService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerTestModule],
                declarations: [JobDrnDetailComponent],
                providers: [
                    JobDrnService
                ]
            })
            .overrideTemplate(JobDrnDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobDrnDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobDrnService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new JobDrn(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.job).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
