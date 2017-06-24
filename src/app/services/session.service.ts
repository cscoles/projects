/* * * ./app/comments/components/comment.service.ts * * */
// Imports
import { Injectable, Inject }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Session }           from '../models/session';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SessionService {
     // Resolve HTTP using the constructor
    constructor (
        private http: Http,
        @Inject('api') private api
        ) {}

    private serviceapi = `${this.api}/session`;

    // Fetch all existing School Years
   	getSessions() : Observable<Session[]>{
      // ...using get request
      let sessions$ = this.http.get(this.serviceapi)
                      // ...and calling .json() on the response to return data
                      .map((res:Response) => res.json())
                      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      return sessions$
    }

    getSessionsByYear(id) : Observable<Session[]>{
      // ...using get request
      let sessions$ = this.http.get(`${this.serviceapi}/year/${id}`)
      // ...and calling .json() on the response to return data
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      return sessions$
    }

    getActiveSession() : Observable<Session[]>{
      // ...using get request
      let sessions$ = this.http.get(`${this.serviceapi}/active`)
      // ...and calling .json() on the response to return data
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      return sessions$
    }

     // Add a new session
    addSession (body: Object): Observable<Session[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.serviceapi, body, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }


    updateSession (body: Object): Observable<Session[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.put(`${this.serviceapi}/${body['Session_ID']}/`, body, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }
    /* Delete a comment - NOT IMPLEMENTED YET
    removeYear (id:string): Observable<Session[]> {
        return this.http.delete(`${this.serviceUrl}/${id}`) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }   */
}
