import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('accessToken'));
  private user = new BehaviorSubject<any>(this.getUserFromLocalStorage());

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get user$() {
    return this.user.asObservable();
  }

  login(accessToken: string, user: any) {
    if (!user) {
      console.error('User object is undefined');
      return;
    }

    localStorage.setItem('accessToken', accessToken);
    try {
      localStorage.setItem('user', JSON.stringify(user));
      console.log('User stored in local storage:', user); // Log user data stored in local storage
    } catch (e) {
      console.error('Error saving user to local storage', e);
    }
    this.loggedIn.next(true);
    this.user.next(user);
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.user.next(null);
  }

  private getUserFromLocalStorage() {
    try {
      const user = localStorage.getItem('user');
      if (!user) {
        // If user is not present, set it to an empty object to avoid parsing error
        localStorage.setItem('user', JSON.stringify({}));
        return {};
      }
      const parsedUser = JSON.parse(user);
      console.log('User retrieved from local storage:', parsedUser); // Log user data retrieved from local storage
      return parsedUser;
    } catch (e) {
      console.error('Error parsing user from local storage', e);
      return {};
    }
  }
}
