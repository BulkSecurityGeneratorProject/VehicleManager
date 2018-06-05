/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleManagerTestModule } from '../../../test.module';
import { JobWorkerDrnDialogComponent } from '../../../../../../main/webapp/app/entities/job-worker-drn/job-worker-drn-dialog.component';
import { JobWorkerDrnService } from '../../../../../../main/webapp/app/entities/job-worker-drn/job-worker-drn.service';
import { JobWorkerDrn } from '../../../../../../main/webapp/app/entities/job-worker-drn/job-worker-drn.model';
import { JobDrnService } from '../../../../../../main/webapp/app/entities/job-drn';
import { DriverDrnService } from '../../../../../../main/webapp/app/entities/driver-drn';

describe('Component Tests', () => {

    describe('JobWorkerDrn Management Dialog Component', () => {
        let comp: JobWorkerDrnDialogComponent;
        let fixture: ComponentFixture<JobWorkerDrnDialogComponent>;
        let service: JobWorkerDrnService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerTestModule],
                declarations: [JobWorkerDrnDialogComponent],
                providers: [
                    JobDrnService,
                    DriverDrnService,
                    JobWorkerDrnService
                ]
            })
            .overrideTemplate(JobWorkerDrnDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobWorkerDrnDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobWorkerDrnService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new JobWorkerDrn(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.jobWorker = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'jobWorkerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new JobWorkerDrn();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.jobWorker = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'jobWorkerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
