import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.css', './../../Password/style-password.css']
})
export class ConfirmAccountComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  code = new FormControl('', [Validators.required]);

  constructor(
      private authService: AuthService,
      private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.confirmAccount(this.email.value, this.code.value)
        .subscribe(
            response => {
              // TODO handle error
              this.router.navigate(['login']).then(() => {location.reload(); });
            },
            errors => {}
        );
  }

  getErrorMessage(): void{}

}
