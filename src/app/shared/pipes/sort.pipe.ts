import { Pipe, PipeTransform } from '@angular/core';
import {IProductResponse} from "../interfaces/interfaces";

@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {

  transform(products: IProductResponse[], category: string): IProductResponse[] {
    if (!products) {
      return [];
    }
    if (!category || category === 'All') {
      return products;
    }

    return products.filter(product => product.name.includes(category));
  }


}
