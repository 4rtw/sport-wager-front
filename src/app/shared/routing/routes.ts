import { RouterModule, Routes } from '@angular/router';
import { WagerComponent } from '../../components/application/wager/wager.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from '../../components/application/userSpace/AnonymousUser/RegisterComponents/register/register.component';
import { ConfirmAccountComponent } from '../../components/application/userSpace/AnonymousUser/RegisterComponents/confirm-account/confirm-account.component';
import { ResetPasswordComponent } from '../../components/application/userSpace/AnonymousUser/Password/reset-password/reset-password.component';
import { VerifyResetCodeComponent } from '../../components/application/userSpace/AnonymousUser/Password/verify-reset-code/verify-reset-code.component';
import { ResetPasswordFinalStepComponent } from '../../components/application/userSpace/AnonymousUser/Password/reset-password-final-step/reset-password-final-step.component';
import { NbaMatchesComponent } from '../../components/application/wager/Paris/nba/nba-matches/nba-matches.component';
import { UserContainerComponent } from '../../components/application/userSpace/LoggedUser/user-container/user-container.component';
import { FootballComponent } from '../../components/application/wager/Paris/football/football/football.component';

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
      {
        path: 'foot',
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
