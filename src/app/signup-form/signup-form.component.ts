import { Router } from '@angular/router';
import { AwsCognitoService } from '../common/aws-cognito.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User, UserService } from "../common/user.service";
@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  public signUpForm: FormGroup;
  submitted: boolean = false;
  username: string;
  email: string;
  password: string;
  gender: string;
  errorMessage: string;

  constructor(private _fb: FormBuilder, private _userService: UserService,
    private _awsCognito: AwsCognitoService,
    private _router: Router) {

  }

  ngOnInit() {
    if ( !this._userService.getUser() ) {
      this._userService.newUser();
    }
    let user: User = this._userService.getUser();
    this.gender = user.gender;
    this.signUpForm = this._fb.group({
      username: [user.username, [Validators.required, Validators.minLength(6)] ],
      email: [user.email, [ Validators.required, Validators.email, Validators.pattern(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)] ],
      password: [user.password, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z])[a-zA-Z0-9_+!]{7,}$/), Validators.minLength(7)] ]
    });
  }

  onSubmit(formValue: any, isValid: boolean, event: Event) {
    event.preventDefault();
    this.submitted = true;

    if ( isValid ) {
      this._userService.setUser(formValue);
      let user = this._userService.getUser();
      let attributeList: Array<any> = [];

      attributeList.push(this._awsCognito.getDataAttribute({
        Name: 'email',
        Value: user.email
      }))

      attributeList.push(this._awsCognito.getDataAttribute({
        Name: 'gender',
        Value: user.gender
      }));

      attributeList.push(this._awsCognito.getDataAttribute({
        Name: 'nickname',
        Value: user.username
      }));

      this._awsCognito.signUp(user.username, user.password, attributeList, (err, regUser) => {
        if ( !err ) {
          this._awsCognito.login(user.username, user.password, (err, jwtToken) => {
            if ( err ) {
              this.errorMessage = err.message;
            } else {
              this._router.navigate(['Profile']);
            }
          })
        } else {
          this.errorMessage = err.message;
        }
      });

    }
  }
}
