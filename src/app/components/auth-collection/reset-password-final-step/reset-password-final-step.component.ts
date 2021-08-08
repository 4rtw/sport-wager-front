import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../../shared/services/Auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Validator } from '../../../shared/services/Utils/Validator';
import {MustMatch} from '../../../shared/services/Utils/must-match.validator';

@Component({
  selector: 'app-reset-password-final-step',
  templateUrl: './reset-password-final-step.component.html',
  styleUrls: [
    './reset-password-final-step.component.css',
  ],
})
export class ResetPasswordFinalStepComponent implements OnInit {
  sub: Subscription;
  validator = new Validator();

  form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.queryParams.subscribe((params) => {
      // Defaults to 0 if no query param provided.
      this.form.controls.email.setValue(params.email);
    });
  }

  onSubmit(): void {
    this.authService
      .setResetedPassword({
        email: this.form.controls.email.value,
        password: this.form.controls.password.value,
      })
      .subscribe(
        (_) => {
          // TODO handle errors
          this.router
            .navigate(['/register'], { queryParams: { email: this.form.controls.email.value } })
            .then(() => location.reload());
        },
        (_) => {}
      );
  }

  getErrorMessage(form: FormControl): string {
    return this.validator.getErrorMessage(form);
  }
}
