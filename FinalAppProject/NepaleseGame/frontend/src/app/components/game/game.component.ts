import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // <== Added Router
import { GameService } from './../../services/game.service';
import { Games } from './../../games';
import { CommonModule } from '@angular/common';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  imports: [CommonModule]
})
export class GameComponent implements OnInit {
  game: Games | undefined;
  isLoggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getGameDetails();
    this.authService.isLoggedIn.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  getGameDetails(): void {
    const gameId = this.route.snapshot.paramMap.get('gameId');
    if (gameId) {
      this.gameService.getGameById(Number(gameId)).subscribe(
        (game) => {
          this.game = game;
        },
        (error) => {
          console.error('Error loading game details:', error);
        }
      );
    }
  }

  playGame(): void {
    if (!this.isLoggedIn) {
      alert('Login to play');
      return;
    }

    if (this.game) {
      if (this.game.game_name === 'Kras Shunya') {
        this.router.navigate(['/tic-tac-toe']);
      } else {
        alert(`Under construction: ${this.game.game_name}`);
      }
    }
  }
}
