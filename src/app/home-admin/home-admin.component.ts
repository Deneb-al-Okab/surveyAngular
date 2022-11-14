import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {RestApiService} from "../services/rest-api.service";


@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  public mail:         string="";

  private adm:         number=1;
  private start:       number=0;
  private stepToDo:    number=3;
  private stepDone:    number=3;
  private stepCreated:    number=3;
  public countToDo:    number=0;
  public countDone:    number=0;
  public countCreated: number=0;
  public error:        string  = "";
  public responseToDo!: any;
  public responseDone!: any;
  public responseCreated!: any;
  public disabledPrevToDo: boolean=true;
  public disabledNextToDo: boolean=false;
  public disabledPrevDone: boolean=true;
  public disabledNextDone: boolean=false;
  public disabledPrevCreated: boolean=true;
  public disabledNextCreated: boolean=false;
  public columnNames!: string[];




  constructor(private router: Router, private ras: RestApiService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.mail = params["mail"];
    });

    this.getToDoSurveys();
    this.getDoneSurveys();
    this.getCreatedSurveys();
  }

  ///////////////////////////////GET SURVEYS TO DO WITH PAGINATION////////////////////////////////////////
  public getToDoSurveys( ) {

    let url  = "http://localhost:8080/surveySpringBoot/api/surveysToDo";
    let params = "?start="+this.start+"&step="+this.stepToDo+"&mail="+this.mail;
    console.log(this.start);
    this.ras.callApi(url+params , 'GET',null)
      .then((res) => {
        this.responseToDo = res;
        //this.columnNames = Object.keys(this.responseToDo[0]);
        //console.log(this.columnNames)
      }).catch((err) => {
      this.error = "Something went WRONG!!";
    });
  }

  public async goToPreviousPageToDo() {
    console.log(this.start);
    if (this.start<=0){
      console.log(this.start);
      this.disabledPrevToDo=true;
      this.disabledNextToDo=false;
    }
    else {
      this.start--;
      this.disabledNextToDo=false;
      this.disabledPrevToDo=false;
      console.log(this.start);
      let url  = "http://localhost:8080/surveySpringBoot/api/surveysToDo";
      let params = "?start=" + (this.start*this.stepToDo) + "&step=" + this.stepToDo + "&mail=" + this.mail;
      await this.ras.callApi(url+params , 'GET',null)
        .then((res) => {
          this.responseToDo = res;
        }).catch((err) => {
        this.error = "Something went WRONG previous page to do!!";
        console.log(this.error);
        console.log(err);
      });
    }
  }

  public async goToNextPageToDo() {
    console.log(this.start);
    let urlCount  = "http://localhost:8080/surveySpringBoot/api/howManySurveysToDo";
    let paramsCount = "?mail=" + this.mail;
    await this.ras.callApi(urlCount+paramsCount , 'GET',null)
      .then((res) => {
        this.countToDo = res;
      }).catch((err) => {
      this.error = "Something went WRONG!!";
      console.log(err);
    });

    if (this.start >= ((this.countToDo/this.stepToDo)-1)){
      console.log(this.start);
      this.disabledPrevToDo=false;
      this.disabledNextToDo=true;
    }
    else{
      this.start++;
      console.log(this.start);
      this.disabledPrevToDo=false;
      this.disabledNextToDo=false;
      let url  = "http://localhost:8080/surveySpringBoot/api/surveysToDo";
      let params = "?start=" + (this.start*this.stepToDo) + "&step=" + this.stepToDo + "&mail=" + this.mail;
      this.error = "";
      await this.ras.callApi(url+params , 'GET',null)
        .then((res) => {
          //console.log(res);
          this.responseToDo = res;
        }).catch((err) => {
        this.error = "Something went WRONG!!";
        console.log(err);
      });
    }
  }

  ///////////////////////////////GET SURVEYS DONE WITH PAGINATION////////////////////////////////////////
  public getDoneSurveys( ) {
    let url  = "http://localhost:8080/surveySpringBoot/api/surveysDone";
    let params = "?start="+this.start+"&step="+this.stepDone+"&mail="+this.mail;
    this.ras.callApi(url+params , 'GET',null)
      .then((res) => {
        console.log(res);
        this.responseDone = res;
      }).catch((err) => {
      this.error = "Something went WRONG!!";
    });
  }

  public async goToPreviousPageDone() {
    if (this.start<=0){
      this.disabledPrevDone=true;
      this.disabledNextDone=false;
    }
    else {
      this.disabledNextDone=false;
      this.disabledPrevDone=false;
      this.start--;
      let url  = "http://localhost:8080/surveySpringBoot/api/SurveysDone";
      let params = "?start=" + (this.start*this.stepDone) + "&step=" + this.stepDone + "&mail=" + this.mail;
      await this.ras.callApi(url+params , 'GET',null)
        .then((res) => {
          //console.log(res);
          this.responseDone = res;
        }).catch((err) => {
        this.error = "Something went WRONG!!";
        console.log(err);
      });
    }
  }

  public async goToNextPageDone() {
    let urlCount  = "http://localhost:8080/surveySpringBoot/api/howManySurveysDone";
    let paramsCount = "?mail=" + this.mail;
    await this.ras.callApi(urlCount+paramsCount , 'GET',null)
      .then((res) => {
        //console.log(res);
        this.countDone = res;
      }).catch((err) => {
      this.error = "Something went WRONG!!";
      console.log(err);
    });

    if (this.start >= ((this.countDone/this.stepDone)-1)){
      this.disabledPrevDone=false;
      this.disabledNextDone=true;
    }
    else{
      this.start++;
      this.disabledPrevDone=false;
      this.disabledNextDone=false;
      let url  = "http://localhost:8080/surveySpringBoot/api/surveysToDo";
      let params = "?start=" + (this.start*this.stepDone) + "&step=" + this.stepDone + "&mail=" + this.mail;
      await this.ras.callApi(url+params , 'GET',null)
        .then((res) => {
          console.log(res);
          this.responseToDo = res;
        }).catch((err) => {
        this.error = "Something went WRONG!!";
        console.log(err);
      });
    }
  }


///////////////////////////////////GET SURVEYS CREATED////////////////////////////////////////////
  public getCreatedSurveys( ) {

    let url  = "http://localhost:8080/surveySpringBoot/api/surveysCreated";
    let params = "?start="+this.start+"&step="+this.stepCreated+"&mail="+this.mail;
    this.ras.callApi(url+params , 'GET',null)
      .then((res) => {
        this.responseCreated = res;
      }).catch((err) => {
      this.error = "Something went WRONG!!";
    });
  }


  public async goToPreviousPageCreated() {
    if (this.start<=0){
      this.disabledPrevCreated=true;
      this.disabledNextCreated=false;
    }
    else {
      this.disabledNextCreated=false;
      this.disabledPrevCreated=false;
      this.start--;
      let url  = "http://localhost:8080/surveySpringBoot/api/SurveysCreated";
      let params = "?start=" + (this.start*this.stepCreated) + "&step=" + this.stepCreated + "&mail=" + this.mail;
      await this.ras.callApi(url+params , 'GET',null)
        .then((res) => {
          //console.log(res);
          this.responseCreated = res;
        }).catch((err) => {
        this.error = "Something went WRONG!!";
        console.log(err);
      });
    }

  }

  public async goToNextPageCreated() {
    let urlCount  = "http://localhost:8080/surveySpringBoot/api/howManySurveysCreated";
    let paramsCount = "?mail=" + this.mail;
    await this.ras.callApi(urlCount+paramsCount , 'GET',null)
      .then((res) => {
        //console.log(res);
        this.countCreated = res;
      }).catch((err) => {
      this.error = "Something went WRONG!!";
      console.log(err);
    });

    if (this.start >= ((this.countCreated/this.stepCreated)-1)){
      this.disabledPrevCreated=false;
      this.disabledNextCreated=true;
    }
    else{
      this.start++;
      this.disabledPrevCreated=false;
      this.disabledNextCreated=false;
      let url  = "http://localhost:8080/surveySpringBoot/api/surveysCreated";
      let params = "?start=" + (this.start*this.stepCreated) + "&step=" + this.stepCreated + "&mail=" + this.mail;
      await this.ras.callApi(url+params , 'GET',null)
        .then((res) => {
          console.log(res);
          this.responseCreated = res;
        }).catch((err) => {
        this.error = "Something went WRONG!!";
        console.log(err);
      });
    }

  }

///////////////////////////////GO TO THE SURVEY////////////////////////////////////////
  takeSurvey(id: number, name: string, description: string | string){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "id":  id,
        "name": name,
        "description": description,
        "mail": this.mail,
        "is_admin": this.adm
      },
      skipLocationChange: false
    };
    this.router.navigate(
      ['/take-survey'],
      navigationExtras
    );
  }

///////////////////////////////GO TO CREATE SURVEY////////////////////////////////////////
  createSurvey(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "mail":  this.mail,

      },
      skipLocationChange: false
    };
    this.router.navigate(
      ['/create-survey'],
      navigationExtras
    );

  }

//////////////////LOGOUT//////////////////////////////////////////
  logout() {
    this.router.navigateByUrl('');
  }

///////////////////////////// STATS ////////////////////////////////////////////////////
  goToStats(id: number, name: string, description: string | string) {
    console.log(id + ": " + name);
    console.log("belle stats bro");
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "id": id,
        "name": name,
        "description": description,
        "mail":  this.mail,
      },
      skipLocationChange: false
    };
    this.router.navigate(
      ['/survey-stats'],
      navigationExtras
    );
  }


}
