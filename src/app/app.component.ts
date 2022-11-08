import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogTemplateComponent } from "./dialog-template/dialog-template.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'surveyAngular';

  constructor(public dialog: MatDialog) { }

  openLogin() {
    const config = new MatDialogConfig();

    config.disableClose = true;
    config.id           = "login-component";
    config.height       = "500px";
    config.width        = "650px";
    config.data         = {title: "LOGIN", component: 'login'};

    const dialogRef = this.dialog.open(DialogTemplateComponent,config);
  }

  openSignUP() {
    const config = new MatDialogConfig();

    config.disableClose = true;
    config.id           = "sign-up-component";
    config.height       = "750px";
    config.width        = "650px";
    config.data         = {title: 'SIGN-UP', component: 'sign-up'};

    const dialogRef = this.dialog.open(DialogTemplateComponent,config);
  }
}


