import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OrdinancesPage } from '../ordinances/ordinances';
import { MyDistrictPage } from '../my-district/my-district';
import { CityAnnouncementsPage } from '../city-announcements/city-announcements';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = OrdinancesPage;
  tab2Root: any = MyDistrictPage;
  tab3Root: any = CityAnnouncementsPage;
  constructor(public navCtrl: NavController) {
  }
  
}
