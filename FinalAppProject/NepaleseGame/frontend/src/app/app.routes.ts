import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { GameComponent } from './components/game/game.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ManageGamesComponent } from './components/manage_games/manage-games/manage-games.component';
import { AddGameComponent } from './components/manage_games/add-game/add-game.component';
import { EditGameComponent } from './components/manage_games/edit-game/edit-game.component';
import { TicTacToeComponent } from './components/games/tic-tac-toe/tic-tac-toe.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'game/:gameId', component: GameComponent },
  { path: 'manage-games', component: ManageGamesComponent },
  { path: 'add-game', component: AddGameComponent },
  { path: 'update-game/:gameId', component: EditGameComponent },
  { path: 'tic-tac-toe', component: TicTacToeComponent },
];
