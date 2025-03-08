import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Games } from '../../../games';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './../../common/button/button.component';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css'],
  imports: [ButtonComponent, CommonModule, FormsModule]
})
export class AddGameComponent {
  newGame: Games = new Games(
    0,
    '',
    '',
    '',
    '',
    '',
    '',
    new Date(),
    new Date()
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  addGame(): void {
    this.http.post(`${environment.apiUrl}/api/games`, this.newGame).subscribe({
      next: () => {
        this.router.navigate(['/manage-games']);
      },
      error: (error) => {
        console.error('Error adding game:', error);
      }
    });
  }
}
