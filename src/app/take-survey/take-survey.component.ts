import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RestApiService} from "../services/rest-api.service";
import {Question, QuestionList} from '../objects/QASurvey'
import { Answer } from '../objects/QASurvey'
import * as QueryString from "querystring";
import {coerceStringArray} from "@angular/cdk/coercion";

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.css']
})
export class TakeSurveyComponent implements OnInit {
  public description: string="";
  public id: any;
  public name: string="";
  public _id: any;
  private error: string="";
  public questions: any;
  private responseQA: any;

  constructor(private ras: RestApiService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{

      this.description = params["description"];
      this.id = params["id"];
      this.name = params["name"];

      this.readSurvey(this.id);

    })
  }

  public async readSurvey(id: any){
    this._id = id;
    this._id = 1;
    this.error = "";
    await this.ras.callApi('http://localhost:8080/surveySpringBoot/api/readSurvey?id='+this._id,'GET',null)
      .then((res) => {
        console.log(res);
        this.responseQA = res;
        this.questions = new Array<Question>();
        // this.questions = new QuestionList(moment);
        console.log("RESPONSE =");
        console.log(this.responseQA);
        let element: keyof typeof this.responseQA;
        // let element2: keyof typeof this.questions;
        let index = 0;
        //CREO UN OGGETTO BASTO SU QA SURVEY SENZA RIPETIZIONI DI Q
        //PRIMO FOR SU TUTTI I QA RICEVUTI
        for (element in this.responseQA) {
          //Iniziallizzo almeno il primo
          if(index == 0) {
            console.log("Sono in if==0 ");
            let tempAnswer = new Answer(this.responseQA[element].answer.id,this.responseQA[element].id,this.responseQA[element].answer.answer);
            let tempAnswers = new Array<Answer>();
            tempAnswers.push(tempAnswer);
            console.log(tempAnswers);
            let tempQuestion = new Question(this.responseQA[element].question.id,this.responseQA[element].question.question,tempAnswers);
            console.log(tempQuestion);
            this.questions.push(tempQuestion);
            console.log("Sto loggando this.question");
            console.log(this.questions);
            index ++;
          }
       else{
            console.log("Sono in else n" + index);
            console.log("Lenght = " + this.questions.length);
            // Controllo se id_questione è uguale ad almeno una delle
            // question già salvate
            let check = 0 //se 0 è diversa se 1 è uguale ad almeno 1
            let n_question = 0; // sarà segnato su dove iserire la answer
            for (let i = 0; i < this.questions.length; i++) {
              console.log("Sono for n " + i);
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
            console.log(this.questions);
          }
          index ++;
          //FINE PIRMO FOR
          console.log(this.questions);
          }
      }).catch((err) => {
        this.error = "Something went WRONG!!";
        console.log(err);
      });
  }

}
