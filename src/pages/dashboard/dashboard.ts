import { CreateRentalProperty } from './../create/create-rental-property.component';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  constructor(public navController: NavController) {
  }

  goToCreateRentalProperty(){
    this.navController.push(CreateRentalProperty)
  }

}
