import { Component, OnInit, Inject, Input } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Parent} from '../models/parent';
import {Family} from '../models/family';
import {KeyValuePipe} from '../key-value.pipe';

@Component({
  selector: 'app-new-registration',
  templateUrl: './new-registration.component.html',
  styleUrls: ['./new-registration.component.css']
})
export class NewRegistrationComponent implements OnInit {

  newFamilyId: any;
  authReturn: any;
  newAuth: any;
  message: string;
  checkPassword: string;
  newFamily: any;
  username: string;
  password: string;

  constructor(
    @Inject('familyService') private familyService,
    @Inject('parentService') private parentService,
    @Inject('authService') private authService,
    private router: Router
  ) { }

  addFamily(value: any) {
    this.familyService.addFamily(value).subscribe(
      v => {
        this.newFamilyId = v[0];
        setTimeout(() => this.addParent(value), 100);
        return true;
      },
      error => {
        console.error("Error saving parent!");
        return Observable.throw(error);
      });

  }

  addParent(value: any) {

    this.parentService.addParent(this.mapParent(value)).subscribe(
      value => {
        setTimeout(() => this.addAuth(this.mapAuth()), 100);
        this.gotoFamily();
        return true;
      },
      error => {
        console.error("Error saving parent!");
        return Observable.throw(error);
      });
  }

  getAuth(v) {
    this.newFamily = v;
    this.username = this.newFamily.Parent_Email;
    this.password = this.newFamily.Auth_Password;
    this.checkPassword = v.Check_Password;
    this.authService.getAuth(this.username).subscribe(
      a => {
        this.authReturn = a;
        setTimeout(() => this.checkAuth(this.authReturn), 100);
      }
    )
  }

  checkAuth(o){
    if(o.length > 0) {
      this.message = "ID already exists.";
    } else {
      if(this.password == this.checkPassword) {
        this.addFamily(this.newFamily);
      } else {
        this.message = "Password does not match"
      }
    }
  }

  addAuth(v) {
    this.authService.addAuth(v).subscribe(
      a => this.gotoFamily()
    )
  }

  mapAuth() {
    let authRec = {
      Auth_Name: this.username,
      Auth_Password: this.password,
      Auth_Role: 'family',
      Family_ID: this.newFamilyId.Family_ID
    }

    return authRec;
  }

  mapParent(value: any) {
    let body = {Parent_Last_Name: value.Parent_Last_Name,
      Parent_First_Name: value.Parent_First_Name,
      Student_Relationship: value.Student_Relationship,
      Parent_Address_1: value.Parent_Address_1,
      Parent_Address_2: value.Parent_Address_2,
      Parent_City: value.Parent_City,
      Parent_State: value.Parent_State,
      Parent_Zip: value.Parent_Zip,
      Parent_Phone1: value.Parent_Phone1,
      Parent_Phone1_Type: value.Parent_Phone1_Type,
      Parent_Phone2: value.Parent_Phone2,
      Parent_Phone2_Type: value.Parent_Phone2_Type,
      Parent_Email: value.Parent_Email,
      Family_ID: this.newFamilyId.Family_ID
                };
    return body;
  }

  gotoFamily(): void {
    this.router.navigate(['/family-usr', this.newFamilyId.Family_ID], { skipLocationChange: true });
  }

  ngOnInit() {
  }

}
