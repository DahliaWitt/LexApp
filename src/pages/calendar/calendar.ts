import { Component } from '@angular/core';
import {AlertController, LoadingController} from 'ionic-angular';
import {LegistarProvider} from "../../providers/legistar/legistar";
import * as moment from 'moment';
import {InAppBrowser} from "@ionic-native/in-app-browser";

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

  constructor(public legistar: LegistarProvider, public alertCtrl: AlertController, public iab: InAppBrowser,
              public loading: LoadingController) { }

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

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    const loading = this.loading.create({
      spinner: 'crescent'
    });
    loading.present();
    if(event.originalObj.EventAgendaFile) {
      let browser = this.iab.create(event.originalObj.EventAgendaFile, "_blank");
      loading.dismissAll();
      browser.on("loadstart");
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
