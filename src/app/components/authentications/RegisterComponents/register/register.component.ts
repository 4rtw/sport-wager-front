import { Component, OnInit } from '@angular/core';
import { User } from '../../../../shared/model/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Validator } from '../../../../shared/Utils/Validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css',
    './../../Password/style-password.css',
  ],
})
export class RegisterComponent implements OnInit {
  // TODO validation password match

  hide = true;
  hideConfirm = true;
  nom = new FormControl('', [
    Validators.required,
    Validators.pattern('[A-Z ]*'),
  ]);
  prenom = new FormControl('', [
    Validators.required,
    Validators.pattern('[A-Z ]*'),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);
  phone = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  confirmPassword = new FormControl('', [Validators.required]);
  validator = new Validator();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  defineUser(): User {
    const user = new User();

    user.firstname = this.nom.value;
    user.lastname = this.prenom.value;
    user.email = this.email.value;
    user.password = this.password.value;
    user.phone = this.phone.value;

    console.log('User=' + user.email);

    return user;
  }

  registerUser(user): void {
    this.authService.register(user).subscribe(
      (response) => {
        // TODO handle duplication errors
        if (response.errors) {
          console.log(response.errors);
        }

        // when successfull
        this.router
          .navigate(['/confirm-account'], {
            queryParams: { email: this.email.value },
          })
          .then(() => location.reload());
      },
      (_) => {}
    );
  }

  onSubmit(): void {
    this.registerUser(this.defineUser());
  }

  getErrorMessage(form: FormControl): string {
    return this.validator.getErrorMessage(form);
  }
}
