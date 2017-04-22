import { Injectable } from '@angular/core';

@Injectable()
export class SidenavService {
  private _isNavBarActive: boolean = false;
  options: string;
  constructor() { }

  set isNavBarActive(v: boolean) {
    this._isNavBarActive = v;
  }

  get isNavBarActive(): boolean{
    return this._isNavBarActive;
  }

  public show(option?: string): void {
    this.options = option;
    this.isNavBarActive = true;

  }

  public hide(): void {
    this.isNavBarActive = false;
    this.options = '';
  }
}
