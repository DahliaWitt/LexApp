/**
 * @author    Drake Witt <dwitt@dranweb.com>
 * @copyright Copyright (c) 2017
 * @license   Apache-2.0
 *
 * local-rep-storage.ts
 * Date Created: 10/25/17
 * Date Modified: 10/26/17
 *
 * Provider that communicates with Facebook for a social feed.
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class FacebookFeedProvider {

  constructor(public http: Http) {}

  getCity() {
    return this.http.get('https://graph.facebook.com/v2.10/LexingtonKyGov/feed?limit=50&access_token=885368084952005|kFRTc9O8Mm2U2F5F0gBvp5UR4C8')
    .map(res => res.json())
    .catch(this.handleError);
  }

  getAttachments(post) {
    return this.http.get('https://graph.facebook.com/v2.10/' + post.id + '/attachments?limit=50&access_token=885368084952005|kFRTc9O8Mm2U2F5F0gBvp5UR4C8')
    .map(res => res.json())
    .catch(this.handleError);
  }

  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
