import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/interfaces';
import { ProductService } from 'src/app/shared/services/product/product.service';
import {OrderService} from "../../shared/services/order/order.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  public userProducts: IProductResponse[] = [];
  selectedTab!: string;

  selectTab(tabIndex: string) {
    this.selectedTab = tabIndex;
  }

  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ){}

  ngOnInit(): void {
    this.loadProducts();
    this.selectedTab = 'All';
  }

  loadProducts(): void {
    this.productService.getAllFirebase().subscribe(data => {
      this.userProducts = data as IProductResponse[];
    })
  }

  productCount(product: IProductResponse, value: boolean): void {
    if(value) ++product.count;
    else if(!value && product.count > 1) --product.count;
  }

  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if(localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if(basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id)
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }

}

