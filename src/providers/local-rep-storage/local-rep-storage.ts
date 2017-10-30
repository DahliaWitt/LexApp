/**
 * @author    Drake Witt <dwitt@dranweb.com>
 * @copyright Copyright (c) 2017
 * @license   Apache-2.0
 *
 * local-rep-storage.ts
 * Date Created: 10/22/17
 * Date Modified: 10/26/17
 *
 * Provider that handles local storage and communication with Lexington's ArcGIS.
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class LocalRepStorageProvider {

  localRep = null;
  localRepFetched = false;
  email = null;

  constructor(public http: Http, public storage: Storage) {}

  getCoords(geometry) {
    let replacement = encodeURIComponent(JSON.stringify(geometry));
    return this.http.get('http://maps.lexingtonky.gov/lfucggis/rest/services/political/MapServer/1/query?f=json&where=&returnGeometry=false&spatialRel=esriSpatialRelIntersects&geometry=' + replacement + '&geometryType=esriGeometryPoint&inSR=102100&outFields=DISTRICT%2CREP%2CURL&outSR=102100')
      .map(res => res.json())
      .catch(this.handleError);
  }

  getAddress(query) {
    let replacement = encodeURIComponent(JSON.stringify(query));
    return this.http.get('http://maps.lexingtonky.gov/lfucggis/rest/services/property/MapServer/find?f=json&searchText=' + query + '&contains=false&returnGeometry=true&layers=0&searchFields=ADDRESS')
      .map(res => res.json())
      .catch(this.handleError);
  }

  setLocalRep(localRep) {
    this.localRep = localRep;
    this.storage.set('localRep', localRep);
  }

  getLocalRep() {
    return new Promise((resolve, reject) => {
      this.storage.get('localRep').then((val) => {
         this.localRep = val;
         resolve(val);
       });
    })
  }

  setEmail(email) {
    this.email = email;
    this.storage.set('email', email);
  }
  
  getEmail() {
    return new Promise((resolve, reject) => {
      this.storage.get('email').then((val) => {
         this.email = val;
         resolve(val);
       });
    })
  }

  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
