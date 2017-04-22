import { UserService } from '../common/user.service';
import { SidenavService } from '../sidenav/sidenav.service';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit, OnChanges {
  @Input('welcomeMessage') message: string = environment.appName;
  genderType: string;
  constructor(private sideNavService: SidenavService, private _userService: UserService) {

  }
  genderClickHandler(genderType: string): void {
    this.genderType = genderType;
    this._userService.setGender(this.genderType);
    this.sideNavService.show();
  }
  ngOnChanges() {
    console.log('ON CHANGES....');
  }

  ngOnInit() {
    this._userService.newUser();
  }

}
