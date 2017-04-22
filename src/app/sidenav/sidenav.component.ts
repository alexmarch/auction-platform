import { SidenavService } from './sidenav.service';
import { Component, HostBinding, Input, OnChanges, OnInit } from '@angular/core';
import { trigger, style, state, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'] ,
  animations: [
    trigger('toggle', [
      state('1', style({
        opacity: '1',
        width: '40%'
      })),
      state('0', style({
        opacity: '0',
        width: '0'
      })),
      transition('0 => 1', animate('300ms ease-in')),
      transition('* => 0', animate('300ms ease-out'))
    ])
  ]
})
export class SidenavComponent implements OnChanges {
  @Input('toggle') toggleSidebar = false;
  @HostBinding('@toggle') get toggleNav() { return this.toggleSidebar };
  @HostBinding('class.active') classActive = true;

  state: boolean = false;
  constructor(private sideNavService: SidenavService) { }

  ngOnChanges() {
    this.state = this.toggleSidebar; //? 'toggle-show' : 'toggle-hide';
  }

  closeNavBar() {
    this.sideNavService.hide();
  }

}
