import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {IProductResponse} from "../../shared/interfaces/interfaces";
import {of} from "rxjs";
import {ProductService} from "../../shared/services/product/product.service";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let productService: ProductService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [ProductService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load discounts', () => {
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
    spyOn(productService, 'getAll').and.returnValue(of(fakeProducts));
    component.loadProducts();
    expect(productService.getAll).toHaveBeenCalled();
    expect(component.userProducts).toEqual(fakeProducts);
  });

  it('should set the selected tab to the specified index', () => {
    const component = TestBed.createComponent(HomeComponent).componentInstance;
    const tabIndex = 2;
    component.selectTab(tabIndex);
    expect(component.selectedTab).toEqual(tabIndex);
  });

});
