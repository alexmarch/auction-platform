import { Routes } from '@angular/router';
import { AuthGuard } from "./common/auth.guard";
import { IsAuthentificatedGuard } from './common/is-authentificated.guard';
import {
  CreateAccountComponent,
  LoginFormComponent,
  QauctionListComponent,
  PlatformBuilderComponent,
  Page404Component } from './index';

export const routes: Routes = [
  {
    path: 'create-account',
    component: CreateAccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'qauction-list',
    component: QauctionListComponent,
    canActivate: [IsAuthentificatedGuard]
  },
  { path: 'qauction-builder', component: PlatformBuilderComponent, canActivate: [ IsAuthentificatedGuard ] },
  { path: '', redirectTo:'/create-account', pathMatch: 'full' },
  { path: '**', component: Page404Component }
];
