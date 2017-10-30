import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class ErrorReporterProvider {

  constructor(public http: Http, public alertCtrl: AlertController) {}

  showError(msg) {
    let alert = this.alertCtrl.create({
      title: "Error",
      subTitle: msg,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
