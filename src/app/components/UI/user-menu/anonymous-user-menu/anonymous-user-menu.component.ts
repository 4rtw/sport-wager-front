import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../shared/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-anonymous-user-menu',
  templateUrl: './anonymous-user-menu.component.html',
  styleUrls: ['./anonymous-user-menu.component.css'],
  providers: [MessageService],
})
export class AnonymousUserMenuComponent implements OnInit, OnDestroy {
  email = new FormControl('', [Validators.email, Validators.required]);
  password = new FormControl('', [Validators.min(5), Validators.required]);
  loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  });
  loginSub = new Subscription();
  showButtonAndNoSpinner = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.login(this.email.value, this.password.value);
  }

  login(email, password): void {
    this.showButtonAndNoSpinner = !this.showButtonAndNoSpinner;
    if (!this.loginForm.invalid) {
      this.loginSub = this.authService.login(email, password).subscribe(
        (next) => {
          if (next.data.access_token) {
            this.router
              .navigate(['/'], { queryParams: { connection: 'success' } })
              .then(() => {
                // location.reload();
              });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Authentification',
              detail: next.errors[0],
            });
            this.showButtonAndNoSpinner = !this.showButtonAndNoSpinner;
          }
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Une erreur est survenue',
            detail: error,
          });
          this.showButtonAndNoSpinner = !this.showButtonAndNoSpinner;
        }
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur rencontré dans le formulaire',
        detail: 'Verifiez vos entrées',
      });
      this.showButtonAndNoSpinner = !this.showButtonAndNoSpinner;
    }
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }

  navigateToRegister(): void {
    this.router.navigate(['/account/register']).then(() => {
      location.reload();
    });
  }
}
