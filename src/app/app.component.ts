import { PlatformService } from './platform-builder/platform.service';
import { Route, Router } from '@angular/router';
import { SidenavService } from './sidenav/sidenav.service';
import { Component } from '@angular/core';
import { environment } from "../environments/environment";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appTitle = environment.appName;
  constructor(
    public sideNavService: SidenavService,
    private _router: Router,
    private _platform: PlatformService,
    private _sidenav: SidenavService ){
    this._router.events.subscribe(path => {
      this._sidenav.hide();
    });
  }
  isActive(url: string): boolean {
    return this._router.isActive(url, true);
  }
}
