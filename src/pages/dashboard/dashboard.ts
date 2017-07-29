import { RentalPropertyState } from './../../models/rental-property-state.model';
import { Observable } from 'rxjs/Observable';
import { RentalProperty } from './../../models/rental-property.model';
import { Subscription } from 'rxjs/Rx';
import { CreateRentalProperty } from './../create/create-rental-property.component';
import { Component, Input, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { select } from '@angular-redux/store';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage implements OnInit {
  subscription: Subscription;
  rentalProperties: Array<RentalProperty>;
  
  @select() readonly rentalPropertyState$: Observable<RentalPropertyState>;
  
  constructor(public navController: NavController) {
  }

  goToCreateRentalProperty(){
    this.navController.push(CreateRentalProperty)
  }

  ngOnInit() {
    this.subscription = this.rentalPropertyState$.subscribe(state => this.rentalProperties = state.items);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
