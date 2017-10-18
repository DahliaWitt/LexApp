import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

/*
  Generated class for the LegistarProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

@Injectable()
export class LegistarProvider {

  constructor(public http: Http) {
    console.log('Hello LegistarProvider Provider');
  }

  //http://coenraets.org/blog/2016/02/angular2-ionic2-rest-services/
  //?$top=10&$skip=0
  // https://webapi.legistar.com/v1/lexington/Matters?$filter=MatterAgendaDate+ge+datetime%272017-09-01%27+and+MatterAgendaDate+lt+datetime%272019-12-21%27
  // https://webapi.legistar.com/v1/lexington/Matters?$top=10&$skip=0
  getMatters() {
    return this.http.get('https://webapi.legistar.com/v1/lexington/Matters?$filter=MatterAgendaDate+ge+datetime%272017-09-01%27+and+MatterAgendaDate+lt+datetime%272019-12-21%27')
      .map(res => res.json())
      .catch(this.handleError);
  }
  testDonger(geometry) {
    let replacement = encodeURIComponent(JSON.stringify(geometry));
    return this.http.get('http://maps.lexingtonky.gov/lfucggis/rest/services/political/MapServer/1/query?f=json&where=&returnGeometry=false&spatialRel=esriSpatialRelIntersects&geometry=' + replacement + '&geometryType=esriGeometryPoint&inSR=102100&outFields=DISTRICT%2CREP%2CURL&outSR=102100')
      .map(res => res.json())
      .catch(this.handleError);
  }

  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}

/*
import {Injectable} from 'angular2/core';
import {SERVER_URL} from './config';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
 
let favorites = [],
    propertiesURL = SERVER_URL + '/properties',
    favoritesURL = propertiesURL + '/favorites';
 
@Injectable()
export class PropertyService {
 
    constructor (http:Http) {
        this.http = http;
    }
 
    findAll() {
        return this.http.get(propertiesURL)
            .map(res => res.json())
            .catch(this.handleError);
    }
 
    favorite(property) {
        let body = JSON.stringify(property);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(favoritesURL, body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }
 
    handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
 
}
*/