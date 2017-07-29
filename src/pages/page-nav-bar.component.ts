import { RentalPropertyActions } from './../actions/rental-property.actions';
import { RentalProperty } from './../models/rental-property.model';
import { NavController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { dispatch } from '@angular-redux/store';

import { CreateRentalProperty } from '../pages/create/create-rental-property.component';
import { UpdateRentalProperty } from '../pages/update/update-rental-property.component';

@Component({
    selector: 'page-nav-bar',
    template: `<ion-navbar>
            <button ion-button menuToggle>
            <ion-icon name="menu"></ion-icon>
            </button>
            <ion-title>{{title}}</ion-title>
            
            <ion-buttons end>

                <button ion-button *ngIf="!itemId" (click)="goToCreateRentalProperty()" >
                    Create
                </button>

                <button ion-button  *ngIf="itemId" (click)="goToUpdateRentalProperty()">
                    Update
                </button>

                <button ion-button  *ngIf="itemId" > | </button>

                <button ion-button  *ngIf="itemId" (click)="goToDeleteRentalProperty()">
                    Delete
                </button>

            </ion-buttons>

        </ion-navbar>`
})

export class PageNavBar {
    @Input() title: string;
    @Input() itemId: string;

    @dispatch() delete(id: string) {
        return this.rentalPropertyActions.delete(id);
    }

    constructor(private navController: NavController, private rentalPropertyActions: RentalPropertyActions){
    }

    goToCreateRentalProperty() {
        this.navController.push(CreateRentalProperty);
    }

    goToUpdateRentalProperty() {
        this.navController.push(UpdateRentalProperty, this.itemId);
    }

    goToDeleteRentalProperty() {
        this.delete(this.itemId);
    }
}