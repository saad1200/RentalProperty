import { RentalProperty } from './../../models/rental-property.model';
import { Subscription } from 'rxjs/Rx';
import { RentalPropertyState } from './../../models/rental-property-state.model';
import { Observable } from 'rxjs/Observable';

import { NavController } from 'ionic-angular';
import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { select } from '@angular-redux/store';
import { NavParams } from 'ionic-angular';

import { RentalPropertyActions } from '../../actions/rental-property.actions'

@Component({
    templateUrl: './view-rental-property.html'
})

export class ViewRentalProperty implements AfterContentInit, OnDestroy {

    subscription: Subscription;
    rentalProperty: RentalProperty;
    rentalPropertyId: string;

    @select() readonly rentalPropertyState$: Observable<RentalPropertyState>;

    constructor(private navController: NavController,
        private navParams: NavParams) {
        this.rentalPropertyId = navParams.data;
    }

    ngAfterContentInit() {
        this.subscription = this.rentalPropertyState$.subscribe(
            (rentalPropertyState) => {
                
                this.rentalProperty = rentalPropertyState.items.find(x=>x.id == this.rentalPropertyId);
                
                if(!this.rentalProperty) {
                    this.navController.pop();
                }
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}