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

    this.http.post<any>(`${environment.apiUrl}/auth/register`, { first_name: firstName, last_name: lastName, username, email, password })
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
