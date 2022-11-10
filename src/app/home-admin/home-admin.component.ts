import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RestApiService} from "../services/rest-api.service";


@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  public mail: string="";

  constructor(private router: Router, private ras: RestApiService, private route: ActivatedRoute) { }
  public error:           string  = "";
  public response: any;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.mail = params["mail"];
    });

    this.getAllSurveys();
  }


  public async getAllSurveys() {
    this.error = "";

    await this.ras.callApi('http://localhost:8080/surveySpringBoot/api/surveys', 'GET',null)
      .then((res) => {
        console.log(res);
        this.response = res;
      }).catch((err) => {
        this.error = "Something went WRONG!!";
      });
  }

  logout() {
    this.router.navigateByUrl('');
  }

}
