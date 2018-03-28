/**
 * @author    Drake Witt <dwitt@dranweb.com>
 * @copyright Copyright (c) 2018
 * @license   MIT
 *
 * legistar.ts
 * Date Created: 10/18/17
 * Date Modified: 3/28/18
 *
 * Provider that communicates with Legistar
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class LegistarProvider {

  // TODO: Update depricated Http module
  constructor(public http: Http) {}

  // Gets ordinances and resolutions.
  getMatters() {
    // The query is pretty simple. It orders by MatterId, gets the top 30, and only gets ordinances and resolutions.
    return this.http.get('http://webapi.legistar.com/v1/Lexington/Matters?$orderby=MatterId desc&$top=30&$filter=MatterTypeId eq 52 or MatterTypeId eq 53')
      .map(res => res.json())
      .catch(this.handleError);
  }

  // Get the attachment for a given ordinance or resolution.
  getAttachments(matter) {
    return this.http.get('http://webapi.legistar.com/v1/Lexington/Matters/' + matter.MatterId + "/Attachments")
    .map(res => res.json())
    .catch(this.handleError);
  }

  // Get the events for the calendar
  getEvents() {
    let d = new Date();
    // Set the month 3 months previously, so it gets a few past events (if it is March it will load January+)
    d.setMonth(d.getMonth() - 3);
    let dateString = d.toISOString();
    return this.http.get("http://webapi.legistar.com/v1/Lexington/Events?$filter=EventDate ge datetime'" + dateString + "'")
      .map(res => res.json())
      .catch(this.handleError);
  }

  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
