import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/Auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validator } from '../../../shared/services/Utils/Validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  validator = new Validator();
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.error) {
        this.error = params.error;
        setTimeout(() => {
          this.error = '';
        }, 5000);
      }
      if (params.email) {
        this.email.setValue(params.email);
      }
    });
  }

  onSubmit(): void {
    this.authService.resetPassword(this.email.value).subscribe(
      (data) => {
        this.router
          .navigate(['/account/verify-reset-code'], {
            queryParams: { email: this.email.value },
          })
          .then(() => {
            location.reload();
          });
      },
      (error) => {
        console.log(error.error.errors);
        this.router
          .navigate(['/account/reset-password'], {
            queryParams: {
              error: error.error.errors[0],
              email: this.email.value,
            },
          })
          .then(() => {
            location.reload();
          });
      }
    );
  }

  getErrorMessage(form: FormControl): string {
    return this.validator.getErrorMessage(form);
  }
}
