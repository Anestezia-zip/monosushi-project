import { Component } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/interfaces';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  public adminProducts: IProductResponse[] = [];
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
    this.productService.getAll().subscribe(data => {
      this.adminProducts = data;
    })
  }
 
  
}
