import { Component, OnInit } from '@angular/core';
//import {FormBuilder} from "@angular/forms";
 import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
 export class CreateSurveyComponent implements OnInit {

   firstFormGroup = this._formBuilder.group({
     firstCtrl: ['', Validators.required],
   });
   secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
   });



  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

}
