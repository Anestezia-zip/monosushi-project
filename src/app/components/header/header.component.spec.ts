import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {OrderService} from "../../shared/services/order/order.service";
import {of} from "rxjs";
import {CategoryService} from "../../shared/services/category/category.service";
import {ICategoryResponse} from "../../shared/interfaces/interfaces";
import {ROLE} from "../../shared/constants/role.constant";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let orderService: OrderService;
  let categoryService: CategoryService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [OrderService, CategoryService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrderService);
    categoryService = TestBed.inject(CategoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load admin-categories', () => {
    spyOn(categoryService, 'getAll').and.returnValue(of(fakeCategories));
    component.loadCategories();
    expect(categoryService.getAll).toHaveBeenCalled();
    expect(component.userCategories).toEqual(fakeCategories);
  });

  it('should load basket from localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(FAKE_BASKET));
    component.loadBasket();
    expect(component.basket).toEqual(FAKE_BASKET);
  });

  it('should subscribe to changeBasket and call loadBasket', () => {
    spyOn(component, 'loadBasket').and.callThrough();
    orderService.changeBasket.next(true);
    expect(component.loadBasket).toHaveBeenCalled();
  });

  it('it should change total price and amount', () => {
    component.basket = FAKE_BASKET;
    spyOn(component, 'getTotalPrice').and.callThrough();
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled()
    expect(component.totalPrice).toBe(20)

    component.basket = FAKE_BASKET;
    spyOn(component, 'getTotalAmount').and.callThrough();
    component.getTotalAmount();
    expect(component.getTotalAmount).toHaveBeenCalled()
    expect(component.totalAmount).toBe(2)
  });

  it('should increment/decrement product count and update basket', () => {
    const FAKE_PRODUCT = FAKE_BASKET[0];
    spyOn(component, 'productCount').and.callThrough();
    component.basket = [FAKE_PRODUCT];
    component.productCount(FAKE_PRODUCT, true);
    expect(component.productCount).toHaveBeenCalledWith(FAKE_PRODUCT, true);
    expect(component.basket[0].count).toBe(3);
    component.productCount(FAKE_PRODUCT, false);
    expect(component.productCount).toHaveBeenCalledWith(FAKE_PRODUCT, false);
    expect(component.basket[0].count).toBe(2);
  })

  it('should remove product from basket and update basket', () => {
    const FAKE_PRODUCT = FAKE_BASKET[0];
    spyOn(component, 'deleteProduct').and.callThrough();
    component.basket = [FAKE_PRODUCT];
    component.deleteProduct(0);
    expect(component.deleteProduct).toHaveBeenCalledWith(0);
    expect(component.basket.length).toBe(0);
  });

  it('should set isLogin to false when user is not logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    component.checkUserLogin();
    expect(component.isLogin).toBe(false);
  });

  it('should set isAdmin when currentUser is admin', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ role: ROLE.ADMIN }));
    component.checkUserLogin();
    expect(component.isAdmin).toBe(true);
    expect(component.loginUrl).toBe('admin');
  });


  it('should set isLogin when currentUser is user', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ role: ROLE.USER }));
    component.checkUserLogin();
    expect(component.isLogin).toBe(true);
    expect(component.loginUrl).toBe('cabinet');
  });

});

const FAKE_BASKET = [
  {
    id: 1,
    category: {
      id: 1,
      name: 'string',
      path: 'string',
      imagePath: 'string'
    },
    name: 'string',
    ingredients: 'string',
    path: 'string',
    description: 'string',
    weight: 'string',
    price: 10,
    imagePath: 'string',
    count: 2
  }
]

const fakeCategories: ICategoryResponse[] = [
  {
    id: 1,
    name: 'Category 1',
    path: 'string',
    imagePath: 'string'
  }
];
