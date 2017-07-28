import { Subscription } from 'rxjs/Rx';
import { RentalPropertyState } from './../../models/rental-property-state.model';
import { Observable } from 'rxjs/Observable';
import { Guid } from './../../providers/storages/guid';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { dispatch, select } from '@angular-redux/store';

import { RentalProperty } from '../../models'
import { RentalPropertyActions } from '../../actions/rental-property.actions'

@Component({
    templateUrl: './update-rental-property.html'
})

export class UpdateRentalProperty implements OnInit,  AfterContentInit, OnDestroy {
    subscription: Subscription;
    rentalPropertyForm: FormGroup;
    rentalProperty: RentalProperty;
    rentalPropertyId: string;
    
    constructor(private navController: NavController,
                private formBulder: FormBuilder, 
                private rentalPropertyActions: RentalPropertyActions,
                private navParams: NavParams) {
                    this.rentalPropertyId = navParams.data;
    }

    @select() readonly rentalPropertyState$: Observable<RentalPropertyState>;

    @dispatch() update(rentalProperty: RentalProperty) {
        return this.rentalPropertyActions.update(rentalProperty);
    }

    ngOnInit(){
        this.buildForm();
    }
    
    ngAfterContentInit() {
        this.subscription = this.rentalPropertyState$.subscribe(
            (rentalPropertyState) => {
                this.rentalProperty = rentalPropertyState.items.find(x=>x.id == this.rentalPropertyId);
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onSubmit() {
        let rentalProperty: RentalProperty = this.prepareSave(); 
        this.update(rentalProperty);
        this.navController.pop();
    }

    revert() { 
        this.buildForm();
     }
    
    prepareSave() : RentalProperty {
        return Object.assign({ id: this.rentalProperty.id }, this.rentalPropertyForm.value);
    }

    buildForm() {
        this.rentalPropertyForm = this.formBulder.group({

            //property details
            buildingName: ['', Validators.required],
            propertyNumber: ['', Validators.required],
            address: ['', Validators.required],

            //tenant details
            tenantName: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            anotherPhoneNumber: ['', Validators.required],

            //contract details
            contractStartDate: ['', Validators.required],
            contractEndDate: ['', Validators.required],
            monthlyRent: ['', Validators.required],
        });
    }
}