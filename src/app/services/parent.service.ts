/* * * ./app/comments/components/comment.service.ts * * */
// Imports
import { Injectable, Inject }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Parent }           from '../models/parent';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ParentService {
  // Resolve HTTP using the constructor
  constructor (
    private http: Http,
    @Inject('api') private api
  ) {}

  private serviceapi = `${this.api}/parent`;

  // Fetch all existing School Years
  getParents() : Observable<Parent[]>{
    // ...using get request
    let objects$ = this.http.get(this.serviceapi)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    return objects$
  }

  getActiveParents() : Observable<Parent[]>{
    // ...using get request
    let objects$ = this.http.get(`${this.serviceapi}/active`)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    return objects$
  }

  getParentByFamily(id) : Observable<Parent[]>{
    let objects$ = this.http.get(`${this.serviceapi}/family/${id}`)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    return objects$
  }

  // Add a new session
  addParent (body: Object): Observable<Parent[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(this.serviceapi, body, options) // ...using post request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  updateParent (body: Object): Observable<Parent[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.put(`${this.serviceapi}/${body['Parent_ID']}/`, body, options) // ...using post request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  /* Update a comment - NOT IMPLEMENTED YET
   updateYear (body: Object): Observable<Session[]> {
   let bodyString = JSON.stringify(body); // Stringify payload
   let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
   let options = new RequestOptions({ headers: headers }); // Create a request option

   return this.http.put(`${this.serviceUrl}/${body['id']}/`, body, options) // ...using put request
   .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
   .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
   }   */
  /* Delete a comment - NOT IMPLEMENTED YET
   removeYear (id:string): Observable<Session[]> {
   return this.http.delete(`${this.serviceUrl}/${id}`) // ...using put request
   .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
   .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
   }   */
}
