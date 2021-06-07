import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../../../shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-reset-password-final-step',
  templateUrl: './reset-password-final-step.component.html',
  styleUrls: ['./reset-password-final-step.component.css', '../style-password.css']
})
export class ResetPasswordFinalStepComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);
  hide = true;
  hideConfirm = true;
  sub: Subscription;

  constructor(
      private authService: AuthService,
      private router: Router,
      private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute
        .queryParams
        .subscribe(params => {
          // Defaults to 0 if no query param provided.
          this.email.setValue(params['email']);
        });
  }

  onSubmit(): void{
    this.authService.setResetedPassword(this.email.value, this.password.value)
        .subscribe(
            response => {
              // TODO handle errors
              this.router.navigate(['/login']).then(() => location.reload());
              },
            error => {}
        );
  }

  getErrorMessage(): void{}

}
