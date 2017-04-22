import { Injectable } from '@angular/core';

@Injectable()
export class PlatformService {

  public setBgColor(color: string): void {
    localStorage.setItem('platform:bgcolor', color);
  }
  get bgColor(): string {
    return localStorage.getItem('platform:bgcolor') || '#e1f1f6';
  }
  constructor() { }

}
