import { Component, OnInit } from '@angular/core';

import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RestApiService} from "../services/rest-api.service";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {coerceStringArray} from "@angular/cdk/coercion";
import { Survey } from '../objects/Survey'
import { Category } from '../objects/Survey'
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {NewQuestionComponent} from "../new-question/new-question.component";
import { QuestionAnswer } from '../objects/QuestionAnswer'
import {Question} from "../objects/QASurvey";

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
 export class CreateSurveyComponent implements OnInit {
  public form!:           FormGroup; // FORM DEL SURVEY
  public formQA!:           FormGroup;
  public error:           string  = "";
  public response: any;
  public myjson!: any;
  public mail: any;
  public question_cat: any;
  public answers_all: any;
  public qas: any;
  public  newSurvey: any;
  public isVisible: number = 0;

  constructor(private fb: FormBuilder,
              private ras: RestApiService,
              private router: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      // categoryname: new FormControl('', ),
      description: new FormControl('', [Validators.required]),
      startdate: new FormControl('', [Validators.required]),
      enddate: new FormControl('', [Validators.required]),
    });
    this.formQA = this.fb.group({
      questions: this.fb.array([])
    })

    this.route.queryParams.subscribe(params=>{
      this.mail = params["mail"];
    });
    this.getAllCategories();
    this.getAllAnswers();
  }
  get questions() {
    return this.formQA.controls["questions"] as FormArray;
  }
  getAnswers(empIndex:number) : FormArray {
    return this.questions.at(empIndex).get("answers") as FormArray
  }
  // ESSENZIALE PER LE NESTED FORM
  // https://www.tektutorialshub.com/angular/nested-formarray-example-add-form-fields-dynamically/
  addQuestion() {
    const questionForm = this.fb.group({
      question: ['', Validators.required],
      answers: this.fb.array([
      ])
    });
    this.questions.push(questionForm);
  }
  questionAnswer(empIndex: number): FormArray {
    return this.questions
      .at(empIndex)
      .get('answers') as FormArray;
  }
  newAnswer(): FormGroup {
    return this.fb.group({
      answer: "",
    })
  }
  addAnswer(empIndex:number) {
    this.getAnswers(empIndex).push(this.newAnswer());
  }
  deleteQuestion(lessonIndex: number) {
    this.questions.removeAt(lessonIndex);
  }

  public async getAllAnswers() {
    await this.ras.callApi('http://localhost:8080/surveySpringBoot/api/answers', 'GET',null)
      .then((res) => {
        this.answers_all = res;
      }).catch((err) => {
        console.log(err);
      });
  }
  public async getAllCategories() {
    await this.ras.callApi('http://localhost:8080/surveySpringBoot/api/categories', 'GET',null)
      .then((res) => {
        this.response = res;
      }).catch((err) => {
        console.log(err);
      });
  }
  public async getQuestionbyIDCat() {
    let id_cat = this.form.value.category ;
    let url = "http://localhost:8080/surveySpringBoot/api/category-questions?id=" + id_cat;
    await this.ras.callApi(url, 'GET',null)
      .then((res) => {
        this.question_cat = res;
      }).catch((err) => {
        console.log(err);
      });
  }

  public async createSurvey() {
    this.error = "";
    //console.log("mail " + this.mail);
    let cat = new Category(this.form.value.category, this.form.value.categoryname);
    let surv = new Survey(this.mail,cat,this.form.value.name,this.form.value.description,this.form.value.startdate,this.form.value.enddate);
    console.log(surv);
    await this.ras.callApi('http://localhost:8080/surveySpringBoot/api/createSurvey', 'POST',surv)
      .then((res) => {
        this.newSurvey = res;
        //this.response = res;
      }).catch((err) => {
        console.log("Errore in create survey");
        console.log(err);
        this.isVisible = 2;
      });
    if(this.isVisible == 2){
      return;
    }
    this.createSurveyQA();

  }

  public async createSurveyQA() {
    // PRIMA POPOLO UN ARRAY DI Question ANSWERS this.qas
    this.qas = new Array<QuestionAnswer>();
    let formTemp = this.formQA.value.questions;
    let element!: keyof typeof this.formQA.value;
/*    for (let i = 0; i < formTemp.length; i++) {
      let newQ = formTemp[i].question;
      console.log("newQ = ");
      console.log(newQ);
    }*/
    for (element  in formTemp) {
      let newQ = formTemp[element].question;
      for (let i = 0; i < formTemp[element].answers.length; i++) {
        let newA = formTemp[element].answers[i].answer;
        let newQA = new QuestionAnswer(newQ,newA);
        this.qas.push(newQA);
      }
    }
    console.log(this.qas);
    let url = "http://localhost:8080/surveySpringBoot/api/createQuestAns?id_survey=" + this.newSurvey.id;
    await this.ras.callApi(url, 'POST',this.qas)
      .then((res) => {
        this.isVisible = 1;
      }).catch((err) => {
        console.log("Errore in create QA");
        console.log(err);
        this.isVisible = 2;
      });

  }

  backHome(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "mail":    this.mail,
      },
      skipLocationChange: false
    };
    this.router.navigate(
       ['/home-admin'],
       navigationExtras
      );
    }

  createQuestion() {
    const config = new MatDialogConfig();
    console.log(this.form.value.category);

    config.disableClose = true;
    config.id           = "new-question-component";
    config.height       = "450px";
    config.width        = "650px";
    config.data         = {title: "Create a new question", component: 'new-question',
                          category: this.form.value.category};

    const dialogRef = this.dialog.open(NewQuestionComponent,config);

    dialogRef.afterClosed().subscribe((result) =>{

    });

  }
}
