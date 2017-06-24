/* * * ./app/comments/components/comment.service.ts * * */
// Imports
import { Injectable, Inject }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Classroom }           from '../models/classroom';
import { Student }           from '../models/student';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ClassroomService {
  // Resolve HTTP using the constructor
  constructor (
    private http: Http,
    @Inject('api') private api
  ) {}

  private serviceapi = `${this.api}/classroom`;

  // Fetch all existing School Years
  getClassrooms() : Observable<Classroom[]>{
    // ...using get request
    let classrooms$ = this.http.get(this.serviceapi)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    return classrooms$
  }

  getClassroom(id) : Observable<Classroom>{
    // ...using get request
    let obj$ = this.http.get(`${this.serviceapi}/${id}`)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    return obj$
  }

  getClassroomCount(id) : Observable<Classroom>{
    // ...using get request
    let obj$ = this.http.get(`${this.serviceapi}/${id}/count`)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    return obj$
  }

  getClassroomStudents(id) : Observable<Student[]>{
    // ...using get request
    let obj$ = this.http.get(`${this.serviceapi}/${id}/students`)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    return obj$
  }

  getClassroomsBySessionGrade(sessionID, grade) : Observable<Classroom[]>{
    // ...using get request
    let classrooms$ = this.http.get(`${this.serviceapi}/session/${sessionID}/grade/${grade}`)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    return classrooms$
  }

  // Add a new session
  addClassroom (body: Object): Observable<Classroom[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(this.serviceapi, body, options) // ...using post request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  updateClassroom (body: Object): Observable<Classroom[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.put(`${this.serviceapi}/${body['Class_ID']}/`, body, options) // ...using put request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }
}
