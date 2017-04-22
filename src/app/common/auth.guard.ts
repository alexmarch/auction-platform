import { AwsCognitoService } from './aws-cognito.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return new Promise( ( resolve, reject ) => {
      AwsCognitoService.isAuth((err, jwtToken) => {
        if( !err && jwtToken ) {
          this._router.navigate(['/qauction-list']);
          return reject({
            ngNavigationCancelingError: 'User authentificated error'
          });
        }
        resolve(true);
      });
    });
  }
}
