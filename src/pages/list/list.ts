import { CreateRentalProperty } from './../create/create-rental-property.component';
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
  filteredRentalProperties: Array<RentalProperty>;

  @select() readonly rentalPropertyState$: Observable<RentalPropertyState>;

  constructor(private navController: NavController, private navParams: NavParams) {
  }

  ngAfterContentInit() {
    this.subscription = this.rentalPropertyState$.subscribe(
      (rentalPropertyState) => {
        this.rentalProperties = rentalPropertyState.items;
        this.filteredRentalProperties = rentalPropertyState.items;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectItem(item) {
    this.navController.push(ViewRentalProperty, item.id);
  }

  goToCreateRentalProperty(){
    this.navController.push(CreateRentalProperty)
  }

  search(event){
    this.filteredRentalProperties = this.rentalProperties.filter((rentalProperty: RentalProperty) => {
      let searchTerm = event.target.value.toLowerCase();
      return rentalProperty.tenantName.toLowerCase().indexOf(searchTerm) >= 0 ||
        rentalProperty.address.toLowerCase().indexOf(searchTerm) >= 0 ||
        rentalProperty.buildingName.toLowerCase().indexOf(searchTerm) >= 0;
    });
  }
}
