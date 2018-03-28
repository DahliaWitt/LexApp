/**
 * @author    Drake Witt <dwitt@dranweb.com>
 * @copyright Copyright (c) 2018
 * @license   MIT
 *
 * error-reporter.ts
 * Date Created: 10/18/17
 * Date Modified: 3/28/18
 *
 * Service for reporting errors. Shows an alert to the user and logs it to Google Analytics and Visual Studio App Center
 */

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
