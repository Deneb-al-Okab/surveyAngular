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

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    title: string
    category: string},
    public dialogRef: MatDialogRef<CreateSurveyComponent>, private ras: RestApiService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      question: new FormControl('', [Validators.required]),
      id_category: new FormControl(this.data.category)
    });
  }

  public newQuestion() {
    console.log(this.form.value)
    this.dialogRef.close();

  }

  public close() {
      this.dialogRef.close("abort");
  }

}
