import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../../../shared/services/Auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Validator } from '../../../../../../shared/services/Utils/Validator';

@Component({
  selector: 'app-verify-reset-code',
  templateUrl: './verify-reset-code.component.html',
  styleUrls: ['./verify-reset-code.component.css', '../style-password.css'],
})
export class VerifyResetCodeComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  code = new FormControl('', [Validators.required]);
  sub: Subscription;
  validator = new Validator();
  error = '';

  // TODO add verify password
  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.queryParams.subscribe((params) => {
      // Defaults to 0 if no query param provided.
      this.email.setValue(params.email);
      if (params.error === 'true') {
        this.error = 'Votre code est éronné ou votre compte est introuvable';
        setTimeout(() => {
          this.error = '';
        }, 5000);
      }
    });
  }

  onSubmit(): void {
    this.authService
      .verifyResetCode({ email: this.email.value, code: this.code.value })
      .subscribe(
        (_) => {
          this.router
            .navigate(['/account/set-password'], {
              queryParams: { email: this.email.value },
            })
            .then(() => {
              location.reload();
            });
        },
        (_) => {
          this.router
            .navigate(['/account/verify-reset-code'], {
              queryParams: { error: 'true', email: this.email.value },
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
