import { Pipe, PipeTransform } from '@angular/core';
import {Restaurant} from '../models';

@Pipe({
  name: 'deliveryTime'
})
export class DeliveryTimePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    const restaurant = value as Restaurant;
    if (restaurant) {
      return `${Math.floor(restaurant.deliveryStartTime / 60)} - ${Math.floor(restaurant.deliveryEndTime / 60)} mins`;
    }
    return null;
  }

}
