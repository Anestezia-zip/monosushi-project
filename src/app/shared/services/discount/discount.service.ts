import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IDiscountRequest, IDiscountResponse } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private url = environment.BACKEND_URL;
  private api = { discounts: `${this.url}/discounts` }

  constructor(private http: HttpClient) { }

  getAll(): Observable<IDiscountResponse[]> {
    return this.http.get<IDiscountResponse[]>(this.api.discounts);
  }

  create(discount: IDiscountRequest): Observable<IDiscountResponse> {
    return this.http.post<IDiscountResponse>(this.api.discounts, discount);
  }

  update(discount: IDiscountRequest, id: number): Observable<IDiscountResponse> {
    return this.http.patch<IDiscountResponse>(`${this.api.discounts}/${id}`, discount);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.discounts}/${id}`);
  }
}
