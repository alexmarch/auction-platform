import { Router } from '@angular/router';
import { AwsCognitoService } from './aws-cognito.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IsAuthentificatedGuard implements CanActivate {
  constructor(private _cognito: AwsCognitoService, private _router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      this._cognito.isAuthenticated( (err, token) => {
         if ( err || !token ) {
          this._router.navigate(['/create-account']);
          return reject({
            ngNavigationCancelingError: 'User authentificated error'
          });
        }
        resolve(true);
      });
    });
  }
}
