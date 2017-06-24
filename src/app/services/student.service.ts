import { Injectable, Inject }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Student }           from '../models/student';
import { StudentReg }           from '../models/student-reg';
import {Observable} from 'rxjs/Rx';
import { StudentNote } from '../models/studentNote';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class StudentService {

  constructor(
    private http: Http,
    @Inject('api') private api
  ) { }

  private serviceapi = `${this.api}/student`;

  getStudents() : Observable<StudentReg[]>{
    // ...using get request
    let obj$ = this.http.get(`${this.serviceapi}/reg`)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    return obj$
  }

  getStudentReg() : Observable<StudentReg[]>{
    // ...using get request
    let obj$ = this.http.get(`${this.serviceapi}/reg/new`)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    return obj$
  }

  getStudentsByFamily(id) : Observable<StudentReg[]>{
  // ...using get request
  let obj$ = this.http.get(`${this.api}/family/${id}/student/reg`)
  // ...and calling .json() on the response to return data
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  return obj$
}

  getAllStudentsByFamily(id, yid) : Observable<StudentReg[]>{
    // ...using get request
    let obj$ = this.http.get(`${this.api}/family/${id}/student/active/${yid}`)
    // let obj$ = this.http.get(`${this.api}/family/${id}/student/active/plan`)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    return obj$
  }

  getStudent(id) : Observable<Student[]>{

//    return this.http.get('http://localhost:3000/api/student', id).map(res => res.json());
        // ...using get request
    let obj$ = this.http.get(`${this.serviceapi}/${id}`)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    return obj$
  }

  addStudent (body: Object): Observable<Student[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(this.serviceapi, body, options) // ...using post request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  addRegistration (body: Object): Observable<StudentReg[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(`${this.serviceapi}/reg/`, body, options) // ...using post request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  updateStudent (body: Object): Observable<StudentReg[]> {
    let headers = new Headers({'Content-Type': 'application/json'}); // ... Set content type to JSON
    let options = new RequestOptions({headers: headers}); // Create a request option

    return this.http.put(`${this.serviceapi}/${body['Student_ID']}/`, body, options) // ...using put request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateRegistration (body: Object): Observable<StudentReg[]> {
    let headers = new Headers({'Content-Type': 'application/json'}); // ... Set content type to JSON
    let options = new RequestOptions({headers: headers}); // Create a request option

    return this.http.put(`${this.serviceapi}/reg/${body['Student_Registration_ID']}/`, body, options) // ...using put request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  addStudentNote (body: Object): Observable<StudentNote[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.serviceapi}/${body['Student_ID']}/note`, body, options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getNotes(id: string) : Observable<StudentNote>{
    let notes$ = this.http.get(`${this.serviceapi}/${id}/note`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    return notes$
  }

  deleteStudentNote (id): Observable<StudentNote[]> {
    return this.http.delete(`${this.serviceapi}/note/${id}`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getRegistrationByStudent(id: string) : Observable<StudentNote>{
    let notes$ = this.http.get(`${this.api}/reg/${id}`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    return notes$
  }
}
