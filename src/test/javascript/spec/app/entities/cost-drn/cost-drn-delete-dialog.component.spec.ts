/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleManagerTestModule } from '../../../test.module';
import { CostDrnDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/cost-drn/cost-drn-delete-dialog.component';
import { CostDrnService } from '../../../../../../main/webapp/app/entities/cost-drn/cost-drn.service';

describe('Component Tests', () => {

    describe('CostDrn Management Delete Component', () => {
        let comp: CostDrnDeleteDialogComponent;
        let fixture: ComponentFixture<CostDrnDeleteDialogComponent>;
        let service: CostDrnService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerTestModule],
                declarations: [CostDrnDeleteDialogComponent],
                providers: [
                    CostDrnService
                ]
            })
            .overrideTemplate(CostDrnDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CostDrnDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostDrnService);
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
