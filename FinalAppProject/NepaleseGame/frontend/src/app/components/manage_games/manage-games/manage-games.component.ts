import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../../services/game.service';
import { Games } from '../../../games';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './../../common/button/button.component'

@Component({
  selector: 'app-manage-games',
  templateUrl: './manage-games.component.html',
  styleUrls: ['./manage-games.component.css'],
  imports: [CommonModule, FormsModule, ButtonComponent]
})
export class ManageGamesComponent implements OnInit {
  games: Games[] = [];

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.gameService.getAllGames().subscribe(games => {
      this.games = games;
    });
  }

  editGame(gameId: number): void {
    this.router.navigate([`/update-game`, gameId]);
  }

  deleteGame(gameId: number): void {
    if (gameId !== undefined) {
      this.gameService.deleteGame(gameId).subscribe(() => {
        this.games = this.games.filter(game => game.game_id !== gameId);
      });
    }
  }

  navigateToAddGame(): void {
    this.router.navigate(['/add-game']);
  }
}
