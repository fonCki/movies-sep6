import { Component } from '@angular/core';

export interface Food {
  value: string;
  viewValue: string;
  img: string;
}


@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css']
})
export class DropdownMenuComponent {
  hideImage = false;
  yourImagePath = 'path-to-your-image.jpg';
}
