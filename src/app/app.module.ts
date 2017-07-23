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
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { PageNavBar } from '../pages/page-nav-bar.component'; 
import { AddRentalProperty } from '../pages/create/create-rental-property.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RentalPropertyActions } from '../actions/rental-property.actions'


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
    HomePage,
    ListPage,
    AddRentalProperty
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NgReduxModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PageNavBar,
    HomePage,
    ListPage,
    AddRentalProperty    
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
