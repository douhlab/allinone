import {Component} from '@angular/core';

type GameType =
  'memory'
  | 'hopper'
  | 'runner'
  | 'typing'
  | 'bug';

@Component({
  selector: 'app-mini-games',
  templateUrl: './mini-games.component.html',
  styleUrl: './mini-games.component.scss'
})
export class MiniGamesComponent {
  selectedGame: GameType = 'memory';

  select(game: GameType): void {
    this.selectedGame = game;
  }
}
