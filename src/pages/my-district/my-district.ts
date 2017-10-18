import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { LocationSettingsPage } from '../location-settings/location-settings';
import { LocalRepStorageProvider } from '../../providers/local-rep-storage/local-rep-storage';

@Component({
  selector: 'page-my-district',
  templateUrl: 'my-district.html'
})
export class MyDistrictPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page

  councilMember;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public localRepStorage: LocalRepStorageProvider) {

  }

  presentModal() {
    let modal = this.modalCtrl.create(LocationSettingsPage);
    modal.onDidDismiss(() => {
      console.log("did dismiss");
      this.councilMember = this.localRepStorage.getLocalRep();
    });
    modal.present();
  }

  ionViewEnter() {
    this.councilMember = this.localRepStorage.getLocalRep();
  } 
  
}
