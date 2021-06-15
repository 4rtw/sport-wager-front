import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Validator } from '../../../../shared/Utils/Validator';

@Component({
  selector: 'app-reset-password-final-step',
  templateUrl: './reset-password-final-step.component.html',
  styleUrls: [
    './reset-password-final-step.component.css',
    '../style-password.css',
  ],
})
export class ResetPasswordFinalStepComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);
  hide = true;
  hideConfirm = true;
  sub: Subscription;
  validator = new Validator();

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.queryParams.subscribe((params) => {
      // Defaults to 0 if no query param provided.
      this.email.setValue(params.email);
    });
  }

  onSubmit(): void {
    this.authService
      .setResetedPassword(this.email.value, this.password.value)
      .subscribe(
        (_) => {
          // TODO handle errors
          this.router
            .navigate(['/login'], { queryParams: { email: this.email.value } })
            .then(() => location.reload());
        },
        (_) => {}
      );
  }

  getErrorMessage(form: FormControl): string {
    return this.validator.getErrorMessage(form);
  }
}
