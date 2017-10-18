import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LocalRepStorageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LocalRepStorageProvider {

  localRep = null;

  constructor(public http: Http) {
    console.log('Hello LocalRepStorageProvider Provider');
  }

  setLocalRep(localRep) {
    this.localRep = localRep;
  }

  getLocalRep() {
    return this.localRep;
  }

}
