import { Injectable, Inject }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Auth }           from '../models/auth';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AuthService {

  private serviceapi = `${this.api}/auth`;

  constructor(
    private http: Http,
    @Inject('api') private api
  ) { }

  getAuth(id) : Observable<Auth[]>{
    let obj$ = this.http.get(`${this.serviceapi}/${id}`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    return obj$
  }

  addAuth (body: Object): Observable<Auth[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(this.serviceapi, body, options) // ...using post request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  updateAuth (body: Object): Observable<Auth[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.put(`${this.serviceapi}/${body['Auth_ID']}/`, body, options) // ...using post request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

}
