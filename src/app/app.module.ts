import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

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


import { RenduDirective } from './shared/rendu.directive';
import { NonRenduDirective } from './shared/non-rendu.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/guard/auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginComponent } from "./login/login.component";
import { AuthService } from "./shared/services/auth.service";
import { ChildGuard } from "./shared/guard/child.guard";
import {MatTableModule} from '@angular/material/table';

import {PanelModule} from 'primeng/panel';
import {ChartModule} from 'primeng/chart';
import {CalendarModule} from 'primeng/calendar';
import { AuthInterceptor } from "./interceptor/auth.interceptor";
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DynamicDialogComponent } from './components/dynamic-dialog/dynamic-dialog.component';

import { FileUploadModule } from "ng2-file-upload";
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { MaterialFileInputModule } from 'ngx-material-file-input';

import { ToolBarComponent } from './components/tool-bar/tool-bar.component';

import {MatGridListModule} from '@angular/material/grid-list';
import { ModalComponent } from './components/modal/modal.component';




import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
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
const routes: Routes = [
  { 
    path: "", 
    redirectTo: "sport-wager", 
    pathMatch: "full"
  },
  { 
    path: "sport-wager", 
    component: SportWagerComponent,
    children: [
      {
        path: "",
        component: WagerComponent
      },
    ]
  },
  /*{
    path: "assignments",
    component: AssignmentsComponent,
    children: [
      {
        path: "",
        component: AssignmentListComponent
      },
      {
        path: "add",
        component: AddAssignmentComponent
      },
      { 
        path: "eleves", 
        component: EleveOutletComponent,
        children: [
          { 
            path: "", 
            component: EleveListComponent
          },    
          { 
            path: "add", 
            component: AddElevesComponent,
          },
          {
            path: "assignments",
            component: EleveAssignmentsComponent
          },
        ]
      },
      { 
        path: "professeurs", 
        component: ProfesseurOutletComponent,
        children: [
          { 
            path: "", 
            component: ProfesseursComponent
          },
          {
            path: "assignments",
            component: ProfesseurAssignmentComponent
          }
        ]
      },
      { 
        path: "matieres", 
        component: MatiereComponent,
        children: [
          { 
            path: "", 
            component: MatiereListComponent,
          },  
          { 
            path: "cours/:id", 
            component: CoursComponent,
          },
        ]
      },
      { 
        path: "dashboard", 
        component: DashboardComponent,
        data: { roles: [ AuthService.ADMIN, AuthService.PROFESSEUR ] }
      },
      {
        path: "detail/:id",
        component: AssignmentDetailComponent
      },
      {
        path: "edit/:id",
        component: EditAssigmentComponent
      }
    ],    
    //canActivateChild: [ChildGuard],
    //data: { roles: [ AuthService.ADMIN, AuthService.PROFESSEUR, AuthService.ELEVE ] }
  },
  {
    // idem avec  http://localhost:4200/home
    path: "home",
    redirectTo: "/assignments"
  },
  {
    path: '403',
    component: ForbiddenComponent
  }*/
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NonRenduDirective,
    ConfirmDialogComponent,
    DynamicDialogComponent,
    ToolBarComponent,
    ModalComponent,
    ForbiddenComponent,
    UserMenuComponent,
    WagerComponent,
    SportWagerComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      ButtonModule,
      SplitterModule,
      InputTextModule,
      CarouselModule,
      InputNumberModule,
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
      CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'dy528ddbe' } as CloudinaryConfiguration),
      RouterModule.forRoot(routes), HttpClientModule
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
  },ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
