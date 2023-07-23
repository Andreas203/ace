import { ConnectedPlayer } from './ConnectedPlayer.ts';
import { Set } from './Set.ts';

export class Match {
  room: number;
  players: ConnectedPlayer[];
  sets: [Set, Set, Set];
  currentSet: number;

  constructor (room: number) {
    this.room = room;
    this.currentSet = 0;
    this.players = [];
    this.sets = [new Set(), new Set(), new Set()];
  }

  addNewPlayer (player: ConnectedPlayer) {
    this.players.push(player);
  }

  removePlayer (playerId: number) {
    this.players.splice(playerId);
  }

  getGameScore () {
    return this.getCurrentSet().getCurrentGame();
  }

  updateGameScore (player: number) {
    this.getCurrentSet().updateGame(player);
    if (this.getCurrentSet().isFinished() && this.currentSet < 2) {
      this.currentSet += 1;
    } else if (this.getCurrentSet().isFinished()) {
      this.getWinner();
    }
  }

  getWinner () {
    this.sets.forEach(set => {
      set.getWinner();
    });
  }

  getCurrentSet () {
    return this.sets[this.currentSet];
  }
}
