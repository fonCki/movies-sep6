import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = ''; // Initialize the property to an empty string
  password: string = ''; // Initialize the property to an empty string
  constructor(
    private authService: AuthService,
    private router: Router // Inject Router
    ) { }

  login(): void {
    if (this.authService.login(this.email, this.password)) {
      console.log('Login successful');
      // Navigate to home page if login is successful
      this.router.navigate(['/home']);
    } else {
      alert('Invalid credentials');
    }
  }
}
