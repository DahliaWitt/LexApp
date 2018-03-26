import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { OrdinancesPage } from '../pages/ordinances/ordinances';
import { MyDistrictPage } from '../pages/my-district/my-district';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { LocationSettingsPage } from '../pages/location-settings/location-settings';
import { EsriLoaderModule } from 'angular-esri-loader';
import { AutoCompleteModule } from 'ionic2-auto-complete';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { LegistarProvider } from '../providers/legistar/legistar';
import { LocalRepStorageProvider } from '../providers/local-rep-storage/local-rep-storage';
import { AddressCompleteProvider } from '../providers/address-complete/address-complete';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AlertController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ErrorReporterProvider } from '../providers/error-reporter/error-reporter';
import { NgCalendarModule  } from 'ionic2-calendar';
import {CalendarPage} from "../pages/calendar/calendar";
import {OnboardingPage} from "../pages/onboarding/onboarding";



@NgModule({
  declarations: [
    MyApp,
    OrdinancesPage,
    MyDistrictPage,
    TabsControllerPage,
    LocationSettingsPage,
    CalendarPage,
    OnboardingPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    EsriLoaderModule,
    AutoCompleteModule,
    NgCalendarModule,
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OrdinancesPage,
    MyDistrictPage,
    TabsControllerPage,
    LocationSettingsPage,
    CalendarPage,
    OnboardingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    InAppBrowser,
    EmailComposer,
    AlertController,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LegistarProvider,
    LocalRepStorageProvider,
    AddressCompleteProvider,
    ErrorReporterProvider
  ]
})
export class AppModule {}
