import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NewsletterListsService {
  private API_URL: string = environment.apiUrl;
  private _newsLetterLists: any;
  private _newsletterDetails: any;
  constructor(private _http: HttpClient) { }

  getNewsletterLists(params: any) {
    return this._http.post(this.API_URL + 'getNewsletterFrontLists', params, httpOptions);
  }

  // getNewsletterLists(params: any) {
  //   console.log("newsletterliste: ", this._newsLetterLists);
  //   if (this._newsLetterLists) {
  //     return Observable.of(this._newsLetterLists);
  //   } else {
  //     //return this.http.get(API_URL + 'getTherapeuticAreas');
  //     return this._http.post(this.API_URL + 'getNewsletterFrontLists', params, httpOptions).do(
  //       (data: any) => {
  //         this._newsLetterLists = data;
  //       });
  //   }
  // }

  getNewsletterDetails(params: any) {
    return this._http.post(this.API_URL + 'getNewsletterFrontDetails', params, httpOptions);
  }

  // getNewsletterDetails(params: any) {
  //   console.log("newsletterDetaile: ", this._newsletterDetails);
  //   if (this._newsletterDetails) {
  //     return Observable.of(this._newsletterDetails);
  //   } else {
  //     //return this.http.get(API_URL + 'getTherapeuticAreas');
  //     return this._http.post(this.API_URL + 'getNewsletterFrontDetails', params, httpOptions).do(
  //       (data: any) => {
  //         this._newsletterDetails = data;
  //       });
  //   }
  // }

}
