import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../../services/game.service';
import { Games } from '../../../games';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css'],
  imports: [CommonModule, FormsModule]
})
export class AddGameComponent {
  game: Games = {
    game_name: '',
    category: '',
    description: '',
    image_url: '',
    game_rule: '',
    type: ''
  };

  constructor(private gameService: GameService, private router: Router) {}

  addGame(): void {
    // this.gameService.addGame(this.game).subscribe(() => {
    //   this.router.navigate(['/manage-games']);
    // });
  }
}
