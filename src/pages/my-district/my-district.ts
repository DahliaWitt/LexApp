import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { LocationSettingsPage } from '../location-settings/location-settings';
import { LocalRepStorageProvider } from '../../providers/local-rep-storage/local-rep-storage';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { EmailComposer } from '@ionic-native/email-composer';


@Component({
  selector: 'page-my-district',
  templateUrl: 'my-district.html'
})
export class MyDistrictPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page

  councilMember;
  private itemDoc: AngularFirestoreDocument<any>;
  item;
  address;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public localRepStorage: LocalRepStorageProvider,
    private afs: AngularFirestore, public emailComposer: EmailComposer) {
    this.localRepStorage.getLocalRep().then(data => {
      this.councilMember = data;
      if(this.councilMember != null) {
        this.itemDoc = afs.doc<any>('districts/' + this.councilMember.DISTRICT);
        this.item = this.itemDoc.valueChanges();
        this.item.subscribe(data => {
          console.log(data);
          this.address = data.email;
          this.localRepStorage.setEmail(data.email);
        })
        console.log(this.councilMember.DISTRICT)
      }
    });
  }

  presentModal() {
    let modal = this.modalCtrl.create(LocationSettingsPage);
    modal.onDidDismiss(() => {
      console.log("did dismiss");
      this.localRepStorage.getLocalRep().then(data => {
        this.councilMember = data;
        if(this.councilMember != null) {
          this.itemDoc = this.afs.doc<any>('districts/' + this.councilMember.DISTRICT);
          this.item = this.itemDoc.valueChanges();
          this.item.subscribe(data => {
            console.log(data);
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
