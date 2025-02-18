import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private http: HttpClient) { }

  doLogin(event: Event) {
    event.preventDefault();
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    if (!username || !password) {
      this.displayMessage('Username and password are required');
      return;
    }

    this.http.post<any>(`${environment.apiUrl}/auth/login`, { username, password })
      .subscribe({
        next: (res) => {
          if (res.status === 200) {
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            this.router.navigate(['home']);
          } else {
            this.displayMessage('Invalid username or password');
          }
        },
        error: (err) => {
          this.displayMessage('Invalid username or password');
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
