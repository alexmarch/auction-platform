import { Router } from '@angular/router';
import { AwsCognitoService } from '../common/aws-cognito.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

//declare let Location: any;

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  submitted: boolean = false;
  loginForm: FormGroup;
  errorMessage: string;
  constructor(private _fb: FormBuilder, private _cognito: AwsCognitoService, private _router: Router) { }

  ngOnInit() {
    this.loginForm = this._fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z])[a-zA-Z0-9_+!]{7,}$/), Validators.minLength(7)] ]
    });
  }

  onSubmit(formValue: any, isValid: boolean, $event: Event) {
    $event.preventDefault();
    this.submitted = true;
    if (isValid) {
      this._cognito.login(formValue.username, formValue.password, (err, res)=>{
        if ( err ) {
          this.errorMessage = err.message;
        } else {
          this._router.navigate(['/'],{skipLocationChange: true});
        }
      })
    }
  }

}
