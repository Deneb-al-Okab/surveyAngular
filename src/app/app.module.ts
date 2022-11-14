import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {AppRoutingModule} from "./app-routing.module";
import { HomeComponent } from './home/home.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogTemplateComponent } from './dialog-template/dialog-template.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import {MatRadioModule} from "@angular/material/radio";
import {MatNativeDateModule} from '@angular/material/core';
import { TakeSurveyComponent } from './take-survey/take-survey.component';
import {MatTableModule} from "@angular/material/table";
import { SurveyStatsComponent } from './survey-stats/survey-stats.component';
import { CreateSurveyQaComponent } from './create-survey-qa/create-survey-qa.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    HomeUserComponent,
    HomeAdminComponent,
    DialogTemplateComponent,
    CreateSurveyComponent,
    TakeSurveyComponent,
    SurveyStatsComponent,
    CreateSurveyQaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    MatRadioModule,
    MatNativeDateModule,
    MatTableModule,

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
