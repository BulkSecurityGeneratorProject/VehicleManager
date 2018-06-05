/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleManagerTestModule } from '../../../test.module';
import { JobWorkerDrnDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/job-worker-drn/job-worker-drn-delete-dialog.component';
import { JobWorkerDrnService } from '../../../../../../main/webapp/app/entities/job-worker-drn/job-worker-drn.service';

describe('Component Tests', () => {

    describe('JobWorkerDrn Management Delete Component', () => {
        let comp: JobWorkerDrnDeleteDialogComponent;
        let fixture: ComponentFixture<JobWorkerDrnDeleteDialogComponent>;
        let service: JobWorkerDrnService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerTestModule],
                declarations: [JobWorkerDrnDeleteDialogComponent],
                providers: [
                    JobWorkerDrnService
                ]
            })
            .overrideTemplate(JobWorkerDrnDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobWorkerDrnDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobWorkerDrnService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
