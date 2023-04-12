import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../shared/services/product/product.service";
import {of} from "rxjs";
import {IProductResponse} from "../../shared/interfaces/interfaces";

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let activatedRoute: ActivatedRoute;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    activatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy().and.returnValue('category1'),
        },
      },
    } as unknown as ActivatedRoute;

    productService = jasmine.createSpyObj('ProductService', ['getAllByCategory']);
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        ProductComponent,
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: ProductService, useValue: productService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the selected tab to the specified index', () => {
    const component = TestBed.createComponent(ProductComponent).componentInstance;
    const tabIndex = 2;
    component.selectTab(tabIndex);
    expect(component.selectedTab).toEqual(tabIndex);
  });

  it('should load products by category and update userProducts', () => {
    const fakeProducts: IProductResponse[] = [
      {
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
        count: 2
      }
    ];
    productService.getAllByCategory.and.returnValue(of(fakeProducts));
    component.loadProducts();
    expect(productService.getAllByCategory).toHaveBeenCalledWith('category1');
    expect(component.userProducts).toEqual(fakeProducts);
  });

});
