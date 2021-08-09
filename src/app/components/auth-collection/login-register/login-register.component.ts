import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../shared/services/Auth/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Validator } from '../../../shared/services/Utils/Validator';
import { MustMatch } from '../../../shared/services/Utils/must-match.validator';
import { User } from '../../../shared/model/Users/user.model';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
})
export class LoginRegisterComponent implements OnInit {
  email = new FormControl('', [Validators.email, Validators.required]);
  password = new FormControl('', [Validators.min(5), Validators.required]);

  loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  });

  registerForm = this.formBuilder.group(
    {
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
    },
    {
      validator: MustMatch('password', 'confirmPassword'),
    }
  );

  loginSub = new Subscription();
  showButtonAndNoSpinnerLogin = true;
  showButtonAndNoSpinnerRegister = true;

  hide = true;
  validator = new Validator();
  display = 'Complete the form to enable inscription button';

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  //For login
  onSubmitLogin(): void {
    this.login(this.email.value, this.password.value);
  }

  login(email, password): void {
    this.showButtonAndNoSpinnerLogin = !this.showButtonAndNoSpinnerLogin;
    if (!this.loginForm.invalid) {
      this.loginSub = this.authService.login(email, password).subscribe(
        (next) => {
          if (next.access_token) {
            this.router
              .navigate(['/'], { queryParams: { connection: 'success' } })
              .then(() => {
                location.reload();
              });
          }
        },
        (error) => {
          if (error.message.includes('401')) {
            this.messageService.add({
              severity: 'error',
              summary: 'Connexion échoué',
              detail: 'Votre adresse et/ou votre mot de passe est érroné',
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: error.name,
              detail: error.message,
            });
          }

          this.showButtonAndNoSpinnerLogin = !this.showButtonAndNoSpinnerLogin;
        }
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur rencontré dans le formulaire',
        detail: 'Verifiez vos entrées',
      });
      this.showButtonAndNoSpinnerLogin = !this.showButtonAndNoSpinnerLogin;
    }
  }

  registerUser(user): void {
    this.showButtonAndNoSpinnerRegister = !this.showButtonAndNoSpinnerRegister;
    this.authService.register(user).subscribe(
        (response) => {

        // when successfull
        this.showButtonAndNoSpinnerRegister = !this.showButtonAndNoSpinnerRegister;
        this.router
          .navigate(['/confirm-account'], {
            queryParams: { email: user.email },
          })
          .then(() => location.reload());
        },
        error => {
          console.log(error.error.errors[0])
          if (error.error.errors[0].includes('E11000')){
            this.display = 'This account is already exists on your sport wager';
            console.log(error)
          }else {
            this.display = error.errors
          }
          this.showButtonAndNoSpinnerRegister = !this.showButtonAndNoSpinnerRegister;
    });
  }

  getErrorMessage(form: FormControl): string {
    return this.validator.getErrorMessage(form);
  }

  defineUser(): User {
    let user = new User();
    user = this.registerForm.value;
    return user;
  }

  onSubmitRegister() {
    this.display = '';
    this.registerUser(this.defineUser());
  }
}
