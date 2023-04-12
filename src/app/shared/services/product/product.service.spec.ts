import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../../../environments/environment";
import {IProductRequest, IProductResponse} from "../../interfaces/interfaces";

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;
  let baseUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
    baseUrl = environment.BACKEND_URL + '/products';
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all products', () => {
    const products: IProductResponse[] = [
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
    service.getAll().subscribe((response) => {
      expect(response).toEqual(products);
    });
    const req = httpTestingController.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(products);
  });

  it('should retrieve a product by id', () => {
    const chosenProduct: IProductResponse = {
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
    };

    service.getOne(chosenProduct.id).subscribe(product => {
      expect(product).toEqual(chosenProduct);
    });
    const req = httpTestingController.expectOne(`${baseUrl}/${chosenProduct.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(chosenProduct);
  });

  it('should return products for a given category name', () => {
    const categoryName = 'testCategory';
    const expectedProducts: IProductResponse[] = [
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
      },
      {
        id: 2,
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
      },
      {
        id: 3,
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
      },
    ];
    service.getAllByCategory(categoryName).subscribe((products) => {
      expect(products).toEqual(expectedProducts);
    });
    const req = httpTestingController.expectOne(`${environment.BACKEND_URL}/products?category.path=${categoryName}`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedProducts);
  });

  it('should create product', () => {
    const product: IProductRequest = {
      category: {
        id: 2,
        name: 'Category 2',
        path: 'string',
        imagePath: 'string'
      },
      name: 'Product 2',
      ingredients: 'string',
      path: 'string',
      description: 'string',
      weight: 'string',
      price: 10,
      imagePath: 'string',
      count: 2
    };
    const createdProduct: IProductResponse = {
      id: 2,
      category: {
        id: 2,
        name: 'Category 2',
        path: 'string',
        imagePath: 'string'
      },
      name: 'Product 2',
      ingredients: 'string',
      path: 'string',
      description: 'string',
      weight: 'string',
      price: 10,
      imagePath: 'string',
      count: 2
    };
    service.create(product).subscribe((response) => {
      expect(response).toEqual(createdProduct);
    });
    const req = httpTestingController.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(product);
    req.flush(createdProduct);
  });

  it('should update product', () => {
    const product: IProductRequest = {
      category: {
        id: 3,
        name: 'Category 3',
        path: 'string',
        imagePath: 'string'
      },
      name: 'Product 3',
      ingredients: 'string',
      path: 'string',
      description: 'string',
      weight: 'string',
      price: 10,
      imagePath: 'string',
      count: 2
    };
    const updatedProduct: IProductResponse = {
      id: 4,
      category: {
        id: 4,
        name: 'Category 4',
        path: 'string',
        imagePath: 'string'
      },
      name: 'Product 4',
      ingredients: 'string',
      path: 'string',
      description: 'string',
      weight: 'string',
      price: 10,
      imagePath: 'string',
      count: 2
    };
    const id = 4;
    service.update(product, id).subscribe((response) => {
      expect(response).toEqual(updatedProduct);
    });
    const req = httpTestingController.expectOne(environment.BACKEND_URL + '/products/' + id);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(product);
    req.flush(updatedProduct);
  });

  it('should delete product', () => {
    const productId = 1;
    service.delete(productId).subscribe((response) => {
      expect(response).toBeNull();
    });
    const req = httpTestingController.expectOne(`${baseUrl}/${productId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(null, { status: 204, statusText: 'No Content' });
  });

  afterEach(() => {
    httpTestingController.verify();
  });

});
