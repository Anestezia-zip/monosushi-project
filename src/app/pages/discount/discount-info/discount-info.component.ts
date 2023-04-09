
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDiscountResponse } from 'src/app/shared/interfaces/interfaces';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-discount-info',
  templateUrl: './discount-info.component.html',
  styleUrls: ['./discount-info.component.scss']
})
export class DiscountInfoComponent {

  public currentDiscount!: IDiscountResponse;

  constructor(
    private discountService: DiscountService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      this.currentDiscount = response['productInfo'];
    });   
    this.loadDiscounts()
  }

  loadDiscounts(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.discountService.getOne(id).subscribe(data => {
      this.currentDiscount = data;
    })
  }


}
