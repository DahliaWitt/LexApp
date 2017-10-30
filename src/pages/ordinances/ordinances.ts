import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { LegistarProvider } from '../../providers/legistar/legistar';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AlertController } from 'ionic-angular';
import { LocalRepStorageProvider } from '../../providers/local-rep-storage/local-rep-storage';
import { ErrorReporterProvider } from '../../providers/error-reporter/error-reporter';
import { EmailComposer } from '@ionic-native/email-composer';


@Component({
  selector: 'page-ordinances',
  templateUrl: 'ordinances.html'
})
export class OrdinancesPage {
  ordinaces;
  councilMember;

  constructor(public loading: LoadingController, public legistarProvider: LegistarProvider, public iab: InAppBrowser,
    public alertCtrl: AlertController, public localRepStorage: LocalRepStorageProvider, public emailComposer: EmailComposer, public errorReporter: ErrorReporterProvider) {
  }

  ionViewWillEnter() {
    const loading = this.loading.create({
      spinner: 'crescent'
    });
    loading.present();

    this.legistarProvider.getMatters().subscribe(data => {
        this.ordinaces = data;
        loading.dismissAll();
      }, error => {
        loading.dismissAll();
        this.errorReporter.showError(error);
      })
  }

  openLegislation(matter) {
    const loading = this.loading.create({
      spinner: 'crescent'
    });
    loading.present();

    this.legistarProvider.getAttachments(matter).subscribe(data => {
      if(data.length >= 1) {
        loading.dismissAll();
        let url = data[0].MatterAttachmentHyperlink;
        let browser = this.iab.create(url);
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

  messageCouncilPerson(matter) {
    this.localRepStorage.getLocalRep().then(data => {
      let councilMember = data;
      if(councilMember) {
        this.localRepStorage.getEmail().then((address: string) => {
          let email = {
            to: address,
            subject: 'LexApp Comment On: ' + matter.MatterName,
            body: '',
            isHtml: true
          };
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
