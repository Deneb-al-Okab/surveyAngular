import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {DialogTemplateComponent} from "../dialog-template/dialog-template.component";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from "../services/rest-api.service";
import {MatDialogRef} from "@angular/material/dialog";
import{AppComponent} from "../app.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RestApiService} from "../services/rest-api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form!:           FormGroup;
  public error:           string  = "";
  public hidePassword:    boolean = true;

  constructor(
    private ras: RestApiService,
    public dialogRef: MatDialogRef<LoginComponent>
  ) {

  }

  ngOnInit(): void{
    this.form = new FormGroup({
      mail: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required])
    });
  }

  public async login(){
    this.error = "";

    await this.ras.callApi('http://localhost:8080/surveySpringBoot/api/login', 'POST', this.form.value)
      .then((res) => {
        this.dialogRef.close(res);
      }).catch((err) => {
        console.log(err);
        this.error = "Not Known User";
      });
  }

  public close() {
    this.dialogRef.close("login-ko");
  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.form.controls[controlName].hasError(errorName);
  }
}
