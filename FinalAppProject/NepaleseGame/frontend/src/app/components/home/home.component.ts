import { Component, OnInit } from '@angular/core';
import { GameService } from './../../services/game.service';
import { Games } from './../../games';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  games: Games[] = [];

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.gameService.getAllGames().subscribe({
      next: (games) => {
        this.games = games;
      },
      error: (error) => {
        console.error('Error loading games:', error);
      }
    });
  }

  viewGame(game: Games): void {
    this.router.navigate(['/game', game.game_id]);
  }
}
