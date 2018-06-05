/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VehicleManagerTestModule } from '../../../test.module';
import { VehicleDrnComponent } from '../../../../../../main/webapp/app/entities/vehicle-drn/vehicle-drn.component';
import { VehicleDrnService } from '../../../../../../main/webapp/app/entities/vehicle-drn/vehicle-drn.service';
import { VehicleDrn } from '../../../../../../main/webapp/app/entities/vehicle-drn/vehicle-drn.model';

describe('Component Tests', () => {

    describe('VehicleDrn Management Component', () => {
        let comp: VehicleDrnComponent;
        let fixture: ComponentFixture<VehicleDrnComponent>;
        let service: VehicleDrnService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerTestModule],
                declarations: [VehicleDrnComponent],
                providers: [
                    VehicleDrnService
                ]
            })
            .overrideTemplate(VehicleDrnComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VehicleDrnComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleDrnService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new VehicleDrn(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.vehicles[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
