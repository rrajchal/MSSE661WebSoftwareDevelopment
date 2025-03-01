import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  user$: Observable<any>;

  constructor(private router: Router, private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.user$ = this.authService.user$; 
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      console.log('User data:', user);
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
