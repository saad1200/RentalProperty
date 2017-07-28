import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import devTools from 'remote-redux-devtools';
import { applyMiddleware, Store, compose, createStore } from 'redux';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { persistStore, autoRehydrate } from 'redux-persist';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { SQLite } from '@ionic-native/sqlite';

import { Guid } from '../providers';
import rootReducer from '../reducers';
import { MyApp } from './app.component';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { BarChartComponent } from '../pages/chart/bar-chart.component';
import { ListPage } from '../pages/list/list';
import { PageNavBar } from '../pages/page-nav-bar.component'; 
import { CreateRentalProperty } from '../pages/create/create-rental-property.component';
import { UpdateRentalProperty } from '../pages/update/update-rental-property.component';
import { ViewRentalProperty } from '../pages/view/view-rental-property.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RentalPropertyActions } from '../actions/rental-property.actions'
import { ChartsModule } from 'ng2-charts/ng2-charts';

const enhancer = compose(
  applyMiddleware(thunk, createLogger()),
  autoRehydrate(),
  devTools({
    name: 'realproperty', realtime: true,
  })
);


export const store: Store<any> = createStore(rootReducer, enhancer);

@NgModule({
  declarations: [
    MyApp,
    PageNavBar,
    DashboardPage,
    BarChartComponent,
    ListPage,
    CreateRentalProperty,
    UpdateRentalProperty,
    ViewRentalProperty
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NgReduxModule,
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PageNavBar,
    DashboardPage,
    BarChartComponent,
    ListPage,
    CreateRentalProperty,
    UpdateRentalProperty,   
    ViewRentalProperty   
  ],
  providers: [
    SQLite,
    Guid,
    StatusBar,
    SplashScreen,
    RentalPropertyActions,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
    constructor(ngRedux: NgRedux<any>) {
      persistStore(store, { whitelist: ['rentalPropertyState'] }, () => {
        compose(
          applyMiddleware(thunk, createLogger()),
          null,
          devTools({
            name: 'realproperty', realtime: true,
          })
        )
      });

      ngRedux.provideStore(store);
  }
}
