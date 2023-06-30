import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {
    dynamiteCount: number = 100;
    roundCount: number = 1;
    goodNumberCounter: number = 2.5;
    offsetOptions: number[];

    constructor() {
        this.offsetOptions = [ 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]

    }
    makeMove(gamestate: Gamestate): BotSelection {

        let offset: number = this.offsetOptions[gamestate.rounds.length % this.offsetOptions.length ]

        let options: BotSelection[] = ['P', 'R', 'S'];
        let chosenMove: BotSelection;
        if(this.isDynamiteRound()){
            chosenMove = 'D'
        }else {
            let length: number = gamestate.rounds.length;
            if(length > offset
                && gamestate.rounds[length-offset].p2 != 'D'
                && gamestate.rounds[length-offset].p2 != 'W'){
                chosenMove = this.getOpposite(gamestate.rounds[length-offset].p2)
            }else{
                chosenMove = options[gamestate.rounds.length % 3];
            }
        }
        if(chosenMove === 'D'){
            this.dynamiteCount -= 1;
        }
        this.roundCount += 1;
        return chosenMove;
    }

    private getOpposite(move: BotSelection):BotSelection {
        switch (move){
            case 'R': return 'P'
            case 'S': return 'R'
            case 'P': return 'S'
            default: return 'R'
        }

    }

    private isDynamiteRound():boolean {
        if(this.dynamiteCount == 0){
            return false;
        }
        if(!isGoodNumber(this.roundCount)){
            return false;
        }
        this.goodNumberCounter -= 1;
        if(Math.floor(this.goodNumberCounter) == 0){
            this.goodNumberCounter += 2.5;
            return true;
        }
        return false



    }
}

function isGoodNumber(num: number): boolean {
    if (num <= 1) {
        return false;
    }

    for (let i: number = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }

    return true; // num is prime
}

export = new Bot();
