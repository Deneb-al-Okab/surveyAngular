import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RestApiService} from "../services/rest-api.service";

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
  public responseQA: any;

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
    this.error = "";
    await this.ras.callApi('http://localhost:8080/surveySpringBoot/api/readSurvey?id='+this._id,'GET',null)
      .then((res) => {
        console.log(res);
        this.responseQA = res;

      }).catch((err) => {
        this.error = "Something went WRONG!!";
        console.log(this.error);
      });
  }

}
