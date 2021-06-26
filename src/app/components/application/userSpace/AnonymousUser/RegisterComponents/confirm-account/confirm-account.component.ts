import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../../../../shared/services/Auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Validator } from '../../../../../../shared/services/Utils/Validator';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: [
    './confirm-account.component.css',
    '../../Password/style-password.css',
  ],
})
export class ConfirmAccountComponent implements OnInit {
  confirmationForm: FormGroup;

  validator = new Validator();

  sub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.confirmationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', [Validators.required]]
    });

    this.sub = this.activateRouter.queryParams.subscribe((params) => {
      console.log(params);
      this.confirmationForm.controls.email.setValue(params.email);
    });
  }

  onSubmit(): void {
    this.authService
      .confirmAccount({
        email: this.confirmationForm.controls.email.value,
        activationCode: this.confirmationForm.controls.code.value,
      })
      .subscribe(
        (res) => {
          // TODO handle error
          console.log(res);
          console.log(this.confirmationForm.controls.email.value);
          //{ queryParams: { email: this.confirmationForm.controls.email.value } }
          this.router
            .navigate(['/'])
            .then(() => {
              location.reload();
            });
        },
      );
  }

  getErrorMessage(form: FormControl): string {
    return this.validator.getErrorMessage(form);
  }
}
