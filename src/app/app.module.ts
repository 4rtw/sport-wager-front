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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { RegisterComponent } from './components/application/userSpace/AnonymousUser/RegisterComponents/register/register.component';
import { MenubarModule } from 'primeng/menubar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { ConfirmAccountComponent } from './components/application/userSpace/AnonymousUser/RegisterComponents/confirm-account/confirm-account.component';
import { ResetPasswordComponent } from './components/application/userSpace/AnonymousUser/Password/reset-password/reset-password.component';
import { ResetPasswordFinalStepComponent } from './components/application/userSpace/AnonymousUser/Password/reset-password-final-step/reset-password-final-step.component';
import { VerifyResetCodeComponent } from './components/application/userSpace/AnonymousUser/Password/verify-reset-code/verify-reset-code.component';
import { InputTextModule } from 'primeng/inputtext';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TopbarComponent } from './components/UI/topbar/topbar.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AccountMenuComponent } from './components/UI/user-menu/account-menu/account-menu.component';
import { AnonymousUserMenuComponent } from './components/UI/user-menu/anonymous-user-menu/anonymous-user-menu.component';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MatDialogModule } from '@angular/material/dialog';
import { NbaMatchesComponent } from './components/application/wager/Paris/nba/nba-matches.component';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { CalendarModule } from 'primeng/calendar';
import { ProfileComponent } from './components/application/userSpace/LoggedUser/user-container/profile/profile.component';
import { PanierComponent } from './components/application/wager/panier/panier.component';
import { VideoComponent } from './components/UI/video/video.component';
import { UserContainerComponent } from './components/application/userSpace/LoggedUser/user-container/user-container.component';
import { ImageComponent } from './components/application/userSpace/LoggedUser/user-container/image/image.component';
import { FileUploadModule } from 'ng2-file-upload';
import { AccordionModule } from 'primeng/accordion';
import { JwtModule } from '@auth0/angular-jwt';
import { TokenInterceptor } from './shared/interceptor/token.interceptor';
import { CookieModule } from 'ngx-cookie';
import { FootballComponent } from './components/application/wager/Paris/football/football.component';
import { ToolbarModule } from 'primeng/toolbar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { CarouselModule } from 'primeng/carousel';
import { RootContainerComponent } from './components/root-container/root-container.component';
import {
  CloudinaryModule,
  CloudinaryConfiguration,
} from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { BetPostComponent } from './components/application/wager/Paris/bet-post/bet-post.component';
import { FooterComponent } from './components/UI/footer/footer.component';
import { GalleriaComponent } from './components/UI/galleria/galleria.component';
import { GalleriaModule } from 'primeng/galleria';
import { FlipCardComponent } from './components/UI/flip-card/flip-card.component';
import { SkeletonLoadingComponent } from './components/UI/skeleton-loading/skeleton-loading.component';
import { WarningComponent } from './components/UI/warning/warning.component';
import { NavigationsComponent } from './components/UI/navigations/navigations.component';
import { StatisticComponent } from './components/application/wager/statistic/statistic.component';
import { CountryListComponent } from './components/application/wager/statistic/country-list/country-list.component';
import { OrderListModule } from 'primeng/orderlist';
import { CompetitionListComponent } from './components/application/wager/statistic/competition-list/competition-list.component';
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
    AccountMenuComponent,
    AnonymousUserMenuComponent,
    NbaMatchesComponent,
    ProfileComponent,
    PanierComponent,
    VideoComponent,
    UserContainerComponent,
    ImageComponent,
    FootballComponent,
    RootContainerComponent,
    BetPostComponent,
    FooterComponent,
    GalleriaComponent,
    FlipCardComponent,
    SkeletonLoadingComponent,
    WarningComponent,
    NavigationsComponent,
    StatisticComponent,
    CountryListComponent,
    CompetitionListComponent,
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
    GalleriaModule,
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
    OrderListModule,
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
    CalendarModule,
    FileUploadModule,
    MessageModule,
    MessagesModule,
    AccordionModule,
    DynamicDialogModule,
    CloudinaryModule.forRoot({ Cloudinary }, {
      cloud_name: 'dy528ddbe',
    } as CloudinaryConfiguration),
    CookieModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: localStorage.getItem('token') ?.toString || null,
        allowedDomains: ['*'],
        disallowedRoutes: [''],
      },
    }),
    ToolbarModule,
    OverlayPanelModule,
    TableModule,
    CarouselModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
