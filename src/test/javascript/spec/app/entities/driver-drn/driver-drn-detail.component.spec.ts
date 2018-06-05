/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { VehicleManagerTestModule } from '../../../test.module';
import { DriverDrnDetailComponent } from '../../../../../../main/webapp/app/entities/driver-drn/driver-drn-detail.component';
import { DriverDrnService } from '../../../../../../main/webapp/app/entities/driver-drn/driver-drn.service';
import { DriverDrn } from '../../../../../../main/webapp/app/entities/driver-drn/driver-drn.model';

describe('Component Tests', () => {

    describe('DriverDrn Management Detail Component', () => {
        let comp: DriverDrnDetailComponent;
        let fixture: ComponentFixture<DriverDrnDetailComponent>;
        let service: DriverDrnService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerTestModule],
                declarations: [DriverDrnDetailComponent],
                providers: [
                    DriverDrnService
                ]
            })
            .overrideTemplate(DriverDrnDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DriverDrnDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DriverDrnService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DriverDrn(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.driver).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
