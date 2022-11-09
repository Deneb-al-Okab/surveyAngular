import { Component, OnInit } from '@angular/core';
import {RestApiService} from "../services/rest-api.service";

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {

  public error:           string  = "";
  public response: any;

  constructor(private ras: RestApiService) { }

    ngOnInit(): void {
    // this.form = new FormGroup({
    //   // mail: new FormControl('', [Validators.required]),
    //   // pass: new FormControl('', [Validators.required])
    // });
    this.getAllCategories();
  }


  public async getAllCategories() {
    this.error = "";

    await this.ras.callApi('http://localhost:8080/surveySpringBoot/api/surveys', 'GET',null)
      .then((res) => {
        console.log(res);
        this.response = res;
      }).catch((err) => {
        this.error = "Qualcosa è andato storto ";
      });
  }

}
