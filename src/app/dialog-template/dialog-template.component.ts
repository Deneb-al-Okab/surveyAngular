import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dialog-template',
  templateUrl: './dialog-template.component.html',
  styleUrls: ['./dialog-template.component.css']
})
export class DialogTemplateComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    title: string
    component: string
  }, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    //logiche di business
    this.router.navigateByUrl('/home-user');
  }

  signUP(){
    //logiche di business

  }

}
