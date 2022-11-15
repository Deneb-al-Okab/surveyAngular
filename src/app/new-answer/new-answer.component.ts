import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CreateSurveyComponent} from "../create-survey/create-survey.component";
import {RestApiService} from "../services/rest-api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-answer',
  templateUrl: './new-answer.component.html',
  styleUrls: ['./new-answer.component.css']
})
export class NewAnswerComponent implements OnInit {
  public form!: FormGroup;
  public error: string="";

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
                title: string },
              public dialogRef: MatDialogRef<CreateSurveyComponent>, private ras: RestApiService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      answer: new FormControl('', [Validators.required])
    });
  }

  public async newAnswer() {
    await this.ras.callApi('http://localhost:8080/surveySpringBoot/api/createAnswer', 'POST', this.form.value)
      .then((res) => {
        alert("Answer created correctly!")
        this.dialogRef.close(res);
      }).catch((err) => {
        if(err.status==409){
          console.log(err);
          this.error = "Already existing answer, please check.";
        }
        else{
          this.error = "Something went WRONG!";
        }

      });

  }

  public close() {
    this.dialogRef.close("abort");
  }

}
