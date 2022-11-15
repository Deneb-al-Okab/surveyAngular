import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {RestApiService} from "../services/rest-api.service";

@Component({
  selector: 'app-survey-stats',
  templateUrl: './survey-stats.component.html',
  styleUrls: ['./survey-stats.component.css']
})
export class SurveyStatsComponent implements OnInit {
  private id_survey!: number;
  public name: string="";
  public description: string="";
  public mail: string="";
  public stats!: any;
  public error: string = "";
  public count: number=0;

  constructor(private router: Router, private ras: RestApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.id_survey = params["id"];
      this.name = params["name"];
      this.description = params["description"];
      this.mail = params["mail"];
      this.getHowMany()
      //this.getStats();

    });
  }

  public async getHowMany(){
    let url  = "http://localhost:8080/surveySpringBoot/api/howManyResp";
    let params = "?id_survey="+this.id_survey;
    await this.ras.callApi(url+params , 'GET',null)
      .then((res) => {
        this.count = res;
      }).catch((err) => {
        this.error = "Something went WRONG!!";
        console.log(err);
      });
  }

  public async getStats(){
    let url  = "http://localhost:8080/surveySpringBoot/api/getStats?";
    let params = "id_survey="+this.id_survey;
    await this.ras.callApi(url+params , 'GET',null)
      .then((res) => {
        this.stats = res;
      }).catch((err) => {
      this.error = "Something went WRONG!!";
      console.log(err);
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
