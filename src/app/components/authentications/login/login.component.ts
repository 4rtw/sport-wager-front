import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription, throwError} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  hide = true;
  loginSub: Subscription;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  showLoader = false;

  constructor(
      private authService: AuthService,
      private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }

  login(email, pass): void{
    this.loginSub = this.authService
        .login(email, pass)
        .subscribe(
        response => {
          if (response.data.access_token){

            this.router.navigate(['/sport-wager'])
                .then(() => {window.location.reload(); });
            this.showLoader = false;

          }

          else
          {
            // TODO handle Login error
            throwError('Erreur d\'authentification');
          }
        },

        error => {
          this.showLoader = false;
          console.log('ato ' + error.message);
        },
        );
  }

  onSubmit(): void{
    this.login(this.email.value, this.password.value);
  }

  //#region frontend
  getPasswordErrorMessage(): string {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
  }

  getErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  //#endregion
}
