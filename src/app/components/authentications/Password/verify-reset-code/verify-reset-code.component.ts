import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../../../shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-verify-reset-code',
  templateUrl: './verify-reset-code.component.html',
  styleUrls: ['./verify-reset-code.component.css', './../style-password.css']
})
export class VerifyResetCodeComponent implements OnInit {

  // TODO add verify password
  constructor(
      private authService: AuthService,
      private router: Router,
      private activatedRoute: ActivatedRoute
  ) { }

  email = new FormControl('', [Validators.required, Validators.email]);
  code = new FormControl('', [Validators.required, Validators.email]);
  sub: Subscription;

  ngOnInit(): void {
      this.sub = this.activatedRoute
          .queryParams
          .subscribe(params => {
              // Defaults to 0 if no query param provided.
              this.email.setValue(params['email']);
          });
  }

  onSubmit(): void{
      this.authService.verifyResetCode(this.email.value, this.code.value)
          .subscribe(
              response => {
                // TODO handle errors

                this.router.navigate(['/set-password'], {queryParams: {email: this.email.value}}).then(() => {location.reload(); });

                // TODO pass email to next component -> set password final step
              }, error => {

              }
          );
  }

  getErrorMessage(): void{}

}
