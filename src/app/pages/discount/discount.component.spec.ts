import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountComponent } from './discount.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DiscountService} from "../../shared/services/discount/discount.service";
import {IDiscountResponse} from "../../shared/interfaces/interfaces";
import { of } from 'rxjs';

describe('DiscountComponent', () => {
  let component: DiscountComponent;
  let fixture: ComponentFixture<DiscountComponent>;
  let discountService: DiscountService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountComponent ],
      imports: [
        HttpClientTestingModule,
      ],
      providers: [DiscountService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountComponent);
    component = fixture.componentInstance;
    discountService = TestBed.inject(DiscountService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load discounts', () => {
    const fakeDiscounts: IDiscountResponse[] = [
      {
        id: 1,
        date: 'string',
        name: 'Discount 1',
        path: 'string',
        title: 'string',
        description: 'string',
        imagePath: 'string'
      }
    ];
    spyOn(discountService, 'getAll').and.returnValue(of(fakeDiscounts));
    component.loadDiscounts();
    expect(discountService.getAll).toHaveBeenCalled();
    expect(component.userDiscounts).toEqual(fakeDiscounts);
  });

});
