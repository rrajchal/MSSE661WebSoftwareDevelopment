import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }

  doLogin(event: Event) {
    event.preventDefault();
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    if (!username || !password) {
      this.displayMessage('Username and password are required');
      return;
    }

    this.http.post<any>(`${environment.apiUrl}/api/auth/login`, { username, password })
      .subscribe({
        next: (res) => {
          if (res.status === 200) {
            this.authService.login(res.accessToken, res.user);
            this.router.navigate(['']);
          } else {
            this.displayMessage('Invalid username or password');
          }
        },
        error: () => {
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
