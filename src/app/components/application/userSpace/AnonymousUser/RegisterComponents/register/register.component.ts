import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../../shared/model/Users/user.model';
import { AuthService } from '../../../../../../shared/services/Auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Validator } from '../../../../../../shared/services/Utils/Validator';
import { MustMatch } from '../../../../../../shared/services/Utils/must-match.validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../../Password/style-password.css'],
})
export class RegisterComponent implements OnInit {
  // TODO validation password match
  hide = true;
  hideConfirm = true;
  registerForm: FormGroup;
  validator = new Validator();

  display = "Complete the form to enable inscription button";

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  defineUser(): User {
    let user = new User();
    user = this.registerForm.value;
    console.log(user);
    return user;
  }

  registerUser(user): void {
    this.authService.register(user).subscribe(
        (response) => {
          if (response.errors.length == 1) {
            this.display = "This account is already exists on your sport wager";
          } else {
            console.log("res");
            // when successfull
            this.router
                .navigate(['/account/confirm-account'], {
                  queryParams: { email: user.email },
                })
                .then(() => location.reload());
          }
        }
    );
  }

  onSubmit(): void {
    this.display = "";
    this.registerUser(this.defineUser());
  }

  getErrorMessage(form: FormControl): string {
    return this.validator.getErrorMessage(form);
  }
}
