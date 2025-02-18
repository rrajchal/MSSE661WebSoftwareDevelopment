import { Injectable } from '@angular/core';
import { Games } from './games';
import { sampleGames } from './data';

@Injectable({
  providedIn: 'root'
})

export class GameService {
  private games: Games[] = sampleGames;

  constructor() {}

  // Get all games
  getGames(): Games[] {
    return this.games;
  }

  // Get a game by ID
  getGameById(id: number): Games | undefined {
    return this.games.find(game => game.game_id === id);
  }

  // Add a new game
  addGame(game: Games): void {
    this.games.push(game);
  }

  // Update an existing game
  updateGame(updatedGame: Games): void {
    const index = this.games.findIndex(game => game.game_id === updatedGame.game_id);
    if (index !== -1) {
      this.games[index] = updatedGame;
    }
  }

  // Delete a game by ID
  deleteGame(id: number): void {
    this.games = this.games.filter(game => game.game_id !== id);
  }
}
