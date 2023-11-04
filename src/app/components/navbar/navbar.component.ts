import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn = false;
  userPhoto: string | null = null;

  constructor(public authService: AuthService) {
    this.authService.user.subscribe(user => {
      this.isLoggedIn = !!user;
      if (user) {
        this.userPhoto = user.photoURL;
      }
    });
  }

  get userInitials(): string {
    const user = this.authService.getCurrentUser();
    if (user) {
      return user.displayName?.split(' ').map(name => name[0].toUpperCase()).join('') || '';
    }
    return '';
  }
}
