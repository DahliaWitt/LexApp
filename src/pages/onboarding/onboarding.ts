/**
 * @author    Drake Witt <dwitt@dranweb.com>
 * @copyright Copyright (c) 2018
 * @license   MIT
 *
 * onboarding.ts
 * Date Created: 3/26/18
 * Date Modified: 3/28/18
 *
 * View that is responsible for giving a tutorial for the user.
 */

import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { GoogleAnalytics } from "@ionic-native/google-analytics";
import { trigger, transition, style, state, animate, keyframes } from '@angular/animations';
import { Storage } from '@ionic/storage';

import { TabsControllerPage } from "../tabs-controller/tabs-controller";

@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
  animations: [
    trigger('bounce', [
      state('*', style({
        transform: 'translateX(0)'
      })),
      transition('* => rightSwipe', animate('700ms ease-out', keyframes([
        style({transform: 'translateX(0)', offset: 0}),
        style({transform: 'translateX(-65px)', offset: .3}),
        style({transform: 'translateX(0)', offset: 1})
      ]))),
      transition('* => leftSwipe', animate('700ms ease-out', keyframes([
        style({transform: 'translateX(0)', offset: 0}),
        style({transform: 'translateX(65px)', offset: .3}),
        style({transform: 'translateX(0)', offset: 1})
      ])))
    ])
  ]
})

export class OnboardingPage {
  @ViewChild(Slides) slides: Slides;
  skipMsg: string = "Skip";
  state: string = 'x';

  constructor(public navCtrl: NavController,
              public ga: GoogleAnalytics,
              public storage: Storage) {}

  ionViewWillEnter() {
    this.storage.get('onboarding').then((doneOnboarding) => {
      if(doneOnboarding) {
        this.navCtrl.push(TabsControllerPage);
      }
    });
  }

  ionViewDidEnter() {
    this.ga.trackView('Onboarding');
  }

  skip() {
    this.storage.set('onboarding', true);
    this.navCtrl.push(TabsControllerPage);
  }

  // On the last slide, change the text of the bottom button.
  slideChanged() {
    if (this.slides.isEnd())
      this.skipMsg = "Exit to app";
  }

  // Tracker for animation
  slideMoved() {
    if (this.slides.getActiveIndex() >= this.slides.getPreviousIndex())
      this.state = 'rightSwipe';
    else
      this.state = 'leftSwipe';
  }

  animationDone() {
    this.state = 'x';
  }

}
