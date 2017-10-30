/**
 * @author    Drake Witt <dwitt@dranweb.com>
 * @copyright Copyright (c) 2017
 * @license   Apache-2.0
 *
 * local-rep-storage.ts
 * Date Created: 10/22/17
 * Date Modified: 10/26/17
 *
 * Autocompleter for the address search box.
 */

import { AutoCompleteService } from 'ionic2-auto-complete';
import { Http } from '@angular/http';
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map'

@Injectable()
export class AddressCompleteProvider implements AutoCompleteService {
  labelAttribute = null;

  constructor(private http:Http) {}

  getResults(keyword:string) {
    let replaced = keyword.replace(/ /g, '+');    
    return this.http.get("http://maps.lexingtonky.gov/mapit/Map/GetSearchSuggestions?term="+replaced)
      .map(result => {
        return result.json()
      });
  }
}