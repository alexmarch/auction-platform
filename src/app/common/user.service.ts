import { Injectable } from '@angular/core';

export interface User {
  username?: string,
  email?: string,
  password?: string,
  gender?: string,
  id?: string
}

@Injectable()
export class UserService {
  user: User;
  /**
   *
   *
   * @static
   * @returns {User}
   *
   * @memberOf UserService
   */
  newUser(): User {
    this.user = <User> {
      username: '',
      email: '',
      password: ''
    }
    return this.user;
  }
  /**
   *
   *
   * @static
   * @param {User} user
   *
   * @memberOf UserService
   */
  setUser( user: User ): void {
    Object.assign(this.user, user);
  }
  /**
   *
   *
   * @static
   * @param {string} gender
   *
   * @memberOf UserService
   */
  setGender(gender: string): void {
    this.user.gender = gender;
  }
  /**
   *
   *
   * @returns {User}
   *
   * @memberOf UserService
   */
  getUser(): User {
    return this.user;
  }
  constructor() { }

}
