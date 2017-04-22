import { SidenavService } from '../sidenav/sidenav.service';
import { User } from '../common/user.service';
import { Router } from '@angular/router';
import { AwsCognitoService } from '../common/aws-cognito.service';
import { Component, Input, OnInit } from '@angular/core';
import { QauctionService } from '../qauction-card/qauction.service';
import { ApiService } from '../common/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  authentificated: boolean = false;
  user: User;
  favlist: Array<any> = [];

  constructor(private _awsCognito: AwsCognitoService,
  private _router: Router,
  private _sidenav: SidenavService,
  private _api: ApiService,
  private _qauction: QauctionService ) { }

  ngOnInit() {
    this._awsCognito.getCurrentUser((err, attrs) => {
      if ( !err ) {
        this.user = {
            email: attrs.email,
            gender: attrs.gender,
            username: attrs.nickname
        }
      }
    });

    this._router.events.subscribe( path => {
        this._awsCognito.isAuthenticated((err, jwtToken) => {
          if( !err && jwtToken ) {
            this.authentificated = true;
          } else {
            this.authentificated = false;
          }
        });
    });
  }
  /**
   * Fav list status
   *
   *
   * @memberOf HeaderComponent
   */
  getFavListStatus() {
    let favList = this._qauction.getFavList();
    if ( favList && favList.length > 0 ) {
      this._api.getFavList(favList).subscribe(result => {
        this.favlist = result.qauctionTable;

      })
    }
    console.log(favList);
  }
  /**
   *
   *
   * @param {Event} event
   *
   * @memberOf HeaderComponent
   */
  logoutClick(event: Event) {
    event.preventDefault();
    this._awsCognito.logOut(() => {
      this._router.navigate(['/']);
    });
  }

  showSettingsSideBar($event: Event) {
    $event.preventDefault();
    this._sidenav.show('settings');
  }

}
