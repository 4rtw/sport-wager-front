/*Angular && material*/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

/*Primeng*/
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { CalendarModule } from 'primeng/calendar';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { InputNumberModule } from 'primeng/inputnumber';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { MenubarModule } from 'primeng/menubar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AccordionModule } from 'primeng/accordion';
import { ToolbarModule } from 'primeng/toolbar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { CarouselModule } from 'primeng/carousel';

/*Shared*/
import { AppRoutingModule } from './shared/routing/routes';

/*Components*/
import { AppComponent } from './app.component';
import { ConfirmAccountComponent } from './components/auth-collection/confirm-account/confirm-account.component';
import { ResetPasswordComponent } from './components/auth-collection/reset-password/reset-password.component';
import { ResetPasswordFinalStepComponent } from './components/auth-collection/reset-password-final-step/reset-password-final-step.component';
import { VerifyResetCodeComponent } from './components/auth-collection/verify-reset-code/verify-reset-code.component';
import { TopbarComponent } from './components/ui-collection/topbar/topbar.component';
import { ProfileComponent } from './components/user-collection/profile/profile.component';
import { PanierComponent } from './components/bet-collection/panier/panier.component';
import { VideoComponent } from './components/ui-collection/video/video.component';
import { UserContainerComponent } from './components/user-collection/user-container/user-container.component';
import { ImageComponent } from './components/user-collection/image/image.component';

/*Others*/
import { FileUploadModule } from 'ng2-file-upload';
import { JwtModule } from '@auth0/angular-jwt';
import { TokenInterceptor } from './shared/interceptor/token.interceptor';
import { CookieModule } from 'ngx-cookie';

import {
  CloudinaryModule,
  CloudinaryConfiguration,
} from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FooterComponent } from './components/ui-collection/footer/footer.component';
import { GalleriaComponent } from './components/ui-collection/galleria/galleria.component';
import { GalleriaModule } from 'primeng/galleria';
import { FlipCardComponent } from './components/ui-collection/flip-card/flip-card.component';
import { SkeletonLoadingComponent } from './components/ui-collection/skeleton-loading/skeleton-loading.component';
import { WarningComponent } from './components/ui-collection/warning/warning.component';
import { FootballBetElementComponent } from './components/bet-collection/football/football-bet-element/football-bet-element.component';
import { CountryListComponent } from './components/application/statistic/football/country-list/country-list.component';
import { OrderListModule } from 'primeng/orderlist';
import { CompetitionListComponent } from './components/application/statistic/football/competition-list/competition-list.component';
import { LoginRegisterComponent } from './components/auth-collection/login-register/login-register.component';
import { BetFootballComponent } from './components/bet-collection/football/bet-football/bet-football.component';
import { BetNbaComponent } from './components/bet-collection/basketball/bet-nba/bet-nba.component';
import { NavigationNbaComponent } from './components/bet-collection/basketball/navigation-nba/navigation-nba.component';
import { NavigationFootballComponent } from './components/bet-collection/football/navigation-football/navigation-football.component';
import { FootballComponent } from './components/bet-collection/football/football.component';
import { BasketballComponent } from './components/bet-collection/basketball/basketball.component';
import { SlideMenuModule } from 'primeng/slidemenu';
import { InputSwitchModule } from 'primeng/inputswitch';
import { KnobModule } from 'primeng/knob';
import { TooltipModule } from 'primeng/tooltip';
import { BasketballBetElementComponent } from './components/bet-collection/basketball/basketball-bet-element/basketball-bet-element.component';
import { NbaStatsComponent } from './components/application/statistic/nba-stats/nba-stats.component';
import { FootballStatsComponent } from './components/application/statistic/football-stats/football-stats.component';
import { MyBetsComponent } from './components/application/my-bets/my-bets.component';
import { MatchListComponent } from './components/application/statistic/nba/match-list/match-list.component';
import { FootballMatchesListComponent } from './components/application/statistic/football/football-matches-list/football-matches-list.component';
import { NavigationFootballStatsComponent } from './components/application/statistic/football/navigation-football-stats/navigation-football-stats.component';
import { ChartModule } from 'angular2-chartjs';
import { NbaStatOneComponent } from './components/application/statistic/nba/nba-stat-one/nba-stat-one.component';
import { NbaStatTwoComponent } from './components/application/statistic/nba/nba-stat-two/nba-stat-two.component';
import { CompareStatsComponent } from './components/application/statistic/football/compare-stats/compare-stats.component';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {MultiSelectModule} from 'primeng/multiselect';
import { BetNbaAllComponent } from './components/bet-collection/basketball/bet-nba-all/bet-nba-all.component';
import { FootballBetAllComponent } from './components/bet-collection/football/football-bet-all/football-bet-all.component';
import { PanierCollectedComponent } from './components/bet-collection/panier-collected/panier-collected.component';

import { QRCodeModule } from 'angular2-qrcode';
@NgModule({
  declarations: [
    AppComponent,
    ConfirmAccountComponent,
    ResetPasswordComponent,
    ResetPasswordFinalStepComponent,
    VerifyResetCodeComponent,
    TopbarComponent,
    ProfileComponent,
    PanierComponent,
    VideoComponent,
    UserContainerComponent,
    ImageComponent,
    FootballComponent,
    FooterComponent,
    GalleriaComponent,
    FlipCardComponent,
    SkeletonLoadingComponent,
    WarningComponent,
    CountryListComponent,
    CompetitionListComponent,
    FootballBetElementComponent,
    LoginRegisterComponent,
    BasketballComponent,
    BetFootballComponent,
    BetNbaComponent,
    NavigationNbaComponent,
    NavigationFootballComponent,
    BasketballBetElementComponent,
    NbaStatsComponent,
    FootballStatsComponent,
    MyBetsComponent,
    MatchListComponent,
    FootballMatchesListComponent,
    NavigationFootballStatsComponent,
    NbaStatOneComponent,
    NbaStatTwoComponent,
    CompareStatsComponent,
    BetNbaAllComponent,
    FootballBetAllComponent,
    PanierCollectedComponent,
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
        BrowserModule,
        OrderListModule,
        HttpClientModule,
        MenuModule,
        MenubarModule,
        TieredMenuModule,
        DropdownModule,
        RippleModule,
        InputTextModule,
        SelectButtonModule,
        SplitButtonModule,
        ToastModule,
        ProgressSpinnerModule,
        TagModule,
        SkeletonModule,
        CalendarModule,
        FileUploadModule,
        MessageModule,
        MessagesModule,
        AccordionModule,
        DynamicDialogModule,
        ChartModule,
        QRCodeModule,
        CloudinaryModule.forRoot({Cloudinary}, {
            cloud_name: 'dy528ddbe',
        } as CloudinaryConfiguration),
        CookieModule.forRoot(),
        JwtModule.forRoot({
            config: {
                tokenGetter: localStorage.getItem('token')?.toString || null,
                allowedDomains: ['*'],
                disallowedRoutes: [''],
            },
        }),
        ToolbarModule,
        OverlayPanelModule,
        TableModule,
        CarouselModule,
        SlideMenuModule,
        InputSwitchModule,
        KnobModule,
        TooltipModule,
        CascadeSelectModule,
        MultiSelectModule,
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
export class AppModule {}
