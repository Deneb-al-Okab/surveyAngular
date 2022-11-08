import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogTemplateComponent} from "../dialog-template/dialog-template.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  adm = {flag : 0};

  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  getCheckBox(){
    let flag = this.adm.flag;
    return flag;
  }

  signUP(flag: number){
    if (flag == 0){
      this.router.navigateByUrl('/home-user');
    }
    else {
      this.router.navigateByUrl('/home-admin');
    }
  }

}
