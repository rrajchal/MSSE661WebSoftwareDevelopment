import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Games } from './../games';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = `${environment.apiUrl}/api/games`;

  constructor(private http: HttpClient) {}

  getAllGames(): Observable<Games[]> {
    return this.http.get<Games[]>(`${this.apiUrl}`);
  }

  getGameById(gameId: number): Observable<Games> {
    return this.http.get<Games>(`${this.apiUrl}/${gameId}`);
  }

  addGame(game: Games): Observable<any> {
    return this.http.post(`${this.apiUrl}`, game);
  }

  updateGame(gameId: number, game: Games): Observable<any> {
    return this.http.put(`${this.apiUrl}/${gameId}`, game);
  }

  deleteGame(gameId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${gameId}`);
  }
}