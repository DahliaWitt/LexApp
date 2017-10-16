import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { OrdinancesPage } from '../pages/ordinances/ordinances';
import { MyDistrictPage } from '../pages/my-district/my-district';
import { CityAnnouncementsPage } from '../pages/city-announcements/city-announcements';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MatterProvider } from '../providers/matter/matter';
import { LegistarProvider } from '../providers/legistar/legistar';

@NgModule({
  declarations: [
    MyApp,
    OrdinancesPage,
    MyDistrictPage,
    CityAnnouncementsPage,
    TabsControllerPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OrdinancesPage,
    MyDistrictPage,
    CityAnnouncementsPage,
    TabsControllerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MatterProvider,
    LegistarProvider
  ]
})
export class AppModule {}