import { TestBed } from '@angular/core/testing';

import { DiscountService } from './discount.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../../../environments/environment";
import {IDiscountRequest, IDiscountResponse} from "../../interfaces/interfaces";

describe('DiscountService', () => {
  let service: DiscountService;
  let httpTestingController: HttpTestingController;
  let baseUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [DiscountService]
    });
    service = TestBed.inject(DiscountService);
    httpTestingController = TestBed.inject(HttpTestingController);
    baseUrl = environment.BACKEND_URL + '/discounts';
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all discounts', () => {
    const discounts: IDiscountResponse[] = [
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
    service.getAll().subscribe((response) => {
      expect(response).toEqual(discounts);
    });
    const req = httpTestingController.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(discounts);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve a discount by id', () => {
    const chosenDiscount: IDiscountResponse = {
      id: 1,
      date: 'string',
      name: 'Discount 2',
      path: 'string',
      title: 'string',
      description: 'string',
      imagePath: 'string'
    };

    service.getOne(chosenDiscount.id).subscribe(discount => {
      expect(discount).toEqual(chosenDiscount);
    });
    const req = httpTestingController.expectOne(`${baseUrl}/${chosenDiscount.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(chosenDiscount);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create discount', () => {
    const discount: IDiscountRequest = {
      date: 'string',
      name: 'Discount 3',
      path: 'string',
      title: 'string',
      description: 'string',
      imagePath: 'string'
    };
    const createdDiscount: IDiscountResponse = {
      id: 3,
      date: 'string',
      name: 'Discount 3',
      path: 'string',
      title: 'string',
      description: 'string',
      imagePath: 'string'
    };
    service.create(discount).subscribe((response) => {
      expect(response).toEqual(createdDiscount);
    });
    const req = httpTestingController.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(discount);
    req.flush(createdDiscount);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should update discount', () => {
    const discount: IDiscountRequest = {
      date: 'string',
      name: 'Discount 4',
      path: 'string',
      title: 'string',
      description: 'string',
      imagePath: 'string'
    };
    const updatedDiscount: IDiscountResponse = {
      id: 4,
      date: 'string',
      name: 'Discount 4',
      path: 'string',
      title: 'string',
      description: 'string',
      imagePath: 'string'
    };
    const id = 4;
    service.update(discount, id).subscribe((response) => {
      expect(response).toEqual(updatedDiscount);
    });
    const req = httpTestingController.expectOne(environment.BACKEND_URL + '/discounts/' + id);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(discount);
    req.flush(updatedDiscount);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should delete discount', () => {
    const discountId = 1;
    service.delete(discountId).subscribe((response) => {
      expect(response).toBeNull();
    });
    const req = httpTestingController.expectOne(`${baseUrl}/${discountId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(null, { status: 204, statusText: 'No Content' });
  });

  afterEach(() => {
    httpTestingController.verify();
  });

});
