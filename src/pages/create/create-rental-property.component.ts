import { NavController } from 'ionic-angular';
import { renderTextFormat } from 'ionic-angular/util/datetime-util';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgRedux, select, DevToolsExtension, dispatch } from '@angular-redux/store';


import { RentalProperty } from '../../models'
import { RentalPropertyActions } from '../../actions/rental-property.actions'

@Component({
    templateUrl: './create-rental-property.html'
})

export class AddRentalProperty implements OnInit {
    rentalPropertyForm: FormGroup;

    constructor(private navController: NavController,
                private formBulder: FormBuilder, 
                private rentalPropertyActions: RentalPropertyActions,
                private dispatcher: NgRedux<any>){
    }

    @dispatch() create(rentalProperty: RentalProperty) {
        return this.rentalPropertyActions.create(rentalProperty);
    }

    ngOnInit(){
        this.buildForm();
    }
    
    onSubmit() {
        let rentalProperty: RentalProperty = this.prepareSave(); 
        this.create(rentalProperty);
        this.navController.pop();
    }

    revert() { 
        this.buildForm();
     }
    
    prepareSave() : RentalProperty {
        return Object.assign({}, this.rentalPropertyForm.value);
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