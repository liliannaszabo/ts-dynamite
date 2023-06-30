import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {
    makeMove(gamestate: Gamestate): BotSelection {
        let options: BotSelection[] = ['P', 'R', 'S'];
        let index: number =  Math.floor(Math.random() * options.length)
        return options[index];
    }
}

export = new Bot();
