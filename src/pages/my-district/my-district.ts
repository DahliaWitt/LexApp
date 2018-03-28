/**
 * @author    Drake Witt <dwitt@dranweb.com>
 * @copyright Copyright (c) 2018
 * @license   MIT
 *
 * my-district.ts
 * Date Created: 10/18/17
 * Date Modified: 3/28/18
 *
 * View that shows information about a user's council member.
 */

import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { EmailComposer } from '@ionic-native/email-composer';
import { GoogleAnalytics } from "@ionic-native/google-analytics";

import { LocationSettingsPage } from '../location-settings/location-settings';
import { LocalRepStorageProvider } from '../../providers/local-rep-storage/local-rep-storage';

@Component({
  selector: 'page-my-district',
  templateUrl: 'my-district.html'
})

export class MyDistrictPage {
  councilMember;
  private itemDoc: AngularFirestoreDocument<any>;
  item;
  address;

  // Since there is no gov. system (that we know of...) that has biographies, we have a small firebase that contains them.
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public localRepStorage: LocalRepStorageProvider,
    private afs: AngularFirestore, public emailComposer: EmailComposer, public ga: GoogleAnalytics) {
    this.localRepStorage.getLocalRep().then(data => {
      this.councilMember = data;
      if(this.councilMember != null) {
        this.itemDoc = afs.doc<any>('districts/' + this.councilMember.DISTRICT);
        this.item = this.itemDoc.valueChanges();
        this.item.subscribe(data => {
          this.address = data.email;
          this.localRepStorage.setEmail(data.email);
        });
      }
    });
  }

  ionViewDidEnter() {
    this.ga.trackView('My District');
  }

  presentModal() {
    let modal = this.modalCtrl.create(LocationSettingsPage);
    modal.onDidDismiss(() => {
      this.localRepStorage.getLocalRep().then(data => {
        this.councilMember = data;
        if(this.councilMember != null) {
          this.itemDoc = this.afs.doc<any>('districts/' + this.councilMember.DISTRICT);
          this.item = this.itemDoc.valueChanges();
          this.item.subscribe(data => {
            this.address = data.email;
            this.localRepStorage.setEmail(data.email);
          })
        }
      });
    });
    modal.present();
  }

  openEmail() {
    let email = {
      to: this.address,
      subject: '',
      body: '',
      isHtml: true
    };
    this.emailComposer.open(email);
  }
}
