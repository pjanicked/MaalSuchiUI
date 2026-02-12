import { GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { JwtModule } from "@auth0/angular-jwt";
import { LoginComponent } from './login/login.component';
import { MenubarModule } from 'primeng/menubar';
import { NgModule } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { RouterModule } from '@angular/router';
import { StoreItemComponent } from './store-item/store-item.component';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { VendorComponent } from './vendor/vendor.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [				  
    AppComponent,
    LoginComponent,
    StoreItemComponent,
    VendorComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GoogleSigninButtonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: []
      }
    }),
    AppRoutingModule,
    SocialLoginModule,
    PanelModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    DialogModule,
    MenubarModule,
    TableModule,
    ToolbarModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'store', component: StoreItemComponent },
      { path: 'vendor', component: VendorComponent },
    ])
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '142655416314-vtfvgrbl8iadi77aq8gbv1175r4j7dhr.apps.googleusercontent.com', {
                scopes: 'email'
              }
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
