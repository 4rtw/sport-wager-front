import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {AppRoutingModule} from "./shared/routing/routes";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling'
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';

//#region Ando
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
//endregion


/*
import { RenduDirective } from './shared/services/assignements/rendu.directive';
import { NonRenduDirective } from './shared/services/assignements/non-rendu.directive';
import { AuthService } from "./shared/services/assignements/auth.service";
import { ChildGuard } from "./shared/guard/child.guard";
 */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginComponent } from "./components/authentications/login/login.component";

import {MatTableModule} from '@angular/material/table';

import {PanelModule} from 'primeng/panel';
import {ChartModule} from 'primeng/chart';
import {CalendarModule} from 'primeng/calendar';
import { AuthInterceptor } from "./shared/interceptor/auth.interceptor";
import { ConfirmDialogComponent } from './components/idk-mdrrrrr/confirm-dialog/confirm-dialog.component';
import { DynamicDialogComponent } from './components/idk-mdrrrrr/dynamic-dialog/dynamic-dialog.component';

import { FileUploadModule } from "ng2-file-upload";
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { MaterialFileInputModule } from 'ngx-material-file-input';

import { ToolBarComponent } from './components/idk-mdrrrrr/tool-bar/tool-bar.component';

import {MatGridListModule} from '@angular/material/grid-list';
import { ModalComponent } from './components/idk-mdrrrrr/modal/modal.component';


import { ForbiddenComponent } from './components/idk-mdrrrrr/forbidden/forbidden.component';
import { UserMenuComponent } from './components/UI/user-menu/user-menu.component';
import { SportWagerComponent } from './sport-wager/sport-wager.component';
import { WagerComponent } from './sport-wager/wager/wager.component';

import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {CarouselModule} from 'primeng/carousel';
import { ProductService } from './produit-service';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {SelectButtonModule} from 'primeng/selectbutton';

import {SplitterModule} from 'primeng/splitter';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {TabViewModule} from 'primeng/tabview';
import {InputNumberModule} from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';
import {DividerModule} from 'primeng/divider';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {CardModule} from 'primeng/card';
import {PasswordModule} from 'primeng/password';
import { RegisterComponent } from './components/authentications/register/register.component';
import {MenubarModule} from "primeng/menubar";
import {TieredMenuModule} from "primeng/tieredmenu";


import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {RippleModule} from "primeng/ripple";
import { ConfirmAccountComponent } from './components/authentications/confirm-account/confirm-account.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfirmDialogComponent,
    DynamicDialogComponent,
    ToolBarComponent,
    ModalComponent,
    ForbiddenComponent,
    UserMenuComponent,
    WagerComponent,
    SportWagerComponent,
    RegisterComponent,
    ConfirmAccountComponent
  ],
    imports: [
        CheckboxModule,
        RadioButtonModule,
        InputTextareaModule,
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ButtonModule,
        SplitterModule,
        InputTextModule,
        CarouselModule,
        InputNumberModule,
        PasswordModule,
        SelectButtonModule,
        TabViewModule,
        ScrollPanelModule,
        BadgeModule,
        CardModule,
        PanelModule,
        DividerModule,
        VirtualScrollerModule,
        AvatarModule,
        AvatarGroupModule,
        ReactiveFormsModule,
        ScrollingModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatListModule,
        MatCardModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatStepperModule,
        MatSelectModule,
        MatMenuModule,
        MatTabsModule,
        MatPaginatorModule,
        MatSidenavModule,
        MatToolbarModule,
        MatButtonToggleModule,
        DragDropModule,
        MatDialogModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatRippleModule,
        PanelModule,
        ChartModule,
        CalendarModule,
        FileUploadModule,
        MaterialFileInputModule,
        BrowserModule,
        MatGridListModule,
        MatSnackBarModule,
        CloudinaryModule.forRoot({Cloudinary}, {cloud_name: 'dy528ddbe'} as CloudinaryConfiguration),
        HttpClientModule,

        //#region ando
        MenuModule,
        MenubarModule,
        TieredMenuModule,
        DropdownModule,
        RippleModule,
        //endregion
    ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
  },ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
