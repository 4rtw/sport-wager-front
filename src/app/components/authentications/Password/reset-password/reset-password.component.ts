import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Validator } from '../../../../shared/Utils/Validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css', '../style-password.css'],
})
export class ResetPasswordComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  validator = new Validator();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.authService.resetPassword(this.email.value).subscribe(
      (_) => {
        // TODO handle error
        this.router
          .navigate(['verify-reset-code'], {
            queryParams: { email: this.email.value },
          })
          .then(() => location.reload());
      },
      (_) => {}
    );
  }

  getErrorMessage(form: FormControl): string {
    return this.validator.getErrorMessage(form);
  }
}
