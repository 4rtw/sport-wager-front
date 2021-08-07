import { RouterModule, Routes } from '@angular/router';
import { WagerComponent } from '../../components/application/wager/wager.component';
import { NgModule } from '@angular/core';
import { ConfirmAccountComponent } from '../../components/auth-collection/confirm-account/confirm-account.component';
import { ResetPasswordComponent } from '../../components/auth-collection/reset-password/reset-password.component';
import { VerifyResetCodeComponent } from '../../components/auth-collection/verify-reset-code/verify-reset-code.component';
import { ResetPasswordFinalStepComponent } from '../../components/auth-collection/reset-password-final-step/reset-password-final-step.component';
import { NbaMatchesComponent } from '../../components/application/wager/Paris/nba/nba-matches.component';
import { UserContainerComponent } from '../../components/application/userSpace/LoggedUser/user-container/user-container.component';
import { FootballComponent } from '../../components/bet-collection/football/football.component';
import { LoginRegisterComponent } from '../../components/auth-collection/login-register/login-register.component';

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
    path: 'account',
    children: [
      {
        path: 'profile',
        component: UserContainerComponent,
      }
    ]
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
            path: 'nba',
            component: NbaMatchesComponent,
          },
          {
            path: 'football',
            component: FootballComponent,
          },
        ],
      },
    ],
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
        component: NbaMatchesComponent,
      },
      {
        path: 'football',
        component: FootballComponent,
      },
    ],
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
