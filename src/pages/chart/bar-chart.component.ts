import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component, Input, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';

import { RentalPropertyState } from './../../models/rental-property-state.model';
import { RentalProperty } from './../../models/rental-property.model';
 
@Component({
  selector: 'bar-chart',
  template: `<div>
  <div style="display: block">
    <canvas *ngIf="barChartData.length > 0" baseChart
            [datasets]="barChartData"
            [labels]="barChartLabels"
            [options]="barChartOptions"
            [legend]="barChartLegend"
            [chartType]="barChartType"
            (chartHover)="chartHovered($event)"
            (chartClick)="chartClicked($event)"></canvas>
  </div>
</div>`
})
export class BarChartComponent implements OnChanges {

  @Input() rentalProperties : Array<RentalProperty>;

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  
  public barChartLabels:string[] = ['Now'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barChartData:any[] = [];
  
  // events
  public chartClicked(e:any):void {
  }
 
  public chartHovered(e:any):void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    changes.rentalProperties.currentValue.forEach(x => this.barChartData.push({data: [x.monthlyRent ], label: x.tenantName }) );
  }
}