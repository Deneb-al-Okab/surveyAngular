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

  constructor(public dialog: MatDialog, private router: Router, private ras: RestApiService, private route: ActivatedRoute) { }
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


  takeSurvey(id: any, name: any, description: string | string){
    this._id = id;
    this._name = name;
    console.log(this._id);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "id":  this._id,
        "name": this._name,
        "description": description

      },
      skipLocationChange: false
    };
      this.router.navigate(
        ['/take-survey'],
        navigationExtras
      );
  }

}
