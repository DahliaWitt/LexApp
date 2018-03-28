import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { gaKey } from '../environment';
import {OnboardingPage} from "../pages/onboarding/onboarding";
import {GoogleAnalytics} from "@ionic-native/google-analytics";



@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = OnboardingPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, ga: GoogleAnalytics) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      //statusBar.overlaysWebView(true);


      ga.startTrackerWithId(gaKey)
        .then(() => {
          // Tracker is ready
          // You can now track pages or set additional information such as AppVersion or UserId
          ga.setAppVersion('3.1.0');
        })
        .catch(e => console.log('Error starting GoogleAnalytics', e));

      splashScreen.hide();
    });
  }

}
