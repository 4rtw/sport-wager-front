import { Component, OnInit } from '@angular/core';
import {User} from "../../../shared/model/user.model";
import {AuthService} from "../../../shared/services/auth.service";
import {response} from "express";
import {Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //TODO field validation

  nom=new FormControl('', [Validators.required]);
  prenom=new FormControl('', [Validators.required]);
  password=new FormControl('', [Validators.required, Validators.minLength(5)]);
  phone=new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  confirmPassword = new FormControl('', [Validators.required, Validators.pattern(this.password.value)]);

  constructor(
      private authService: AuthService,
      private router: Router
  ) { }

  ngOnInit(): void {

  }

  defineUser(): User{

    const user = new User();

    user.firstname=this.nom.value;
    user.lastname=this.prenom.value;
    user.email=this.email.value;
    user.password=this.password.value;
    user.phone=this.phone.value;

    console.log("User="+user.email);

    return user;
  }

  registerUser(user){
    this.authService.register(user).subscribe(
        response=>{

          //TODO handle duplication errors
          if(response.errors){
            console.log(response.errors)
          }

          //when successfull
          this.router.navigate(['/confirm-account']).then(()=>location.reload());
        },
        error => {}
    );
  }

  onSubmit(){
    this.registerUser(this.defineUser());
  }
}
