import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('accessToken'));
  private userName = new BehaviorSubject<string>(localStorage.getItem('firstName') || 'User');

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get firstName() {
    return this.userName.asObservable();
  }

  login(accessToken: string, firstName: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('firstName', firstName);
    this.loggedIn.next(true);
    this.userName.next(firstName);
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('firstName');
    this.loggedIn.next(false);
    this.userName.next('User');
  }
}
