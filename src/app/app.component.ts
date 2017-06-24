import { Component, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'St. Joseph PSR Portal';
  message: any;
  role: string;
  authInfo: any;
  subscription: Subscription;
  passError: string;

  constructor(
    @Inject('messageService') private messageService,
    @Inject('authService') private authService,
    private _router: Router
  ) {
      this._router.events.pairwise().subscribe((event) => {
      console.log(event);
      this.subscription = this.messageService.getMessage().subscribe(
        r => {
          this.authInfo = r.text;
          console.log(this.authInfo);
        });
    });
  }

  getAuth(v) {
    this.authService.getAuth(v).subscribe(
      a => {
        this.authInfo = a;
        setTimeout(() => this.role = this.authInfo.Auth_Role, 50);
      }
    )
  }

  validatePassword(v) {
    if (v.Auth_Password == v.Check_Password) {
      let newPass = {
        Auth_ID: this.authInfo.Auth_ID,
        Auth_Password: v.Auth_Password
      }
      this.updatePassword(newPass);
      document.getElementById("pass-status").style.color = 'green';
      this.passError = "Password changed!"
    } else {
      this.passError = "Password does not match!";
      document.getElementById("pass-status").style.color = 'red';
      return false;
    }
  }

  updatePassword(v) {
    this.authService.updateAuth(v).subscribe(
      a => {
        return true;
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
