import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {DialogTemplateComponent} from "../dialog-template/dialog-template.component";
import {Router} from "@angular/router";
import {FormControl, FormGroup, RadioControlValueAccessor, Validators} from "@angular/forms";
import {RestApiService} from "../services/rest-api.service";
import {MatRadioGroup} from "@angular/material/radio";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public form!:           FormGroup;
  public error:           string  = "";
  public hidePassword:    boolean = true;

  constructor(public dialogRef: MatDialogRef<SignUpComponent>,
              private router: Router,
              private ras: RestApiService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      mail: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required]),
      isAdmin: new FormControl('', [Validators.required])
    });
  }

  public async signUP() {
    this.error = "";
    await this.ras.callApi('http://localhost:8080/surveySpringBoot/api/sign-up', 'POST', this.form.value)
        .then((res) => {
          this.dialogRef.close(res);
        }).catch((err) => {
          this.error = "Already subscribed";
        });
    }

  close() {
    this.dialogRef.close("login-ko");

  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.form.controls[controlName].hasError(errorName);
  }
}
