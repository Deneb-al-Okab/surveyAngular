import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {RestApiService} from "../services/rest-api.service";
import {Question} from '../objects/QASurvey'
import { Answer } from '../objects/QASurvey'
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.css']
})
export class TakeSurveyComponent implements OnInit {
  public form!:           FormGroup;
  public description: string="";
  public id: any;
  public name: string="";
  public _id: any;
  private error: string="";
  public responseQA: any;
  private mail: string="";
  private is_adm!: number;
  public questions: any;

  constructor(private ras: RestApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      id_qa: new FormControl('', [Validators.required]),
    });

    this.route.queryParams.subscribe(params=>{
      this.description = params["description"];
      this.id = params["id"];
      this.name = params["name"];
      this.mail = params["mail"];
      this.is_adm = params["is_admin"];
    })

    this.readSurvey(this.id);
  }

  public async readSurvey(id: any){
    this._id = id;
    this.error = "";
    await this.ras.callApi('http://localhost:8080/surveySpringBoot/api/readSurvey?id='+this._id, 'GET', null)
      .then((res) => {
        this.responseQA = res;
        this.questions = new Array<Question>();
        // this.questions = new QuestionList(moment);
        let element: keyof typeof this.responseQA;
        // let element2: keyof typeof this.questions;
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
        console.log(this.questions);
      }).catch((err) => {
        this.error = "Something went WRONG!!";
        console.log(err);
      });
  }

  public submitSurvey(){
    console.log("dada")
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
