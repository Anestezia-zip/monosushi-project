import { Component } from '@angular/core';
import { IDiscountResponse } from 'src/app/shared/interfaces/interfaces';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent {

  public adminDiscounts: IDiscountResponse[] = [];

  constructor(
    private discountService: DiscountService,
  ){}
  
  ngOnInit(): void {
    this.loadDiscounts();
  }

  loadDiscounts(): void {
    this.discountService.getAll().subscribe(data => {
      this.adminDiscounts = data;
    })
  }
 

}
