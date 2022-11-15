import { Component, OnInit } from '@angular/core';
import {RestApiService} from "../services/rest-api.service";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {LoginComponent} from "../login/login.component";
import {MatDialogConfig} from "@angular/material/dialog";
import {MatDialog} from "@angular/material/dialog";
@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {

  public mail: string="";
  private _id: any;
  private _name: any;
  private adm: number=0;

  private start:       number=0;
  private step:        number=3;
  public countToDo:    number=0;
  public countDone:    number=0;
  public error:        string  = "";
  public responseToDo: any;
  public responseDone: any;
  public disabledPrevToDo: boolean=true;
  public disabledNextToDo: boolean=false;
  public disabledPrevDone: boolean=true;
  public disabledNextDone: boolean=false;


  constructor(private router: Router, private ras: RestApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.mail = params["mail"];
    });

    this.getToDoSurveys();
    this.getDoneSurveys();
  }

  public getToDoSurveys( ) {
    let url  = "http://localhost:8080/surveySpringBoot/api/surveysToDo";
    let params = "?start="+this.start+"&step="+this.step+"&mail="+this.mail;
    this.error = "";
    this.ras.callApi(url+params , 'GET',null)
      .then((res) => {
        //console.log(res);
        this.responseToDo = res;
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
      let params = "?start=" + (this.start*this.step) + "&step=" + this.step + "&mail=" + this.mail;
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

    if (this.start >= ((this.countToDo/this.step)-1)){
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
      let params = "?start=" + (this.start*this.step) + "&step=" + this.step + "&mail=" + this.mail;
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


  public getDoneSurveys( ) {
    let url  = "http://localhost:8080/surveySpringBoot/api/surveysDone";
    let params = "?start="+this.start+"&step="+this.step+"&mail="+this.mail;
    this.error = "";
    this.ras.callApi(url+params , 'GET',null)
      .then((res) => {
        console.log(res);
        this.responseDone = res;
      }).catch((err) => {
      this.error = "Something went WRONG!!";
    });
  }

  goToPreviousPageDone() {
    if (this.start<=0){
      this.disabledPrevDone=true;
      this.disabledNextDone=false;
    }
    else {
      this.disabledNextDone=false;
      this.disabledPrevDone=false;
      this.start--;
      let url  = "http://localhost:8080/surveySpringBoot/api/surveysDone";
      let params = "?start=" + (this.start*this.step) + "&step=" + this.step + "&mail=" + this.mail;
      this.ras.callApi(url+params , 'GET',null)
        .then((res) => {
          //console.log(res);
          this.responseDone = res;
        }).catch((err) => {
        this.error = "Something went WRONG!!";
        console.log(err);
      });
    }
  }

  goToNextPageDone() {
    let urlCount  = "http://localhost:8080/surveySpringBoot/api/howManySurveysDone";
    let paramsCount = "?mail=" + this.mail;
    this.ras.callApi(urlCount+paramsCount , 'GET',null)
      .then((res) => {
        //console.log(res);
        this.countDone = res;
      }).catch((err) => {
      this.error = "Something went WRONG!!";
      console.log(err);
    });

    if (this.start >= ((this.countDone/this.step)-1)){
      this.disabledPrevDone=false;
      this.disabledNextDone=true;
    }
    else{
      this.start++;
      this.disabledPrevDone=false;
      this.disabledNextDone=false;
      let url  = "http://localhost:8080/surveySpringBoot/api/surveysDone";
      let params = "?start=" + (this.start*this.step) + "&step=" + this.step + "&mail=" + this.mail;
      this.ras.callApi(url+params , 'GET',null)
        .then((res) => {
          console.log(res);
          this.responseDone = res;
        }).catch((err) => {
        this.error = "Something went WRONG!!";
        console.log(err);
      });
    }
  }

  logout() {
    this.router.navigateByUrl('');
  }


  takeSurvey(id: any, name: any, description: string | string){
    this._id = id;
    this._name = name;
    console.log(this._id);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "id":  this._id,
        "name": this._name,
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

}
