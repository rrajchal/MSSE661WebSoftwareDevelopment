import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  editMode: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  editProfile(): void {
    this.editMode = true;
  }

  saveProfile(): void {
    // Logic to save the updated profile
    // After saving, you can reset the edit mode
    this.editMode = false;
  }
}
