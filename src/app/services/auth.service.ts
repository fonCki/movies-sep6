import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // Hardcoded user for mocking purposes
  public user = {
    name: 'User',
    lastName: 'Example',
    email: 'user@example.com',
    password: 'password123'
  };

  isLogged = false; // To track logged-in status

  constructor() { }

  login(email: string, password: string): boolean {
    if (this.user.email === email && this.user.password === password) {
      this.isLogged = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLogged = false;
  }
}
