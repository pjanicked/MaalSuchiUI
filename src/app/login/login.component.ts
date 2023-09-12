import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { ExternalAuthDto } from '../models/externalAuthDto';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private returnUrl!: string;
  errorMessage: string = '';
  showError!: boolean;
  dialogVisible!: boolean;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.authService.extAuthChanged.subscribe( user => {
      console.log('Check user ' + user);
      const externalAuth: ExternalAuthDto = {
        provider: user.provider,  
        idToken: user.idToken
      }
      this.validateExternalAuth(externalAuth);
    })
  }

  showDialog() {
    this.dialogVisible = true;
  }

  externalLogin = () => {
    this.showError = false;
    //alert("LOggedIN");
    //this.authService.signInWithGoogle();

    // this.authService.extAuthChanged.subscribe( user => {
    //   console.log('Check user ' + user);
    //   const externalAuth: ExternalAuthDto = {
    //     provider: user.provider,  
    //     idToken: user.idToken
    //   }
    //   this.validateExternalAuth(externalAuth);
    // })
  }

  private validateExternalAuth(externalAuth: ExternalAuthDto) {
    this.authService.externalLogin('api/accounts/externallogin', externalAuth)
      .subscribe({
        next: (res: any) => {
            localStorage.setItem("token", res.token);
            this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
            this.router.navigate([this.returnUrl]);
      },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.message;
          this.showError = true;
          this.authService.signOutExternal();
        }
      });
  }
}
