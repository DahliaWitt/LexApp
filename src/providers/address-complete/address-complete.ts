/**
 * @author    Drake Witt <dwitt@dranweb.com>
 * @copyright Copyright (c) 2018
 * @license   MIT
 *
 * address-complete.ts
 * Date Created: 10/22/17
 * Date Modified: 3/28/18
 *
 * Auto-completer for the address search box.
 */

import { AutoCompleteService } from 'ionic2-auto-complete';
import { Http } from '@angular/http';
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map'

@Injectable()
export class AddressCompleteProvider implements AutoCompleteService {
  labelAttribute = null;

  // TODO: update Http module
  constructor(private http:Http) {}

  getResults(keyword:string) {
    let replaced = keyword.replace(/ /g, '+');
    return this.http.get("http://maps.lexingtonky.gov/mapit/Map/GetSearchSuggestions?term="+replaced)
      .map(result => {
        return result.json()
      });
  }
}
