import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { EsriLoaderService } from 'angular-esri-loader';
import { LegistarProvider } from '../../providers/legistar/legistar';
import { LocalRepStorageProvider } from '../../providers/local-rep-storage/local-rep-storage';
import { AddressCompleteProvider } from '../../providers/address-complete/address-complete';

@IonicPage()
@Component({
  selector: 'page-location-settings',
  templateUrl: 'location-settings.html',
})
export class LocationSettingsPage {

  councilPerson;
  searchTerm = "";
  locations = [];

  constructor(public viewCtrl: ViewController, public navParams: NavParams, public geolocation: Geolocation, public esriLoader: EsriLoaderService, public legistar: LegistarProvider,
     public localRepStorage: LocalRepStorageProvider, public addressCompleteProvider: AddressCompleteProvider, public loading: LoadingController, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {}

  getLocation() {
    const loading = this.loading.create({
      spinner: 'crescent'
    });
    loading.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      this.esriLoader.load({
        // use a specific version of the API instead of the latest
        url: 'https://js.arcgis.com/3.18/'
      }).then(() => {
        // load the map class needed to create a new map
        this.esriLoader.loadModules(['esri/geometry/webMercatorUtils']).then(([webMercatorUtils]) => {
          // create the map at the DOM element in this component
          var xy = webMercatorUtils.lngLatToXY(resp.coords.longitude, resp.coords.latitude);
          let obj = {"x": xy[0],"y": xy[1],"spatialReference":{"wkid":102100}}
          this.localRepStorage.getCoords(obj).subscribe(
            data => {
              loading.dismissAll();
              if(data.features[0]) {
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
        if(data.features[0]) {
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
