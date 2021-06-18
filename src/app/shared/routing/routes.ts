import { RouterModule, Routes } from '@angular/router';
import { WagerComponent } from '../../components/application/wager/wager.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from '../../components/authentications/RegisterComponents/register/register.component';
import { ConfirmAccountComponent } from '../../components/authentications/RegisterComponents/confirm-account/confirm-account.component';
import { ResetPasswordComponent } from '../../components/authentications/Password/reset-password/reset-password.component';
import { VerifyResetCodeComponent } from '../../components/authentications/Password/verify-reset-code/verify-reset-code.component';
import { ResetPasswordFinalStepComponent } from '../../components/authentications/Password/reset-password-final-step/reset-password-final-step.component';
import { NbaMatchesComponent } from '../../components/application/nba/nba-matches/nba-matches.component';
import { UserContainerComponent } from '../../components/user/user-container/user-container.component';

const routes: Routes = [
  {
    path: 'account',
    children: [
      {
        path: 'register',
        component: RegisterComponent,
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
    ],
  },
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: '/wager',
  },
  {
    path: 'wager',
    component: WagerComponent,
    children: [
      {
        path: '',
        component: NbaMatchesComponent,
      },
      {
        path: 'nba',
        component: NbaMatchesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
