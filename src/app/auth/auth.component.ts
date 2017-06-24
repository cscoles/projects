import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../models/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  private username: string;
  private password: string;
  private newName: string;
  message: string;
  authRecord: Auth;
  newUser: Auth;
  reg: boolean;

  constructor(
    @Inject('authService') private authService,
    @Inject('messageService') private messageService,
    private router: Router
  ) { }

  authUser(value) {
    this.username = value.Auth_Name;
    this.password = value.Auth_Password;
    this.authService.getAuth(this.username).subscribe(
      v => {
        this.authRecord = v[0];
        setTimeout(() => this.authAndRoute(v), 100);
      }
    )
  }

  authAndRoute(v) {
    if(v.length > 0) {
      if (v[0].Auth_Password == this.password) {
        if(v[0].Auth_Role == 'admin') {
          this.sendMessage(v[0]);
          this.gotoAdmin();
        } else {
          if(v[0].Family_ID != null && v[0].Family_ID != '') {
            this.sendMessage(v[0]);
            this.gotoFamily(v[0].Family_ID);
          } else {
            this.gotoNewReg();
          }
        }
      } else {
        this.message = 'Incorrect Password';
      }
    } else {
      this.message = 'Incorrect Name';
    }
  }

  createUser(value) {
    this.authService.addAuth(value).subscribe(
      v => {
        this.gotoNewReg();
        return true;
      }
    )
  }

  newFamilyRegistration(value) {
    this.newName = value.Auth_Name;
    this.getUser(this.newName);
  /*  setTimeout(() => if() {

    }) */
  }

  getUser(value) {
    this.authService.getAuth(this.username).subscribe(
      v => {
        this.authRecord = v[0];
      }
    )
  }

  sendMessage(role): void {
    this.messageService.sendMessage(role);
  }

  gotoFamily(id): void {
    this.router.navigate(['/family-usr', id], { skipLocationChange: true });
  }

  gotoNewReg(): void {
    this.router.navigate(['/new-reg'], { skipLocationChange: true });
  }

  gotoAdmin(): void {
    this.router.navigate(['/student']);
  }

  toggleReg() {
    if(this.reg == true) {
      this.reg = false;
    } else {
      this.reg = true;
    }
  }

  ngOnInit() {
    this.reg = false;
  }

}
