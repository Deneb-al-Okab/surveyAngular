import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {HomeComponent} from "./home/home.component";
import {HomeUserComponent} from "./home-user/home-user.component";
import {HomeAdminComponent} from "./home-admin/home-admin.component";
import {CreateSurveyComponent} from "./create-survey/create-survey.component";
import {TakeSurveyComponent} from "./take-survey/take-survey.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'home', component:HomeComponent},
  {path: 'home-user', component:HomeUserComponent},
  {path: 'home-admin', component:HomeAdminComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'create-survey', component: CreateSurveyComponent},
  {path: 'take-survey', component: TakeSurveyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
