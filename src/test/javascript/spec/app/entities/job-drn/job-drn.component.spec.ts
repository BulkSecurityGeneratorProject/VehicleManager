/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VehicleManagerTestModule } from '../../../test.module';
import { JobDrnComponent } from '../../../../../../main/webapp/app/entities/job-drn/job-drn.component';
import { JobDrnService } from '../../../../../../main/webapp/app/entities/job-drn/job-drn.service';
import { JobDrn } from '../../../../../../main/webapp/app/entities/job-drn/job-drn.model';

describe('Component Tests', () => {

    describe('JobDrn Management Component', () => {
        let comp: JobDrnComponent;
        let fixture: ComponentFixture<JobDrnComponent>;
        let service: JobDrnService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerTestModule],
                declarations: [JobDrnComponent],
                providers: [
                    JobDrnService
                ]
            })
            .overrideTemplate(JobDrnComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobDrnComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobDrnService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new JobDrn(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.jobs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
