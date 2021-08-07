import { RouterModule, Routes } from '@angular/router';
import { WagerComponent } from '../../components/application/wager/wager.component';
import { NgModule } from '@angular/core';
import { ConfirmAccountComponent } from '../../components/auth-collection/confirm-account/confirm-account.component';
import { ResetPasswordComponent } from '../../components/auth-collection/reset-password/reset-password.component';
import { VerifyResetCodeComponent } from '../../components/auth-collection/verify-reset-code/verify-reset-code.component';
import { ResetPasswordFinalStepComponent } from '../../components/auth-collection/reset-password-final-step/reset-password-final-step.component';
import { UserContainerComponent } from '../../components/user-collection/user-container/user-container.component';
import { FootballComponent } from '../../components/bet-collection/football/football.component';
import { LoginRegisterComponent } from '../../components/auth-collection/login-register/login-register.component';
import { BasketballComponent } from 'src/app/components/bet-collection/basketball/basketball.component';

const routes: Routes = [
  {
    path: 'register',
    component: LoginRegisterComponent,
  },
  {
    path: 'confirm-account',
    component: ConfirmAccountComponent,
  },
  {
    path: 'verify-reset-code',
    component: VerifyResetCodeComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'set-password',
    component: ResetPasswordFinalStepComponent,
  },
  {
    path: 'profile',
    component: UserContainerComponent,
  },
  {
    path: 'wager',
    children: [
      {
        path: '',
        component: WagerComponent,
        children: [
          {
            path: '',
            component: FootballComponent,
          },
          {
            path: 'football',
            component: FootballComponent,
          },
          { path: 'basketball', component: BasketballComponent },
        ],
      },
    ],
  },

  {
    path: 'basketball',
    component: BasketballComponent,
  },
  {
    path: '',
    children: [
      {
        path: '',
        component: FootballComponent,
      },
      {
        path: 'nba',
        component: BasketballComponent,
      },
      {
        path: 'football',
        component: FootballComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
