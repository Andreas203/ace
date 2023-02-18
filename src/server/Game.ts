import { Vector3 } from "three";
import { Winner } from "./enums/Winner"

class Game{
    points: [number,number]
    winner: Winner = Winner.None;

    constructor(){
        this.points = [0,0]
    }

    incPoint(player: number) {
        
        var winningPlayer: number = this.points[player]
        var losingPlayer: number = this.points[(player+1)%2]

        if( winningPlayer== 40 && losingPlayer < 40){
            this.winner = player
        }
        else if(winningPlayer == 40.5 && losingPlayer == 40){
            this.winner = player
        }
        else if(winningPlayer == 40 && losingPlayer == 40.5){
            this.points[(player+1)%2] -= 0.5;
        }

        else if(winningPlayer == 40 && losingPlayer == 40){
            this.points[player] += 0.5;
        }

        else if(winningPlayer == 30){
            this.points[player] += 10
        }

        else {
            this.points[player] += 15
        }
    }

}

export {Game}