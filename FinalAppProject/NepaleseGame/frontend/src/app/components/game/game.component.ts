import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from './../../games.service';
import { Games } from './../../games';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  imports: [CommonModule]
})
export class GameComponent implements OnInit {
  game: Games | undefined;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.getGameDetails();
  }

  getGameDetails(): void {
    const gameId = this.route.snapshot.paramMap.get('gameId');
    if (gameId) {
      this.game = this.gameService.getGameById(Number(gameId));
    }
  }

  playGame(): void {
    if (this.game) {
      alert(`Under construction: ${this.game.game_name}`);
      // TODO need to implement
    }
  }
}
