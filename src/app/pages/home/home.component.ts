import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/interfaces';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  public userProducts: IProductResponse[] = [];
  selectedTab = 1;

  selectTab(tabIndex: number) {
    this.selectedTab = tabIndex;
  }

  constructor(
    private productService: ProductService,
  ){}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllFirebase().subscribe(data => {
      this.userProducts = data as IProductResponse[];
    })
  }

}

