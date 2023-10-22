import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = '';  // Initialize the property to an empty string
  email: string = ''; // Initialize the property to an empty string
  password: string = ''; // Initialize the property to an empty string
  confirmPassword: string = ''; // Initialize the property to an empty string

  constructor() { }

  // Your component methods go here
}
