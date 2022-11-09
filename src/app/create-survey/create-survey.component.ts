import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RestApiService} from "../services/rest-api.service";

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
 export class CreateSurveyComponent implements OnInit {
  // public form!:           FormGroup;
  public error:           string  = "";
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  private scope: any;

  constructor(private _formBuilder: FormBuilder,
              private ras: RestApiService) {

  }
  ngOnInit(): void {
    // this.form = new FormGroup({
    //   // mail: new FormControl('', [Validators.required]),
    //   // pass: new FormControl('', [Validators.required])
    // });
  }


public async getAllCategories() {
    this.error = "";

    await this.ras.callApi('http://localhost:8080/surveySpringBoot/api/categories', 'GET',null)
      .then((res) => {
        console.log(res[0].name);
      }).catch((err) => {

        this.error = "Qualcosa è andato storto ";
      });
  }

  // public hasError(controlName: string, errorName: string): boolean {
  //     return this.firstFormGroup.controls[controlName].hasError(errorName);
  //   }

}
