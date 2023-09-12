import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";

import { AuthResponseDto } from "../models/authResponseDto";
import { EnvironmentUrlService } from "./environment-url.service";
import { ExternalAuthDto } from "../models/externalAuthDto";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authChangeSub = new Subject<boolean>();
  public authChanged = this.authChangeSub.asObservable();
  private extAuthChangeSub = new Subject<SocialUser>();
  public extAuthChanged = this.extAuthChangeSub.asObservable();
  
  constructor(private http: HttpClient, private externalAuthService: SocialAuthService,
    private envUrl: EnvironmentUrlService, private jwtHelper: JwtHelperService,) { 
      this.externalAuthService.authState.subscribe((user) => {
        console.log(user)
        this.extAuthChangeSub.next(user);
      })
    }

    public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
      this.authChangeSub.next(isAuthenticated);
    }

    public signInWithGoogle = ()=> {
      this.externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
    
    public signOutExternal = () => {
      this.externalAuthService.signOut();
    }

    public externalLogin = (route: string, body: ExternalAuthDto) => {
      return this.http.post<AuthResponseDto>(this.createCompleteRoute(route, this.envUrl.urlAddress), body);
    }

    private createCompleteRoute = (route: string, envAddress: string) => {
      return `${envAddress}/${route}`;
    }

    public logout = () => {
      localStorage.removeItem("token");
      this.sendAuthStateChangeNotification(false);
    }

    public isUserAuthenticated = (): boolean => {
      const token = localStorage.getItem("token");
   
      return token != null && !this.jwtHelper.isTokenExpired(token);
    }
}
