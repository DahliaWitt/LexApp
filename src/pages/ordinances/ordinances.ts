import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { LegistarProvider } from '../../providers/legistar/legistar';

@Component({
  selector: 'page-ordinances',
  templateUrl: 'ordinances.html'
})
export class OrdinancesPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  ordinaces;

  constructor(public loading: LoadingController, public legistarProvider: LegistarProvider) {
  }

  ionViewWillEnter() {
    const loading = this.loading.create({
      spinner: 'hide',
      content: `
        <div class="custom-spinner-container">
          <div class="custom-spinner-box"></div>
        </div>`
    });

    this.legistarProvider.getMatters().subscribe(
      data => this.ordinaces = data
    );
  }
 
}
