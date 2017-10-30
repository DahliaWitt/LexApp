import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { OrdinancesPage } from '../pages/ordinances/ordinances';
import { MyDistrictPage } from '../pages/my-district/my-district';
import { CityAnnouncementsPage } from '../pages/city-announcements/city-announcements';
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
import { FacebookFeedProvider } from '../providers/facebook-feed/facebook-feed';

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ErrorReporterProvider } from '../providers/error-reporter/error-reporter';


@NgModule({
  declarations: [
    MyApp,
    OrdinancesPage,
    MyDistrictPage,
    CityAnnouncementsPage,
    TabsControllerPage,
    LocationSettingsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    EsriLoaderModule,
    AutoCompleteModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OrdinancesPage,
    MyDistrictPage,
    CityAnnouncementsPage,
    TabsControllerPage,
    LocationSettingsPage
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
    FacebookFeedProvider,
    ErrorReporterProvider
  ]
})
export class AppModule {}