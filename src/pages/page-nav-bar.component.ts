import { NavController } from 'ionic-angular';
import { Component, Input } from '@angular/core';

import { AddRentalProperty } from '../pages/create/create-rental-property.component';

@Component({
    selector: 'page-nav-bar',
    template: `<ion-navbar>
            <button ion-button menuToggle>
            <ion-icon name="menu"></ion-icon>
            </button>
            <ion-title>{{title}}</ion-title>
            <ion-buttons (click)="addRentalProperty()" end>
                <button ion-button >
                    <ion-icon name="add"></ion-icon>
                </button>
            </ion-buttons>
        </ion-navbar>`
})

export class PageNavBar {
    @Input() title: string;

    constructor(private nav: NavController){
    }

    addRentalProperty() {
        this.nav.push(AddRentalProperty);
    }
}