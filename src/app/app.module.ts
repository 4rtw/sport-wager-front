import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './shared/routing/routes';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRippleModule } from '@angular/material/core';
import { MenuModule } from 'primeng/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/authentications/login/login.component';
import { PanelModule } from 'primeng/panel';
import { AuthInterceptor } from './shared/interceptor/auth.interceptor';
import { UserMenuComponent } from './components/UI/user-menu/user-menu.component';
import { SportWagerComponent } from './sport-wager/sport-wager.component';
import { WagerComponent } from './sport-wager/wager/wager.component';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { InputNumberModule } from 'primeng/inputnumber';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { RegisterComponent } from './components/authentications/RegisterComponents/register/register.component';
import { MenubarModule } from 'primeng/menubar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { ConfirmAccountComponent } from './components/authentications/RegisterComponents/confirm-account/confirm-account.component';
import { ResetPasswordComponent } from './components/authentications/Password/reset-password/reset-password.component';
import { ResetPasswordFinalStepComponent } from './components/authentications/Password/reset-password-final-step/reset-password-final-step.component';
import { VerifyResetCodeComponent } from './components/authentications/Password/verify-reset-code/verify-reset-code.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserMenuComponent,
    WagerComponent,
    SportWagerComponent,
    RegisterComponent,
    ConfirmAccountComponent,
    ResetPasswordComponent,
    ResetPasswordFinalStepComponent,
    VerifyResetCodeComponent
  ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ButtonModule,
        InputNumberModule,
        PasswordModule,
        ScrollPanelModule,
        BadgeModule,
        CardModule,
        PanelModule,
        DividerModule,
        VirtualScrollerModule,
        AvatarModule,
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatListModule,
        MatCardModule,
        MatMenuModule,
        MatSidenavModule,
        MatToolbarModule,
        MatRippleModule,
        BrowserModule,
        HttpClientModule,
        MenuModule,
        MenubarModule,
        TieredMenuModule,
        DropdownModule,
        RippleModule,
    ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
