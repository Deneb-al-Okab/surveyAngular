import { Component, OnInit } from '@angular/core';

import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RestApiService} from "../services/rest-api.service";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {coerceStringArray} from "@angular/cdk/coercion";
import { Survey } from '../objects/Survey'
import { Category } from '../objects/Survey'

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
 export class CreateSurveyComponent implements OnInit {
   public form!:           FormGroup; // FORM DEL SURVEY
  public error:           string  = "";
  public response: any;
  public myjson!: any;
  isVisible: boolean= false;
  public mail: any;
  public question_cat: any;
  // FORM DI QA
  formQA = this.fb.group({
      questions: this.fb.array([
      ])
})
  public answers_all: any;

  constructor(private fb: FormBuilder,
              private ras: RestApiService,private router: Router,
              private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      categoryname: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      startdate: new FormControl('', [Validators.required]),
      enddate: new FormControl('', [Validators.required]),
    });

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

  addQuestion() {
    const questionForm = this.fb.group({
      id_cat: [this.form.value.category, Validators.required],
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
        this.isVisible=false;
        //this.response = res;
      }).catch((err) => {
        this.isVisible=true;
        this.error = "Qualcosa è andato storto";
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

}
