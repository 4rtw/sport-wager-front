import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-verify-reset-code',
  templateUrl: './verify-reset-code.component.html',
  styleUrls: ['./verify-reset-code.component.css']
})
export class VerifyResetCodeComponent implements OnInit {

  email=new FormControl('', [Validators.required, Validators.email]);
  password=new FormControl('', [Validators.required, Validators.email]);

  //TODO add verify password
  constructor(
      private authService: AuthService,
      private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
      this.authService.verifyResetCode(this.email.value,this.password.value)
          .subscribe(
              response=>{
                //TODO handle errors

                this.router.navigate(['/set-password']).then(()=>{location.reload()});

                //TODO pass email to next component -> set password final step
              },error => {

              }
          );
  }

}
