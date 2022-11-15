import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CreateSurveyComponent} from "../create-survey/create-survey.component";
import {RestApiService} from "../services/rest-api.service";
import {forms} from "@angular/core/schematics/migrations/typed-forms/util";

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {
  public form!: FormGroup;
  public error: string="";

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    title: string
    category: number},
    public dialogRef: MatDialogRef<CreateSurveyComponent>, private ras: RestApiService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      question: new FormControl('', [Validators.required]),
      id_category: new FormControl(this.data.category)
    });
  }

  public async newQuestion() {
    console.log(JSON.stringify(this.form.value));
    await this.ras.callApi('http://localhost:8080/surveySpringBoot/api/createQuestion', 'POST', this.form.value)
      .then((res) => {
        alert("Question created correctly!");
        this.dialogRef.close(res);
      }).catch((err) => {
        console.log(err);
        this.error = "Something went WRONG!";
      });
  }

  public close() {
      this.dialogRef.close("abort");
  }

}
