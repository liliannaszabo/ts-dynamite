import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {
    dynamiteCount: number = 100;
    goodNumberCounter: number = 2;

    makeMove(gamestate: Gamestate): BotSelection {
        let options: BotSelection[] = ['P', 'R', 'S', 'D'];
        let chosenMove: BotSelection;

        if (this.dynamiteCount == 0) {
            options = ['P', 'R', 'S'];
        }
        if (this.isDynamiteRound(gamestate.rounds.length)) {
            chosenMove = 'D';
        } else {
            if (gamestate.rounds.length > 1) {
                chosenMove = this.getOpposite(this.getMajorityMove(gamestate))
            } else {
                chosenMove = options[gamestate.rounds.length % 3];
            }
        }
        if (chosenMove === 'D') {
            this.dynamiteCount -= 1;
        }
        return chosenMove;
    }


    private getOpposite(move: BotSelection): BotSelection {
        switch (move) {
            case 'R':
                return 'P'
            case 'S':
                return 'R'
            case 'P':
                return 'S'
            default:
                return 'R'
        }

    }

    private getMajorityMove(gamestate: Gamestate) {
        let votes: number[] = [0, 0, 0] // R, P, S

        for (let index = 0; index < gamestate.rounds.length; index++) {
            switch (gamestate.rounds[index].p2) {
                case "D":
                    break;
                case "W":
                    break
                case "R":
                    votes[0] += votes[0];
                    break;
                case "P":
                    votes[1] += votes[1];
                    break;
                case "S":
                    votes[2] += votes[2];
                    break;

            }
        }
        let maxValue: number = 0;
        let maxIndexes: number[] = []

        for (let i = 0; i < votes.length; i++) {
            if (votes[i] == maxValue) {
                maxIndexes.push(i);
            } else if (votes[i] > maxValue) {
                maxIndexes = [i];
                maxValue = votes[i];
            }
        }

        let index: number = gamestate.rounds.length % 3

        function getRPSMoveFromIndex(number: number): BotSelection {
            switch (number) {
                case 0:
                    return 'R'
                case 1:
                    return 'P'
                case 2:
                    return 'S'
            }
        }

        return getRPSMoveFromIndex(maxIndexes[index]);


    }


    private isDynamiteRound(round): boolean {
        if (this.dynamiteCount == 0) {
            return false;
        }
        if (!this.isGoodNumber(round)) {
            return false;
        }
        this.goodNumberCounter -= 1;
        if (Math.floor(this.goodNumberCounter) == 0) {
            this.goodNumberCounter += 2.5;
            return true;
        }
        return false


    }


    function

    isGoodNumber(num: number): boolean {
        if (num <= 1) {
            return false;
        }

        for (let i: number = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                return false;
            }
        }

        return true;
    }

}

    export = new Bot();
