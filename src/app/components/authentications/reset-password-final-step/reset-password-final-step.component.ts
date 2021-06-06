import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset-password-final-step',
  templateUrl: './reset-password-final-step.component.html',
  styleUrls: ['./reset-password-final-step.component.css']
})
export class ResetPasswordFinalStepComponent implements OnInit {

  email=new FormControl('', [Validators.required, Validators.email]);
  password=new FormControl('', [Validators.required]);

  constructor(
      private authService:AuthService,
      private router:Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.authService.setResetedPassword(this.email.value,this.password.value)
        .subscribe(
            response=>{
              //TODO handle errors
              this.router.navigate(['/login']).then(()=>location.reload());
              },
            error => {}
        )
  }

}
