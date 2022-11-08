import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogTemplateComponent} from "../dialog-template/dialog-template.component";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  adm = {flag:0}

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getCheckBox(){
    let flag = this.adm.flag;
  }

}
