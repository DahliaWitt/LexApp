import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationSettingsPage } from './location-settings';

@NgModule({
  declarations: [
    LocationSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationSettingsPage),
  ],
})
export class LocationSettingsPageModule {}
