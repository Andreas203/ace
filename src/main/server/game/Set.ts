import { Game } from './Game.ts';
import { Winner } from '../enums/Winner.ts';
import { mode } from '../helper/helpers.ts';

export class Set {
  games: [Game];
  currentGame: number;

  constructor () {
    this.currentGame = 0;
    this.games = [new Game()];
  }

  updateGame (player: number) {
    this.getCurrentGame().incPoint(player);
  }

  getCurrentGame () {
    return this.games[this.currentGame];
  }

  getWinner () {
    const winners: Winner[] = [];
    this.games.forEach(game => {
      winners.push(game.winner);
    });
    return mode(winners);
  }

  isFinished () {
    return this.getCurrentGame().winner !== Winner.None;
  }
}
