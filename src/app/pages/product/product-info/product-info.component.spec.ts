import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProductInfoComponent } from './product-info.component';
import {ProductService} from "../../../shared/services/product/product.service";
import {OrderService} from "../../../shared/services/order/order.service";
import {IProductResponse} from "../../../shared/interfaces/interfaces";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('ProductInfoComponent', () => {
  let component: ProductInfoComponent;
  let fixture: ComponentFixture<ProductInfoComponent>;
  let productService: ProductService;
  let orderService: OrderService;
  let activatedRoute: ActivatedRoute;
  const mockProduct: IProductResponse = {
    id: 1,
    category: {
      id: 1,
      name: 'Category 1',
      path: 'string',
      imagePath: 'string'
    },
    name: 'Product 1',
    ingredients: 'string',
    path: 'string',
    description: 'string',
    weight: 'string',
    price: 10,
    imagePath: 'string',
    count: 1
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductInfoComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ productInfo: mockProduct }),
            snapshot: {
              paramMap: {
                get: (key: string) => '1',
              },
            },
          },
        },
        {
          provide: ProductService,
          useValue: {
            getOne: () => of(mockProduct),
          },
        },
        {
          provide: OrderService,
          useValue: {
            changeBasket: {
              next: jasmine.createSpy(),
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInfoComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    orderService = TestBed.inject(OrderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load product data on init', () => {
    expect(component.currentProduct).toEqual(mockProduct);
  });

  it('should load product data on loadProducts()', () => {
    spyOn(productService, 'getOne').and.returnValue(of(mockProduct));
    component.loadProducts();
    expect(component.currentProduct).toEqual(mockProduct);
  });

  it('should increase product count on productCount() with true value', () => {
    component.productCount(mockProduct, true);
    expect(mockProduct.count).toEqual(2);
  });

  it('should decrease product count on productCount() with false value', () => {
    mockProduct.count = 2;
    component.productCount(mockProduct, false);
    expect(mockProduct.count).toEqual(1);
  });

  it('should not decrease product count below 1 on productCount() with false value', () => {
    mockProduct.count = 1;
    component.productCount(mockProduct, false);
    expect(mockProduct.count).toEqual(1);
  });

  it('should add product to basket on addToBasket()', () => {
    component.addToBasket(mockProduct);
    expect(localStorage.getItem('basket')).toContain('Product 1');
  });

  it('should increase product count on addToBasket() when product already in basket', () => {
    const basket = [{ ...mockProduct, count: 1 }];
    localStorage.setItem('basket', JSON.stringify(basket));
    component.addToBasket(mockProduct);
    expect(localStorage.getItem('basket')).toContain('"count":2');
  });

  it('should emit changeBasket event on addToBasket()', () => {
    component.addToBasket(mockProduct);
    expect(orderService.changeBasket.next).toHaveBeenCalledWith(true);
  });
});
