import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ICategoryRequest, ICategoryResponse} from "../../interfaces/interfaces";
import {environment} from "../../../../environments/environment";

describe('CategoryService', () => {
  let service: CategoryService;
  let httpTestingController: HttpTestingController;
  let baseUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [CategoryService]
    });
    service = TestBed.inject(CategoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
    baseUrl = environment.BACKEND_URL + '/categories';
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all categories', () => {
    const categories: ICategoryResponse[] = [
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
    service.getAll().subscribe((response) => {
      expect(response).toEqual(categories);
    });
    const req = httpTestingController.expectOne(environment.BACKEND_URL + '/categories');
    expect(req.request.method).toBe('GET');
    req.flush(categories);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create category', () => {
    const category: ICategoryRequest = {
      name: 'Category 3',
      path: 'string',
      imagePath: 'string'
    };
    const createdCategory: ICategoryResponse = {
      id: 3,
      name: 'Category 3',
      path: 'string',
      imagePath: 'string'
    };
    service.create(category).subscribe((response) => {
      expect(response).toEqual(createdCategory);
    });
    const req = httpTestingController.expectOne(environment.BACKEND_URL + '/categories');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(category);
    req.flush(createdCategory);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should update category', () => {
    const category: ICategoryRequest = {
      name: 'Category 4',
      path: 'string',
      imagePath: 'string'
    };
    const updatedCategory: ICategoryResponse = {
      id: 4,
      name: 'Category 4',
      path: 'string',
      imagePath: 'string'
    };
    const id = 4;
    service.update(category, id).subscribe((response) => {
      expect(response).toEqual(updatedCategory);
    });
    const req = httpTestingController.expectOne(environment.BACKEND_URL + '/categories/' + id);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(category);
    req.flush(updatedCategory);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should delete category', () => {
    const categoryId = 1;
    service.delete(categoryId).subscribe((response) => {
      expect(response).toBeNull();
    });
    const req = httpTestingController.expectOne(`${baseUrl}/${categoryId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(null, { status: 204, statusText: 'No Content' });
  });

  afterEach(() => {
    httpTestingController.verify();
  });

});



