import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../../../shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Validator} from '../../../../shared/Utils/Validator';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.css', './../../Password/style-password.css']
})
export class ConfirmAccountComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  code = new FormControl('', [Validators.required]);
  validator = new Validator();

  sub: Subscription;

  constructor(
      private authService: AuthService,
      private router: Router,
      private activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sub = this.activateRouter
        .queryParams
        .subscribe(params => {
          this.email.setValue(params['email']);
        });
  }

  onSubmit(): void {
    this.authService.confirmAccount(this.email.value, this.code.value)
        .subscribe(
            response => {
              // TODO handle error
              this.router.navigate(['login'], {queryParams: { email: this.email.value}}).then(() => {location.reload(); });
            },
            errors => {}
        );
  }

  getErrorMessage(form: FormControl): string{
      return this.validator.getErrorMessage(form);
  }

}