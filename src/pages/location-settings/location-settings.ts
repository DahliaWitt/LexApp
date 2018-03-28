/**
 * @author    Drake Witt <dwitt@dranweb.com>
 * @copyright Copyright (c) 2018
 * @license   MIT
 *
 * location-settings.ts
 * Date Created: 10/18/17
 * Date Modified: 3/28/18
 *
 * View that gets a user's district by GPS or address.
 * Just a warning, this page is a mess.
 */

import { Component } from '@angular/core';
import { ViewController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleAnalytics } from "@ionic-native/google-analytics";
import { EsriLoaderService } from 'angular-esri-loader';

import { LegistarProvider } from '../../providers/legistar/legistar';
import { LocalRepStorageProvider } from '../../providers/local-rep-storage/local-rep-storage';
import { AddressCompleteProvider } from '../../providers/address-complete/address-complete';

@Component({
  selector: 'page-location-settings',
  templateUrl: 'location-settings.html',
})

export class LocationSettingsPage {
  councilPerson;
  searchTerm = "";
  locations = [];

  constructor(public viewCtrl: ViewController,
              public geolocation: Geolocation,
              public esriLoader: EsriLoaderService,
              public legistar: LegistarProvider,
              public localRepStorage: LocalRepStorageProvider,
              public addressCompleteProvider: AddressCompleteProvider,
              public loading: LoadingController,
              public alertCtrl: AlertController,
              public ga: GoogleAnalytics) {}

  ionViewDidEnter() {
    this.ga.trackView('Location Settings');
  }

  // Use GPS to get location
  getLocation() {
    const loading = this.loading.create({
      spinner: 'crescent'
    });
    loading.present();
    // Use the Ionic Native GPS module to get LatLong
    this.geolocation.getCurrentPosition().then((resp) => {
      /**
       * The ArcGIS server won't accept "normal" LatLong...
       * We have to convert to another projection using their SDK
       */
      this.esriLoader.load({
        // use a specific version of the API instead of the latest
        url: 'https://js.arcgis.com/3.18/'
      }).then(() => {
        // Load just the module we need
        this.esriLoader.loadModules(['esri/geometry/webMercatorUtils']).then(([webMercatorUtils]) => {
          // Convert our Lat Long to XY
          var xy = webMercatorUtils.lngLatToXY(resp.coords.longitude, resp.coords.latitude);
          // Create object the API wants
          let obj = { "x": xy[0], "y": xy[1], "spatialReference": { "wkid": 102100 } };
          this.localRepStorage.getCoords(obj).subscribe(
            data => {
              loading.dismissAll();
              if (data.features[0]) {
                this.councilPerson = data.features[0].attributes;
                this.localRepStorage.setLocalRep(this.councilPerson);
                this.viewCtrl.dismiss();
              } else {
                this.showError("No district found. Are you inside Lexington? Try searching by address.");
              }
            }, error => {
              loading.dismissAll();
              this.showError(error);
            }
          );
        }).catch((error) => {
          loading.dismissAll();
          this.showError(error);
        });
      });
    }).catch((error) => {
      loading.dismissAll();
      this.showError('Error getting location ' + error);
    });
  }

  searchAddress(selection) {
    this.localRepStorage.getAddress(selection).subscribe(data => {
      this.locations = data.results;
    }, error => {
      this.showError(error);
    })
  }

  setAddress(location) {
    this.localRepStorage.getCoords(location.geometry).subscribe(
      data => {
        if (data.features[0]) {
          this.councilPerson = data.features[0].attributes;
          this.localRepStorage.setLocalRep(this.councilPerson);
          this.viewCtrl.dismiss();
        } else {
          this.showError("No district found. Are you inside Lexington? Try searching by address.");
        }
      }, error => {
        this.showError(error);
      }
    );
  }

  showError(msg) {
    let alert = this.alertCtrl.create({
      title: "Error",
      subTitle: msg,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }
}
