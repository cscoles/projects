import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Family } from '../models/family';
import { Parent } from '../models/parent';
import { FamilyNote } from '../models/familyNote';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FamilyService {

  constructor(
    private http: Http,
    @Inject('api') private api
  ) { }

  private serviceapi = `${this.api}/family`;

  // Fetch all existing School Years
  getFamilies() : Observable<Parent[]>{
    // ...using get request
    let families$ = this.http.get(`${this.serviceapi}/parent`)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    return families$
  }

  getFamiliesByPaymentYear(id) : Observable<Parent[]>{
    // ...using get request
    let families$ = this.http.get(`${this.serviceapi}/payment/year/${id}`)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    return families$
  }

  getFamily(id: string) : Observable<Family>{
    let family$ = this.http.get(`${this.serviceapi}/${id}`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    return family$
  }

  updateFamily (body: Object): Observable<Family[]> {
    let headers = new Headers({'Content-Type': 'application/json'}); // ... Set content type to JSON
    let options = new RequestOptions({headers: headers}); // Create a request option

    return this.http.put(`${this.serviceapi}/${body['Family_ID']}/`, body, options) // ...using put request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  // Add a new session
  addFamily (body: Object): Observable<Family[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(this.serviceapi, body, options) // ...using post request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  addFamilyNote (body: Object): Observable<FamilyNote[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.serviceapi}/${body['Family_ID']}/note`, body, options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getNotes(id: string) : Observable<FamilyNote[]>{
    let family$ = this.http.get(`${this.serviceapi}/${id}/note`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    return family$
  }

  deleteFamilyNote (id): Observable<FamilyNote[]> {
    return this.http.delete(`${this.serviceapi}/note/${id}`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
