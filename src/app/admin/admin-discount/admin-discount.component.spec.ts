import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDiscountComponent } from './admin-discount.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Storage} from "@angular/fire/storage";
import {DiscountService} from "../../shared/services/discount/discount.service";
import {of} from "rxjs";
import {IDiscountResponse} from "../../shared/interfaces/interfaces";

describe('AdminDiscountComponent', () => {
  let component: AdminDiscountComponent;
  let fixture: ComponentFixture<AdminDiscountComponent>;
  let discountService: DiscountService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDiscountComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DiscountService,
        { provide: Storage, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDiscountComponent);
    component = fixture.componentInstance;
    discountService = TestBed.inject(DiscountService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load admin-discounts', () => {
    spyOn(discountService, 'getAll').and.returnValue(of(fakeDiscounts));
    component.loadDiscounts();
    expect(discountService.getAll).toHaveBeenCalled();
    expect(component.adminDiscounts).toEqual(fakeDiscounts);
  });

  it('should create a new admin-discount', () => {
    const discountForm = {
      value: {
        date: 'string',
        name: 'Discount 1',
        path: 'string',
        title: 'string',
        description: 'string',
        imagePath: 'string'
      }
    };
    const discountServiceSpy = spyOn(discountService, 'create').and.returnValue(of(fakeDiscount));

    component.discountForm.setValue(discountForm.value);
    component.editStatus = false;
    component.saveDiscount();

    expect(discountServiceSpy).toHaveBeenCalledWith(discountForm.value);
  });

  it('should update a new admin-discount', () => {
    spyOn(component.discountForm, 'patchValue');
    spyOn(component, 'toggleDiscount');

    component.editDiscount(fakeDiscount);

    expect(component.discountForm.patchValue).toHaveBeenCalledWith({
      date: fakeDiscount.date,
      name: fakeDiscount.name,
      path: fakeDiscount.path,
      title: fakeDiscount.title,
      description: fakeDiscount.description,
      imagePath: fakeDiscount.imagePath
    });
    expect(component.editStatus).toBeTrue();
    expect(component.editID).toEqual(fakeDiscount.id);
    expect(component.isUploaded).toBeTrue();
    expect(component.toggleDiscount).toHaveBeenCalled();
  });

  it('should delete a admin-discount', () => {
    const categoryServiceSpy = spyOn(discountService, 'delete').and.returnValue(of(undefined));
    component.deleteDiscount(fakeDiscount);
    expect(categoryServiceSpy).toHaveBeenCalledWith(fakeDiscount.id);
  });



});


const fakeDiscounts: IDiscountResponse[] = [
  {
    id: 1,
    date: '04.2023',
    name: 'Discount 1',
    path: 'string',
    title: 'string',
    description: 'string',
    imagePath: 'string'
  }
];

const fakeDiscount: IDiscountResponse = {
  id: 1,
  date: '04.2023',
  name: 'Discount 1',
  path: 'string',
  title: 'string',
  description: 'string',
  imagePath: 'string'
}
