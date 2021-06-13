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
import { PanelModule } from 'primeng/panel';
import { UserMenuComponent } from './components/UI/user-menu/user-menu.component';
import { WagerComponent } from './components/application/wager/wager.component';
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
import { InputTextModule } from 'primeng/inputtext';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SelectButtonModule} from 'primeng/selectbutton';
import {TokenInterceptor} from './shared/interceptor/token.interceptor';
import { TopbarComponent } from './components/UI/topbar/topbar.component';
import { SidenavComponent } from './components/UI/sidenav/sidenav.component';
import {SplitButtonModule} from 'primeng/splitbutton';
import { AccountMenuComponent } from './components/UI/user-menu/account-menu/account-menu.component';
import { AnonymousUserMenuComponent } from './components/UI/user-menu/anonymous-user-menu/anonymous-user-menu.component';
import {ToastModule} from 'primeng/toast';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MatDialogModule} from '@angular/material/dialog';
import { NbaMatchesComponent } from './components/application/nba/nba-matches/nba-matches.component';
import {TagModule} from "primeng/tag";
import {SkeletonModule} from "primeng/skeleton";

@NgModule({
  declarations: [
    AppComponent,
    UserMenuComponent,
    WagerComponent,
    RegisterComponent,
    ConfirmAccountComponent,
    ResetPasswordComponent,
    ResetPasswordFinalStepComponent,
    VerifyResetCodeComponent,
    TopbarComponent,
    SidenavComponent,
    AccountMenuComponent,
    AnonymousUserMenuComponent,
    NbaMatchesComponent
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
        InputTextModule,
        MatButtonModule,
        MatInputModule,
        MatProgressSpinnerModule,
        SelectButtonModule,
        SplitButtonModule,
        ToastModule,
        ProgressSpinnerModule,
        MatDialogModule,
        TagModule,
        SkeletonModule,
    ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
