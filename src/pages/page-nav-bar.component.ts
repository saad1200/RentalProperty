import { RentalProperty } from './../models/rental-property.model';
import { NavController } from 'ionic-angular';
import { Component, Input } from '@angular/core';

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

                <button ion-button *ngIf="!updateItem" (click)="goToCreateRentalProperty()" >
                    Create
                </button>

                <button ion-button  *ngIf="updateItem" (click)="goToUpdateRentalProperty()">
                    Update
                </button>

            </ion-buttons>

        </ion-navbar>`
})

export class PageNavBar {
    @Input() title: string;
    @Input() updateItem: RentalProperty;

    constructor(private nav: NavController){
    }

    goToCreateRentalProperty() {
        this.nav.push(CreateRentalProperty);
    }

    goToUpdateRentalProperty() {
        this.nav.push(UpdateRentalProperty, this.updateItem);
    }
}