/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VehicleManagerTestModule } from '../../../test.module';
import { CostDrnComponent } from '../../../../../../main/webapp/app/entities/cost-drn/cost-drn.component';
import { CostDrnService } from '../../../../../../main/webapp/app/entities/cost-drn/cost-drn.service';
import { CostDrn } from '../../../../../../main/webapp/app/entities/cost-drn/cost-drn.model';

describe('Component Tests', () => {

    describe('CostDrn Management Component', () => {
        let comp: CostDrnComponent;
        let fixture: ComponentFixture<CostDrnComponent>;
        let service: CostDrnService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerTestModule],
                declarations: [CostDrnComponent],
                providers: [
                    CostDrnService
                ]
            })
            .overrideTemplate(CostDrnComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CostDrnComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostDrnService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CostDrn(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.costs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
