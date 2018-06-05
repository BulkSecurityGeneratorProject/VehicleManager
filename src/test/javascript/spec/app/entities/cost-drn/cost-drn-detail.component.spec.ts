/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { VehicleManagerTestModule } from '../../../test.module';
import { CostDrnDetailComponent } from '../../../../../../main/webapp/app/entities/cost-drn/cost-drn-detail.component';
import { CostDrnService } from '../../../../../../main/webapp/app/entities/cost-drn/cost-drn.service';
import { CostDrn } from '../../../../../../main/webapp/app/entities/cost-drn/cost-drn.model';

describe('Component Tests', () => {

    describe('CostDrn Management Detail Component', () => {
        let comp: CostDrnDetailComponent;
        let fixture: ComponentFixture<CostDrnDetailComponent>;
        let service: CostDrnService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerTestModule],
                declarations: [CostDrnDetailComponent],
                providers: [
                    CostDrnService
                ]
            })
            .overrideTemplate(CostDrnDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CostDrnDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostDrnService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CostDrn(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cost).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
