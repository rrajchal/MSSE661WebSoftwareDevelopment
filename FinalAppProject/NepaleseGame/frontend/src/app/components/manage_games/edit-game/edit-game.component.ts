import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../../services/game.service';
import { Games } from '../../../games';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css'],
  imports: [CommonModule, FormsModule]
})
export class EditGameComponent implements OnInit {
  game: Games | undefined;
  gameId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.gameId = Number(params.get('gameId'));
      if (this.gameId) {
        this.getGameDetails(this.gameId);
      }
    });
  }

  getGameDetails(gameId: number): void {
    // this.gameService.getGameById(gameId).subscribe(game => {
    //   this.game = game;
    // });
  }

  updateGame(): void {
    if (this.game && this.gameId) {
      // this.gameService.updateGame(this.gameId, this.game).subscribe(() => {
      //   this.router.navigate(['/manage-games']);
      // });
    }
  }
}
