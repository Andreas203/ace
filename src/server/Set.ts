import { Vector3 } from "three";
import { Game } from "./Game";
import { Winner } from "./enums/Winner"
import { mode } from "./helper/helpers"

class Set{
    games: [Game]
    currentGame: number

    constructor(){
        this.currentGame = 0
        this.games = [new Game()]
    }

    updateGame(player: number){
        this.getCurrentGame().incPoint(player)
    }

    getCurrentGame(){
        return this.games[this.currentGame]
    }

    getWinner(){
        var winners: Winner[] = []
        this.games.forEach(game => {
            winners.push(game.winner)
        });
        return mode(winners)
    }

    isFinished(){
        return this.getCurrentGame().winner != Winner.None
    }

}

export {Set}