/**
 * @author    Drake Witt <dwitt@dranweb.com>
 * @copyright Copyright (c) 2017
 * @license   Apache-2.0
 *
 * local-rep-storage.ts
 * Date Created: 10/24/17
 * Date Modified: 10/26/17
 *
 * Announcement feed from Facebook.
 */

import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FacebookFeedProvider } from '../../providers/facebook-feed/facebook-feed';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-city-announcements',
  templateUrl: 'city-announcements.html'
})
export class CityAnnouncementsPage {

  feed = [];
  constructor(public navCtrl: NavController, public facebookFeed: FacebookFeedProvider, public loading: LoadingController,
  public iab: InAppBrowser) {}

  ionViewDidEnter() {
    let loading = this.loading.create({
      spinner: 'crescent'
    });
    loading.present();
    this.facebookFeed.getCity().subscribe(data => {
      data.data.map(post => {
        this.facebookFeed.getAttachments(post).subscribe(media => {
          console.log(Object.assign({}, post, media.data[0]));
          this.feed.push(Object.assign({}, post, media.data[0])); 
        })
      })
      if (loading) {
        loading.dismissAll();
        loading = null;
      } 
      
    })
  }

  openFB(post) {
    let browser = this.iab.create(post.url);
  }
}
