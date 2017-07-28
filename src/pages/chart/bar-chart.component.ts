import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';

import { RentalPropertyState } from './../../models/rental-property-state.model';
import { RentalProperty } from './../../models/rental-property.model';
 
@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html'
})
export class BarChartComponent {
  subscription: Subscription;

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['Now'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barChartData:any[] = [];
 
  rentalProperties: Array<RentalProperty>;

  @select() readonly rentalPropertyState$: Observable<RentalPropertyState>;

  ngAfterContentInit() {
    this.subscription = this.rentalPropertyState$.subscribe(
      (rentalPropertyState) => {
        rentalPropertyState.items.forEach((element: RentalProperty) => {
          this.barChartData.push({data: [element.monthlyRent ], label: element.tenantName });  
        });
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  // events
  public chartClicked(e:any):void {
  }
 
  public chartHovered(e:any):void {
  }
}