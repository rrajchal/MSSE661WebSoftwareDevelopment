import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ButtonComponent } from './../common/button/button.component';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ButtonComponent, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  editMode: boolean = false;

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  editProfile(): void {
    this.editMode = true;
  }

  saveProfile(): void {
    this.http.put(`${environment.apiUrl}/api/user/${this.user.user_id}`, this.user).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        this.editMode = false;
      },
      error: (error) => {
        console.error('Error updating profile:', error);
      }
    });
  }
}
