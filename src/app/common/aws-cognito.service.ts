import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

declare var AWSCognito : any;
declare var AWS : any;

@Injectable()
export class AwsCognitoService {
  private static _POOL_ID : string = environment.cognito.poolId;
  private static _APP_CLIENT_ID : string = environment.cognito.appClientId;
  /**
   *
   *
   * @static
   * @returns {*}
   *
   * @memberOf AwsCognitoService
   */
  static getAWSCognito() : any {return AWSCognito;}
  /**
   *
   *
   * @static
   * @returns {*}
   *
   * @memberOf AwsCognitoService
   */
  static getUserPool() : any {
    return new AWSCognito
      .CognitoIdentityServiceProvider
      .CognitoUserPool({UserPoolId: this._POOL_ID, ClientId: this._APP_CLIENT_ID});
  }
  /**
   *
   *
   * @static
   * @returns {*}
   *
   * @memberOf AwsCognitoService
   */
  public getCurrentUser(cb?: Function) : any {
    let userPool: any = AwsCognitoService.getUserPool();
    let currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser
        .getSession(function (err, session) {
          if (err) {
            // @TODO: Need check error logic
            console.error(err);
          }
          if ( session.isValid() ) {
            currentUser.getUserAttributes(function(err, attributes: Array<any>) {
                if (err) {
                    cb(err, null);
                } else {
                    let mapAttrs = {};
                    attributes.forEach( v => {
                      mapAttrs[v.getName()] = v.getValue();
                      if ( v.getName() === "sub" ) {
                        mapAttrs['id'] = v.getValue();
                      }
                    });
                    cb(null, mapAttrs);
                }
            });
          }
        });
    }
  }
  /**
   *
   *
   * @static
   * @param {*} data
   * @returns {*}
   *
   * @memberOf AwsCognitoService
   */
   public getDataAttribute(data : any) : any {
    return new AWSCognito
      .CognitoIdentityServiceProvider
      .CognitoUserAttribute(data);
  }
  /**
   *
   *
   * @static
   * @param {string} username
   * @param {string} password
   * @param {*} attrs
   * @param {Function} callback
   *
   * @memberOf AwsCognitoService
   */
  public signUp(username: string, password: string, attrs: Array<any>, cb?: Function): void {
    let userPool = AwsCognitoService.getUserPool();
    userPool.signUp(username, password, attrs, null, function(err, result){
        if (err) {
            cb(err, null);
            return;
        }
        cb(null, result);
    });
  }
  public login(username: string, password: string, cb?: Function): void {
    let userPool = AwsCognitoService.getUserPool();
    let authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails({
      Username: username,
      Password: password
    });
    let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser({
      Username : username,
      Pool : userPool
    });
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
          cb(null, result.getAccessToken().getJwtToken())
        },

        onFailure: function(err) {
           cb(err, null);
        },
    });
  }
  public static isAuth(cb?: Function): void {
    let userPool = AwsCognitoService.getUserPool();
    let currentUser = userPool.getCurrentUser();
    if ( currentUser !== null ) {
      currentUser.getSession(function (err, session) {
        if (err) {
            cb(err, null);
        } else {
          if (session.isValid()) {
            cb(null, session.getIdToken().getJwtToken());
          } else {
            console.log("CognitoUtil: Got the id token, but the session isn't valid");
          }
        }
      });
    } else {
      cb(new Error('User not exist'), null);
    }
  }
  isAuthenticated(cb?: Function): void {
    let userPool = AwsCognitoService.getUserPool();
    let currentUser = userPool.getCurrentUser();
    if ( currentUser !== null ) {
      currentUser.getSession(function (err, session) {
        if (err) {
            cb(err, null);
        } else {
          if (session.isValid()) {
            cb(null, session.getIdToken().getJwtToken());
          } else {
            console.log("CognitoUtil: Got the id token, but the session isn't valid");
          }
        }
      });
    } else {
      cb(new Error('User not exist'), null);
    }
  }
  logOut(cb?: Function): void {
    AwsCognitoService.getUserPool().getCurrentUser().signOut();
    if ( cb ) cb()
  }
  constructor() {}

}
