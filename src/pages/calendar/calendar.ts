/**
 * @author    Drake Witt <dwitt@dranweb.com>
 * @copyright Copyright (c) 2018
 * @license   MIT
 *
 * calendar.ts
 * Date Created: 3/10/18
 * Date Modified: 3/28/18
 *
 * Calendar of LFUCG events
 */

import { Component } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
import { SafariViewController } from '@ionic-native/safari-view-controller';
import { InAppBrowser } from "@ionic-native/in-app-browser";
import {GoogleAnalytics} from "@ionic-native/google-analytics";
import * as moment from 'moment';

import {LegistarProvider} from "../../providers/legistar/legistar";


@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})

export class CalendarPage {
  eventSource;
  viewTitle;
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  constructor(public legistar: LegistarProvider,
              public alertCtrl: AlertController,
              public svc: SafariViewController,
              public iab: InAppBrowser,
              public loading: LoadingController,
              public ga: GoogleAnalytics) { }

  ionViewWillEnter() {
    const loading = this.loading.create({
      spinner: 'crescent'
    });
    loading.present();
    this.legistar.getEvents().subscribe(data => {
      let events = [];
      for(var i = 0; i < data.length; i++) {
        let eventDate = data[i].EventDate;
        eventDate = eventDate.substring(0, eventDate.length - 9);
        let event = {
          title: data[i].EventBodyName,
          allDay: false,
          startTime: moment(eventDate + " " + data[i].EventTime, "YYYY-MM-DD h:mm a").toDate(),
          endTime: moment(eventDate + " " + data[i].EventTime, "YYYY-MM-DD h:mm a").add(2, 'hours').toDate(),
          originalObj: data[i]
        };
        events.push(event);
      }
      loading.dismissAll();
      this.eventSource = events;
    }, error => {
      const alert = this.alertCtrl.create({
        title: 'Error Fetching Events',
        buttons: ['Dismiss']
      });
      alert.present();
      loading.dismissAll();
    })
  }

  ionViewDidEnter() {
    this.ga.trackView('Calendar');
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    const loading = this.loading.create({
      spinner: 'crescent'
    });
    loading.present();
    if(event.originalObj.EventAgendaFile) {
      this.svc.isAvailable().then((available: boolean) => {
            if (available) {
              this.svc.show({
                url: event.originalObj.EventAgendaFile,
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
              this.iab.create(event.originalObj.EventAgendaFile, "_blank");
            }
          }
        );
      loading.dismissAll();
    } else {
      loading.dismissAll();
      const alert = this.alertCtrl.create({
        title: 'No Agenda for This Event',
        buttons: ['Dismiss']
      });
      alert.present();
    }
    setTimeout(() => {
      loading.dismissAll();
    }, 1000);
  }

  previousMonthButton() {
    this.calendar.currentDate = new Date(this.calendar.currentDate.setMonth(this.calendar.currentDate.getMonth() - 1));
  }

  nextMonthButton() {
    this.calendar.currentDate = new Date(this.calendar.currentDate.setMonth(this.calendar.currentDate.getMonth() + 1));
  }

}
