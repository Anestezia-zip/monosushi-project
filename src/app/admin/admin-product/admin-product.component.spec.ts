import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminProductComponent } from './admin-product.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Storage} from "@angular/fire/storage";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {CategoryService} from "../../shared/services/category/category.service";
import {ProductService} from "../../shared/services/product/product.service";
import {ICategoryResponse, IProductResponse} from "../../shared/interfaces/interfaces";
import {of} from "rxjs";

describe('AdminProductComponent', () => {
  let component: AdminProductComponent;
  let fixture: ComponentFixture<AdminProductComponent>;
  let categoryService: CategoryService;
  let productService: ProductService;
  let toastr: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductComponent ],
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [
        ProductService,
        CategoryService,
        { provide: Storage, useValue: {} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService);
    productService = TestBed.inject(ProductService);
    toastr = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load admin-categories', () => {
    spyOn(categoryService, 'getAll').and.returnValue(of(fakeCategories));
    component.loadCategories();
    expect(categoryService.getAll).toHaveBeenCalled();
    expect(component.adminCategories).toEqual(fakeCategories);
    expect(component.productForm.controls['category'].value).toEqual(fakeCategories[0].id);
  });

  it('should load admin-products', () => {
    spyOn(productService, 'getAll').and.returnValue(of(fakeProducts));
    component.loadProducts();
    expect(productService.getAll).toHaveBeenCalled();
    expect(component.adminProducts).toEqual(fakeProducts);
  });

  it('should create a new admin-product', () => {
    const productForm = {
      value:   {
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
    };
    const productServiceSpy = spyOn(productService, 'create').and.returnValue(of(fakeProduct));
    const toastrSpy = spyOn(toastr, 'success');
    component.productForm.setValue(productForm.value);
    component.editStatus = false;
    component.saveProduct();
    expect(productServiceSpy).toHaveBeenCalledWith(productForm.value);
    expect(toastrSpy).toHaveBeenCalledWith('Product successfully created');
  });

  it('should edit a new admin-product', () => {
    spyOn(component.productForm, 'patchValue');
    spyOn(component, 'toggleForm');

    component.editProduct(fakeProduct);

    expect(component.productForm.patchValue).toHaveBeenCalledWith({
      category: fakeProduct.category,
      name: fakeProduct.name,
      ingredients: fakeProduct.ingredients,
      path: fakeProduct.path,
      weight: fakeProduct.weight,
      price: fakeProduct.price,
      imagePath: fakeProduct.imagePath
    });
    expect(component.editStatus).toBeTrue();
    expect(component.currProductID).toEqual(fakeProduct.id);
    expect(component.isUploaded).toBeTrue();
    expect(component.toggleForm).toHaveBeenCalled();
  });

  it('should delete a admin-product', () => {
    const productServiceSpy = spyOn(productService, 'delete').and.returnValue(of(undefined));
    const toastrSpy = spyOn(toastr, 'success');
    component.deleteProduct(fakeProduct);
    expect(productServiceSpy).toHaveBeenCalledWith(fakeProduct.id);
    expect(toastrSpy).toHaveBeenCalledWith('Product successfully deleted');
  });


});

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

const fakeProduct: IProductResponse = {
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

const fakeCategories: ICategoryResponse[] = [
  {
    id: 1,
    name: 'Category 1',
    path: 'string',
    imagePath: 'string'
  },
  {
    id: 2,
    name: 'Category 2',
    path: 'string',
    imagePath: 'string'
  }
];
