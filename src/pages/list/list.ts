import { ViewRentalProperty } from './../view/view-rental-property.component';
import { Component, AfterContentInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { NavController, NavParams } from 'ionic-angular';
import { select } from '@angular-redux/store';

import { RentalProperty } from './../../models/rental-property.model';
import { RentalPropertyState } from './../../models/rental-property-state.model';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements AfterContentInit, OnDestroy {
  subscription: Subscription;
  selectedItem: any;
  rentalProperties: Array<RentalProperty>;

  @select() readonly rentalPropertyState$: Observable<RentalPropertyState>;

  constructor(public naController: NavController, public navParams: NavParams) {
  }

  ngAfterContentInit() {
    this.subscription = this.rentalPropertyState$.subscribe(
      (rentalPropertyState) => {
        this.rentalProperties = rentalPropertyState.items;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectItem(item) {
    this.naController.push(ViewRentalProperty, item.id);
  }
}
