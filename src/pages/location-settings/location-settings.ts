import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { EsriLoaderService } from 'angular-esri-loader';
import {LegistarProvider} from '../../providers/legistar/legistar';
import { LocalRepStorageProvider } from '../../providers/local-rep-storage/local-rep-storage';


/**
 * Generated class for the LocationSettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location-settings',
  templateUrl: 'location-settings.html',
})
export class LocationSettingsPage {

  councilPerson 

  constructor(public viewCtrl: ViewController, public navParams: NavParams, public geolocation: Geolocation, public esriLoader: EsriLoaderService, public legistar: LegistarProvider,
     public localRepStorage: LocalRepStorageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationSettingsPage');
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.esriLoader.load({
        // use a specific version of the API instead of the latest
        url: 'https://js.arcgis.com/3.18/'
      }).then(() => {
        // load the map class needed to create a new map
        this.esriLoader.loadModules(['esri/geometry/webMercatorUtils']).then(([webMercatorUtils]) => {
          // create the map at the DOM element in this component
          var xy = webMercatorUtils.lngLatToXY(resp.coords.longitude, resp.coords.latitude);
          console.log(xy);
          let obj = {"x": xy[0],"y": xy[1],"spatialReference":{"wkid":102100}}
          console.log(obj);
          this.legistar.testDonger(obj).subscribe(
            data => {
              this.councilPerson = data.features[0].attributes;
              this.localRepStorage.setLocalRep(this.councilPerson);
              this.viewCtrl.dismiss();
            }
          );
        });
      });

        // alert(webMercatorUtils.lngLatToXY(resp.coords.longitude, resp.coords.latitude));

      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }

}
