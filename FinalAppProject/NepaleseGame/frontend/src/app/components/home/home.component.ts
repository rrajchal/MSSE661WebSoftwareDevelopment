import { Component, OnInit } from '@angular/core';
import { GameService } from './../../games.service';
import { Games } from './../../games';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CommonModule],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  games: Games[] = [];

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.games = this.gameService.getGames();
  }

  viewGame(game: Games): void {
    this.router.navigate(['/game', game.game_id]);
  }
}
