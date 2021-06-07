import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-verify-reset-code',
  templateUrl: './verify-reset-code.component.html',
  styleUrls: ['./verify-reset-code.component.css', './../style-password.css']
})
export class VerifyResetCodeComponent implements OnInit {

  // TODO add verify password
  constructor(
      private authService: AuthService,
      private router: Router
  ) { }

  email = new FormControl('', [Validators.required, Validators.email]);
  code = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit(): void {
  }

  onSubmit(): void{
      this.authService.verifyResetCode(this.email.value, this.code.value)
          .subscribe(
              response => {
                // TODO handle errors

                this.router.navigate(['/set-password']).then(() => {location.reload(); });

                // TODO pass email to next component -> set password final step
              }, error => {

              }
          );
  }

  getErrorMessage(): void{}

}
