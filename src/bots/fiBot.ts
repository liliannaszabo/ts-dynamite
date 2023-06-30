import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {
    dynamiteCount: number = 100;
    makeMove(gamestate: Gamestate): BotSelection {
        let options: BotSelection[] = ['P', 'R', 'S', 'D'];
        let chosenMove: BotSelection;


        if (this.dynamiteCount == 0) {
            options = ['P', 'R', 'S'];
        }
        if (gamestate.rounds.length > 10) {
            chosenMove = this.getOpposite(this.getMajorityMove(gamestate))
        } else {
            chosenMove = 'D';
        }
        if(chosenMove === 'D'){
            this.dynamiteCount -= 1;
        }
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

    private getMajorityMove(gamestate: Gamestate) {
        let votes: number[] = [0,0,0] // R, P, S
        const voterIndex: number[] = generateVotingArray(gamestate.rounds.length - 2);
        for (const index of voterIndex){
            switch (gamestate.rounds[index].p2){
                case "D":
                    break;
                case "W":
                    break
                case "R":
                    votes[0] += 1;
                    break;
                case "P":
                    votes[1] += 1;
                    break;
                case "S":
                    votes[2] += 1;
                    break;

            }
        }
        let maxValue: number = 0;
        let maxIndexes: number[] = []

        for (let i = 0; i < votes.length; i++) {
            if(votes[i] == maxValue){
                maxIndexes.push(i);
            } else if(votes[i] > maxValue){
                maxIndexes = [i];
                maxValue = votes[i];
            }
        }

        let index: number =  maxIndexes[gamestate.rounds.length % maxIndexes.length];

        function getRPSMoveFromIndex(number: number): BotSelection {
            switch (number){
                case 0: return 'R'
                case 1: return 'P'
                case 2: return 'S'
            }
        }

        return getRPSMoveFromIndex(maxIndexes[index]);



    }
}



function generateVotingArray(limit: number): number[] {
    const voters: number[] = [];

    if (limit >= 1) {
        voters.push(0);
    }

    if (limit >= 2) {
        voters.push(1);
    }

    let current: number = 1;
    let previous: number = 0;

    while (current + previous <= limit) {
        const next: number = current + previous;
        voters.push(next);
        previous = current;
        current = next;
    }

    return voters;
}



export = new Bot();
