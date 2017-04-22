import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { CreateAccountComponent } from './create-account/create-account.component';
import { Page404Component } from './page-404/page-404.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavService } from './sidenav/sidenav.service';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { AwsCognitoService } from "./common/aws-cognito.service";
import { UserService } from "./common/user.service";
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthGuard } from "./common/auth.guard";
import { IsAuthentificatedGuard } from './common/is-authentificated.guard';
import { PlatformBuilderComponent } from './platform-builder/platform-builder.component';
import { QauctionCardComponent } from './qauction-card/qauction-card.component';
import { QauctionService } from './qauction-card/qauction.service';
import { QauctionLotsComponent } from './qauction-lots/qauction-lots.component';
import { QauctionListComponent } from './qauction-list/qauction-list.component';
import { SettingsComponent } from './settings/settings.component';
import { PlatformService } from './platform-builder/platform.service';
import { ApiService } from './common/api.service';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateAccountComponent,
    Page404Component,
    SidenavComponent,
    SignupFormComponent,
    LoginFormComponent,
    PlatformBuilderComponent,
    QauctionCardComponent,
    QauctionLotsComponent,
    QauctionListComponent,
    SettingsComponent,
    AboutComponent
  ],
  imports: [
    // BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    ClarityModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    SidenavService,
    AwsCognitoService,
    UserService,
    AuthGuard,
    IsAuthentificatedGuard,
    QauctionService,
    PlatformService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
