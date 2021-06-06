import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../../components/authentications/login/login.component";
import {SportWagerComponent} from "../../sport-wager/sport-wager.component";
import {WagerComponent} from "../../sport-wager/wager/wager.component";
import {NgModule} from "@angular/core";
import {RegisterComponent} from "../../components/authentications/register/register.component";
import {ConfirmAccountComponent} from "../../components/authentications/confirm-account/confirm-account.component";
import {ResetPasswordComponent} from "../../components/authentications/reset-password/reset-password.component";
import {VerifyResetCodeComponent} from "../../components/authentications/verify-reset-code/verify-reset-code.component";
import {ResetPasswordFinalStepComponent} from "../../components/authentications/reset-password-final-step/reset-password-final-step.component";

const routes: Routes = [
    {
        path: "",
        redirectTo: "sport-wager",
        pathMatch: "full"
    },
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path:"register",
        component: RegisterComponent,
    },
    {
        path:"confirm-account",
        component: ConfirmAccountComponent,
    },

    {
        path:"verify-reset-code",
        component: VerifyResetCodeComponent,
    },
    {
        path:"reset-password",
        component: ResetPasswordComponent,
    },
    {
        path:"set-password",
        component: ResetPasswordFinalStepComponent,
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
    //region assignments
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
    //endregion
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
