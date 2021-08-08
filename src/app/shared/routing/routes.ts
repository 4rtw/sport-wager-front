import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConfirmAccountComponent } from '../../components/auth-collection/confirm-account/confirm-account.component';
import { ResetPasswordComponent } from '../../components/auth-collection/reset-password/reset-password.component';
import { VerifyResetCodeComponent } from '../../components/auth-collection/verify-reset-code/verify-reset-code.component';
import { ResetPasswordFinalStepComponent } from '../../components/auth-collection/reset-password-final-step/reset-password-final-step.component';
import { UserContainerComponent } from '../../components/user-collection/user-container/user-container.component';
import { FootballComponent } from '../../components/bet-collection/football/football.component';
import { LoginRegisterComponent } from '../../components/auth-collection/login-register/login-register.component';
import { BasketballComponent } from 'src/app/components/bet-collection/basketball/basketball.component';
import { AuthGuard } from '../guard/auth-guard';
import { AnonGuard } from '../guard/anon-guard';

const routes: Routes = [
  {
    path: 'register',
    component: LoginRegisterComponent,
    canActivate: [AnonGuard],
  },
  {
    path: 'confirm-account',
    component: ConfirmAccountComponent,
    canActivate: [AnonGuard],
  },
  {
    path: 'verify-reset-code',
    component: VerifyResetCodeComponent,
    canActivate: [AnonGuard],
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [AnonGuard],
  },
  {
    path: 'set-password',
    component: ResetPasswordFinalStepComponent,
    canActivate: [AnonGuard],
  },
  {
    path: 'profile',
    component: UserContainerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/wager/football',
    pathMatch: 'full',
  },
  {
    path: 'wager',
    children: [
      {
        path: '',
        redirectTo: '/wager/football',
        pathMatch: 'full',
      },
      {
        path: 'football',
        component: FootballComponent,
      },
      { path: 'basketball', component: BasketballComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
