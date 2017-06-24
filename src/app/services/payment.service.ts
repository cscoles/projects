import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Payment } from '../models/payment';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PaymentService {

  private serviceapi = `${this.api}/payment`;

  constructor(
    private http: Http,
    @Inject('api') private api
  ) { }



  // Fetch all existing School Years
  getFamilyPayments(id) : Observable<Payment[]>{
    // ...using get request
    let payment$ = this.http.get(`${this.serviceapi}/family/${id}`)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    return payment$
  }

  getFamilyPaymentTotals(id) : Observable<Payment[]>{
    // ...using get request
    let payment$ = this.http.get(`${this.serviceapi}/family/${id}/totals`)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    return payment$
  }

  addPayment (body: Object): Observable<Payment[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(this.serviceapi, body, options) // ...using post request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  deletePayment (id): Observable<Payment[]> {
    return this.http.delete(`${this.serviceapi}/${id}`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
