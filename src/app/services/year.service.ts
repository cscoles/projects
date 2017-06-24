/* * * ./app/comments/components/comment.service.ts * * */
// Imports
import { Injectable, Inject }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { SchoolYear }           from '../models/school-year';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SchoolYearService {
     // Resolve HTTP using the constructor
    constructor (
      private http: Http,
      @Inject('api') private api
      ) {}
     // private instance variable to hold base url
    // private schoolYearUrl = 'http://localhost:3000/api/schoolyear';
    // private schoolYearUrl = 'http://127.0.0.1:3000/api/schoolyear';

    private serviceapi = `${this.api}/schoolyear`;

    // Fetch all existing School Years
   	getSchoolYears() : Observable<SchoolYear[]>{
      // ...using get request
      let schoolyears$ = this.http.get(this.serviceapi)
                      // ...and calling .json() on the response to return data
                      .map((res:Response) => res.json())
                      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      return schoolyears$
    }

    getActivePlanSchoolYears() : Observable<SchoolYear[]>{
    // ...using get request
    let schoolyears$ = this.http.get(`${this.serviceapi}/plan`)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    return schoolyears$
    }

  getPlanSchoolYear() : Observable<SchoolYear[]>{
    // ...using get request
    let schoolyears$ = this.http.get(`${this.serviceapi}/planonly`)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    return schoolyears$
  }

    getSchoolYear(id: number) : Observable<SchoolYear[]>{
      // ...using get request
      let schoolyear$ = this.http.get(`${this.serviceapi}/${id}`)
                      // ...and calling .json() on the response to return data
                      .map((res:Response) => res.json())
                      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      return schoolyear$
    }

     // Add a new year
    addYear (body: Object): Observable<SchoolYear[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.serviceapi, body, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    updateYear (body: Object): Observable<SchoolYear[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.put(`${this.serviceapi}/${body['Year_ID']}/`, body, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }
    /* Delete a year - NOT IMPLEMENTED YET
    removeYear (id:string): Observable<SchoolYear[]> {
        return this.http.delete(`${this.schoolYearUrl}/${id}`) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }   */
}
