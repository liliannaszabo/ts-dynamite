import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {
    dynamiteCount: number = 100;
    makeMove(gamestate: Gamestate): BotSelection {
        let options: BotSelection[] = ['P', 'R', 'S', 'D'];

        if(this.dynamiteCount == 0){
            options = ['P', 'R', 'S'];
        }
        let index: number =  Math.floor(Math.random() * options.length)
        let chosenMove = options[index];
        if(chosenMove === 'D'){
            this.dynamiteCount -= 1;
        }
        return chosenMove;
    }
}

export = new Bot();
