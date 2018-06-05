/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VehicleManagerTestModule } from '../../../test.module';
import { DriverDrnComponent } from '../../../../../../main/webapp/app/entities/driver-drn/driver-drn.component';
import { DriverDrnService } from '../../../../../../main/webapp/app/entities/driver-drn/driver-drn.service';
import { DriverDrn } from '../../../../../../main/webapp/app/entities/driver-drn/driver-drn.model';

describe('Component Tests', () => {

    describe('DriverDrn Management Component', () => {
        let comp: DriverDrnComponent;
        let fixture: ComponentFixture<DriverDrnComponent>;
        let service: DriverDrnService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerTestModule],
                declarations: [DriverDrnComponent],
                providers: [
                    DriverDrnService
                ]
            })
            .overrideTemplate(DriverDrnComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DriverDrnComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DriverDrnService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DriverDrn(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.drivers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
