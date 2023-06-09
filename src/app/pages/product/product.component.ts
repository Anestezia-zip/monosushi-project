import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/interfaces';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { OrderService } from '../../shared/services/order/order.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy{

  public userProducts: IProductResponse[] = [];
  private evenSubscription!: Subscription;
  public currentCategoryName!: string;
  selectedTab!: string;

  selectTab(tabIndex: string) {
    this.selectedTab = tabIndex;
  }

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private orderService: OrderService
  ){
    this.evenSubscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.loadProducts();
      }
    })
  }

  ngOnInit(): void {
    this.loadProducts()
    this.selectedTab = 'All';
  }

  loadProducts(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string
    this.productService.getAllByCategory(categoryName).then(data => {
      this.userProducts = data as IProductResponse[];
      this.currentCategoryName = this.userProducts[0].category.name
    })
  }

  ngOnDestroy(): void {
    this.evenSubscription.unsubscribe();
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
