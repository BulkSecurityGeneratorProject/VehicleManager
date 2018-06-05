/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleManagerTestModule } from '../../../test.module';
import { DriverDrnDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/driver-drn/driver-drn-delete-dialog.component';
import { DriverDrnService } from '../../../../../../main/webapp/app/entities/driver-drn/driver-drn.service';

describe('Component Tests', () => {

    describe('DriverDrn Management Delete Component', () => {
        let comp: DriverDrnDeleteDialogComponent;
        let fixture: ComponentFixture<DriverDrnDeleteDialogComponent>;
        let service: DriverDrnService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerTestModule],
                declarations: [DriverDrnDeleteDialogComponent],
                providers: [
                    DriverDrnService
                ]
            })
            .overrideTemplate(DriverDrnDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DriverDrnDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DriverDrnService);
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
