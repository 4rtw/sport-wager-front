import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  email=new FormControl('', [Validators.required, Validators.email]);

  constructor(
      private authService: AuthService,
      private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.authService.resetPassword(this.email.value)
        .subscribe(
            response=>{
              //TODO handle error
              this.router.navigate(['verify-reset-code']).then(()=>location.reload());

              //TODO pass email to next page -> verify-reset-code
            },
            error => {}
        );
  }

}
