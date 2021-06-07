import {Component, OnDestroy, OnInit} from '@angular/core';
import {Form, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription, throwError} from 'rxjs';
import {Validator} from '../../../shared/Utils/Validator';

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
  validator = new Validator();

  sub: Subscription;

  constructor(
      private authService: AuthService,
      private router: Router,
      private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.sub = this.activatedRoute
        .queryParams
        .subscribe(params => {
          // Defaults to 0 if no query param provided.
          this.email.setValue(params['email']);
        });
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
  getErrorMessage(form: FormControl): string {
    return this.validator.getErrorMessage(form);
  }
  //#endregion
}
