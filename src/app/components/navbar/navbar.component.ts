import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}

  get userInitials(): string {
    const names = [this.authService.user.name, this.authService.user.lastName];
    return names.map(name => name[0]).join('');
  }
}
