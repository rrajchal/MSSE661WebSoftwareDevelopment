import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private router: Router, private http: HttpClient) { }

  doRegister(event: Event) {
    event.preventDefault();
    const firstName = (document.getElementById('first-name') as HTMLInputElement).value;
    const lastName = (document.getElementById('last-name') as HTMLInputElement).value;
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    if (!firstName || !lastName || !username || !email || !password) {
      this.displayMessage('All fields are required');
      return;
    }

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      this.displayMessage('Invalid email format');
      return;
    }

    // Check if username already exists
    this.http.get<any>(`${environment.apiUrl}/api/user/username/${username}`)
      .subscribe({
        next: (res) => {
          this.displayMessage('Username already exists');
        },
        error: (err) => {
          if (err.status === 404) {
            // Username does not exist, proceed with registration
            this.registerUser(firstName, lastName, username, email, password);
          } else {
            this.displayMessage('Error checking username');
          }
        }
      });
  }

  registerUser(firstName: string, lastName: string, username: string, email: string, password: string) {
    this.http.post<any>(`${environment.apiUrl}/api/auth/register`, { first_name: firstName, last_name: lastName, username, email, password })
      .subscribe({
        next: (res) => {
          if (res.status === 201) {
            this.displayMessage('Registration successful');
            this.router.navigate(['login']);
          } else {
            this.displayMessage('Registration failed');
          }
        },
        error: (err) => {
          this.displayMessage('Registration failed');
        }
      });
  }

  displayMessage(message: string) {
    const messageElement = document.getElementById('message');
    if (messageElement) {
      messageElement.textContent = message;
      messageElement.style.display = 'block';
    }
  }
}
