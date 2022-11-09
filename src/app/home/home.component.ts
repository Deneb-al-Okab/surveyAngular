import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {SignUpComponent} from "../sign-up/sign-up.component";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // loggedUser !: { userMail: "mail"; userPass: "pass"; userAdm: "isAdmin"; }
  constructor(public dialog: MatDialog,private router: Router) { }

  ngOnInit(): void {
  }

  openLogin(){
    const config = new MatDialogConfig();

    config.disableClose = true;
    config.id           = "login-component";
    config.height       = "500px";
    config.width        = "650px";
    config.data         = {title: "LOGIN", component: 'login'};

    const dialogRef = this.dialog.open(LoginComponent,config);

    dialogRef.afterClosed().subscribe((result) =>{
      let navigationExtras: NavigationExtras = {
      queryParams: {
        "mail":    result.mail,
        "pass":    result.pass,
        "isAdmin": result.isAdmin,
      },
      skipLocationChange: true
    };
     if (result.isAdmin == 0){
        this.router.navigate(
          ['/home-user'],
          navigationExtras
        )
      }
      else if (result.isAdmin == 1){
        // this.router.navigateByUrl("/home-admin");
        this.router.navigate(
          ['/home-admin'],
          navigationExtras
        );
      }
    });
  }

  openSignUP(){
    const config = new MatDialogConfig();

    config.disableClose = true;
    config.id           = "sign-up-component";
    config.height       = "750px";
    config.width        = "650px";
    config.data         = {title: 'SIGN-UP', component: 'sign-up'};

    const dialogRef = this.dialog.open(SignUpComponent,config);
    dialogRef.afterClosed().subscribe((result) =>{console.log(result);});
  }

}
