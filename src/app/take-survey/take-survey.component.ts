import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {RestApiService} from "../services/rest-api.service";
import {Question} from '../objects/QASurvey'
import { Answer } from '../objects/QASurvey'
import {FormControl,
  FormGroup,
  FormBuilder,
  FormArray,
  Validators} from '@angular/forms';
import { SubSurvey } from '../objects/SubSurvey'
import { SubAnswer } from '../objects/SubSurvey'
import {coerceStringArray} from "@angular/cdk/coercion";



@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.css']
})
export class TakeSurveyComponent implements OnInit {
  // public form:           FormGroup;
  public description: string="";
  public id: any;
  public name: string="";
  public _id: any;
  private error: string="";
  public responseQA: any;
  private mail: string="";
  private is_adm!: number;
  public questions: any;
  public QASForm: any;
  isVisible: number = 0;

  //CREo form con un FormArray QAS (question answer Survey)
  form =  this.fb.group({
    QAS:  this.fb.array([]),
  });
  private answers: any;
  private id_sub: any;


  constructor(private ras: RestApiService, private route: ActivatedRoute,
              private router: Router,private fb: FormBuilder) {
  }

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(params => {
      this.description = params["description"];
      this.id = params["id"];
      this.name = params["name"];
      this.mail = params["mail"];
      this.is_adm = params["is_admin"];
    })
    await this.readSurvey(this.id);
    // Faccio loop su this.questions per creare FormArray di dimensione giusta
    let element: keyof typeof this.questions;
    for (element in this.questions) {
      (this.form.get('QAS') as FormArray).push(this.addQAS());
    }
  }
  //FUnzione add da inizializzare subito e get per prendere dopo
  public  addQAS(): FormGroup {
     const QASForm = this.fb.group({
       id_qa: ['', Validators.required],
     });
     return QASForm;
  }
  public getQAS(){
    return this.form.controls["QAS"] as FormArray;
  }

  public async readSurvey(id: any){
    this._id = id;

    this.error = "";
    await this.ras.callApi('http://localhost:8080/surveySpringBoot/api/readSurvey?id='+this._id, 'GET', null)
      .then((res) => {
        this.responseQA = res;
        this.questions = new Array<Question>();
        let element: keyof typeof this.responseQA;
        let index = 0;
        //CREO UN OGGETTO BASTO SU QA SURVEY SENZA RIPETIZIONI DI Q
        //PRIMO FOR SU TUTTI I QA RICEVUTI
        for (element in this.responseQA) {
          //Iniziallizzo almeno il primo
          if(index == 0) {
            let tempAnswer = new Answer(this.responseQA[element].answer.id,this.responseQA[element].id,this.responseQA[element].answer.answer);
            let tempAnswers = new Array<Answer>();
            tempAnswers.push(tempAnswer);
            let tempQuestion = new Question(this.responseQA[element].question.id,this.responseQA[element].question.question,tempAnswers);
            this.questions.push(tempQuestion);
            index ++;
          }
       else{
            // Controllo se id_questione è uguale ad almeno una delle
            // question già salvate
            let check = 0 //se 0 è diversa se 1 è uguale ad almeno 1
            let n_question = 0; // sarà segnato su dove iserire la answer
            for (let i = 0; i < this.questions.length; i++) {
              let id_temp = this.responseQA[element].question.question;
              if(id_temp == this.questions[i].question){
                check ++;
                n_question = i;
              }
            }
            //Inserirsco in una domanda esistente se check> 0
            //inserirsco nuova domanda altrimenti
              if(check != 0){
                let tempAnswer = new Answer(this.responseQA[element].answer.id,this.responseQA[element].id,this.responseQA[element].answer.answer);
                this.questions[n_question].pushNew(tempAnswer);
              }
              else {
                let tempAnswer = new Answer(this.responseQA[element].answer.id,this.responseQA[element].id,this.responseQA[element].answer.answer);
                let tempAnswers = new Array<Answer>();
                tempAnswers.push(tempAnswer);
                let tempQuestion = new Question(this.responseQA[element].question.id,this.responseQA[element].question.question,tempAnswers);
                this.questions.push(tempQuestion);
              }
              //FINE SECONDO FOR
          }
          index ++;
          //FINE PIRMO FOR
          }
      }).catch((err) => {
        this.error = "Something went WRONG!!";
        console.log(err);
      });

  }

  public async submitSurvey() {
    this.error = "";
    let sub = new SubSurvey(this.id, this.mail);
    // FACCIO PRIMA IL SUBMIT DI SUBMITTED SUVEY

      await this.ras.callApi('http://localhost:8080/surveySpringBoot/api/submitted-survey', 'POST', sub)
        .then((res) => {
        }).catch((err) => {
          console.log("Qualcosa è andato storto sub_survey");
          console.log(err);
          this.isVisible = 2;
        });
      if(this.isVisible == 2){
        return;
      }
      //FACCIO CHIAMATA PER SAPERE ID SUB_SURVEY APPENA INVIATO
      let url = "http://localhost:8080/surveySpringBoot/api/get-sub-survey?idSurvey=" + this.id + "&idMail=" + this.mail;
      await this.ras.callApi(url, 'GET', null)
        .then((res) => {
          this.id_sub = res.id;

        }).catch((err) => {
          console.log("Qualcosa è andato storto get-sub-sruvey");
          console.log(err);
          this.isVisible = 2;

        });
    if(this.isVisible == 2){
      return;
    }
      // CREO UN ARRAY DI SUBANSWER E POI LO INVIO
      let arrayControl = this.form.get('QAS') as FormArray;
      let arrayQAS = arrayControl.value;
      let element: keyof typeof arrayQAS;
      this.answers = new Array<SubAnswer>();
      for (element in arrayQAS) {
        let newAnsw = new SubAnswer(this.id_sub, arrayQAS[element].id_qa);
        this.answers.push(newAnsw);
      }
      await this.ras.callApi('http://localhost:8080/surveySpringBoot/api/submitted-answers', 'POST', this.answers)
        .then((res) => {
          this.isVisible = 1;
        }).catch((err) => {
          console.log("Qualcosa è andato storto sub_answers");
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
    if (this.is_adm == 0){
      this.router.navigate(
        ['/home-user'],
        navigationExtras
      )
    }
    else if (this.is_adm == 1){
      this.router.navigate(
        ['/home-admin'],
        navigationExtras
      );
    }

  }

}
