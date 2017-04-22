import { PlatformService } from '../platform-builder/platform.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  bgColors = ['#002538','#EB8D00', '#62A420', '#318700', '#E1F1F6', '#660092', '#004A70']

  constructor(private _platform: PlatformService) { }

  ngOnInit() {
  }

  selectColor(index: number): void {
    this._platform.setBgColor(this.bgColors[index]);
  }
}
