/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { VehicleManagerTestModule } from '../../../test.module';
import { VehicleDrnDetailComponent } from '../../../../../../main/webapp/app/entities/vehicle-drn/vehicle-drn-detail.component';
import { VehicleDrnService } from '../../../../../../main/webapp/app/entities/vehicle-drn/vehicle-drn.service';
import { VehicleDrn } from '../../../../../../main/webapp/app/entities/vehicle-drn/vehicle-drn.model';

describe('Component Tests', () => {

    describe('VehicleDrn Management Detail Component', () => {
        let comp: VehicleDrnDetailComponent;
        let fixture: ComponentFixture<VehicleDrnDetailComponent>;
        let service: VehicleDrnService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerTestModule],
                declarations: [VehicleDrnDetailComponent],
                providers: [
                    VehicleDrnService
                ]
            })
            .overrideTemplate(VehicleDrnDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VehicleDrnDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleDrnService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new VehicleDrn(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.vehicle).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
