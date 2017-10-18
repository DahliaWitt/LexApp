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


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { MatterProvider } from '../providers/matter/matter';
import { LegistarProvider } from '../providers/legistar/legistar';
import { LocalRepStorageProvider } from '../providers/local-rep-storage/local-rep-storage';

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
    IonicModule.forRoot(MyApp)
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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MatterProvider,
    LegistarProvider,
    LocalRepStorageProvider
  ]
})
export class AppModule {}