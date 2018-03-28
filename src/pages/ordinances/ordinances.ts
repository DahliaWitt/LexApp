/**
 * @author    Drake Witt <dwitt@dranweb.com>
 * @copyright Copyright (c) 2018
 * @license   MIT
 *
 * ordinances.ts
 * Date Created: 10/18/17
 * Date Modified: 3/28/18
 *
 * View that is responsible for displaying ordinances to the user.
 */

import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { SafariViewController } from '@ionic-native/safari-view-controller';
import { AlertController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { GoogleAnalytics } from "@ionic-native/google-analytics";
import { InAppBrowser } from "@ionic-native/in-app-browser";

import { LegistarProvider } from '../../providers/legistar/legistar';
import { LocalRepStorageProvider } from '../../providers/local-rep-storage/local-rep-storage';
import { ErrorReporterProvider } from '../../providers/error-reporter/error-reporter';

@Component({
  selector: 'page-ordinances',
  templateUrl: 'ordinances.html'
})
export class OrdinancesPage {
  ordinances;

  constructor(
    public loading: LoadingController,
    public legistarProvider: LegistarProvider,
    public svc: SafariViewController,
    public alertCtrl: AlertController,
    public localRepStorage: LocalRepStorageProvider,
    public emailComposer: EmailComposer,
    public errorReporter: ErrorReporterProvider,
    public ga: GoogleAnalytics,
    public iab: InAppBrowser
  ) {}

  // Google analytics
  ionViewDidEnter() {
    this.ga.trackView('Ordinances');
  }

  // On entering the view, start a loading spinner and get ordinances and resolutions.
  ionViewWillEnter() {
    const loading = this.loading.create({
      spinner: 'crescent'
    });
    loading.present();

    this.legistarProvider.getMatters().subscribe(data => {
        this.ordinances = data;
        loading.dismissAll();
      }, error => {
        loading.dismissAll();
        this.errorReporter.showError(error);
      })
  }

  /* Click button to open legislation. Shows spinner until the attachment is found.
     If no attachment is associated with matter, show alert. */
  openLegislation(matter) {
    const loading = this.loading.create({
      spinner: 'crescent'
    });
    loading.present();

    this.legistarProvider.getAttachments(matter).subscribe(data => {
      if(data.length >= 1) {
        loading.dismissAll();
        let url = data[0].MatterAttachmentHyperlink;
        this.svc.isAvailable().then((available: boolean) => {
          if (available) {
            this.svc.show({
              url: url,
              hidden: false,
              animated: false,
              transition: 'curl',
              enterReaderModeIfAvailable: true,
              tintColor: '#0959a7'
            })
              .subscribe((result: any) => {
                },
                (error: any) => console.error(error)
              );

          } else {
            // use InAppBrowser as fallback
            this.iab.create(url, "_blank");
          }
        });
      } else {
        loading.dismissAll();
        const alert = this.alertCtrl.create({
          title: 'No Attachments for This Ordinance',
          buttons: ['Dismiss']
        });
        alert.present();
      }
    }, error => {
      loading.dismissAll();
      this.errorReporter.showError(error);
    })
  }

  // Opens an email on the device pointing towards the email of the council member of the user.
  messageCouncilPerson(matter) {
    this.localRepStorage.getLocalRep().then(data => {
      let councilMember = data;
      // If they have a council member set.
      if(councilMember) {
        this.localRepStorage.getEmail().then((address: string) => {
          let email = {
            to: address,
            subject: 'LexApp Comment On: ' + matter.MatterName,
            body: '',
            isHtml: true
          };
          // Opens the email
          this.emailComposer.open(email);
        })
      } else {
        const alert = this.alertCtrl.create({
          title: 'No Council Member Set',
          subTitle: 'Please select district in the settings of the "My District" tab.',
          buttons: ['Dismiss']
        });
        alert.present();
      }
    }).catch(error => {
      this.errorReporter.showError(error);
    });
  }
}
