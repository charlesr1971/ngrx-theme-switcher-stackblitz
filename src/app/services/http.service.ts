import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { tap } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse, HttpBackend } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class HttpService { 
  
  
  apiUrl: string = '';
  restApiUrl: string = '';
  useRestApi: boolean = false;
  restApiURLReWrite: boolean = false;
  restApiUrlEndpoint: string = '/index.cfm';
  isSafari1 = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && navigator.userAgent && navigator.userAgent.indexOf('CriOS') == -1 && navigator.userAgent.indexOf('FxiOS') == -1;
  isSafari2 = /webkit/.test(navigator.userAgent.toLowerCase());


  debug: boolean = false;

  constructor(private http: HttpClient,
    private httpBackend: HttpBackend) {

    this.useRestApi = environment.useRestApi;
    this.restApiURLReWrite = environment.restApiURLReWrite;

    if(this.restApiURLReWrite) {
      this.restApiUrlEndpoint = '';
    }

    this.apiUrl = environment.apiEndpointUrl;
    this.restApiUrl = environment.apiEndpointUrl;

    this.restApiUrlEndpoint =  environment.apiEndpointUrl;
    
  }


  // POST

  createGuestbook(data: any): Observable<any> {
    if(this.debug) {
      console.log('HttpService.service: createGuestbook: data ',data);
    }
    let url = null;
    let headers = null;
    headers = {
      reportProgress: false,
      headers: new HttpHeaders({
        'title': data['title'] || '',
        'content': data['content'] || ''
      })
    };
    url = this.restApiUrlEndpoint + '/guestbook/0/1';
    if(this.debug) {
      console.log('HttpService.service: createGuestbook: headers ',headers);
    }
    if(this.debug) {
      console.log('HttpService.service: createGuestbook: url: ',url);
    }
    return this.http.post(url,'',headers).pipe(
      tap( (data) => data ),
      catchError(this.handleError)
    );
  }

  readGuestbook = (page: number = 1, guestbookid: number = 0): Observable<any> => {
    let url = null;
    const sortby = 'Submission_date';
    const sortmethod = 'DESC';
    const guestbookbatch = 5;
    if(guestbookid > 0) {
      url = this.restApiUrlEndpoint + '/guestbook/' + guestbookid + '/0';
    }
    else{
      url = this.restApiUrlEndpoint + '/guestbooks/' +  page + '/' +  sortby + '/' +  sortmethod + '/' +  guestbookbatch;
    }
    if(this.debug) {
      console.log('HttpService.service: readGuestbook: url: ',url);
    }
    return this.http.get(url).pipe(
      tap( (data) => data ),
      catchError(this.handleError)
    );
  };

  // error handling

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An client-side or network error occurred: ', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened. Please try again later...');
  };

  
}
