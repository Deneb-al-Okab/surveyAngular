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

  constructor(private ras: RestApiService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{

      this.description = params["description"];
      this.id = params["id"];
      this.name = params["name"];

    })
  }

}
