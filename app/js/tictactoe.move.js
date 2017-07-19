
export class TicTacToeMove {

    constructor() {
        this.moves = [];
        this.filledIndex= [];
        this.winPositions= winPositions;

    }

    move(index, doAIMove) {
        if (this.moves.length >= 9) {
            return false;
        }
        let lastMove = this.moves[this.moves.length - 1];
        let tictactoeObj = new tictactoe(index,  lastMove && lastMove.mark === "X" ? "O" : "X");


        this.moves.push(tictactoeObj);
        this.updateFilledIndex();
        if(this.isWinner()|| this.isGameOver()){
            return;
        }
        if (doAIMove) {
            this.aimove();
        }
        return true;
    }

    updateFilledIndex() {
        this.filledIndex=[];
        this.moves.forEach(move => {
            this.filledIndex.push(move.index);
        });
    }

    aimove() {
        let lastMove = this.moves[this.moves.length - 1];
        let totalMoved = this.moves.filter(a => a.mark === lastMove.mark).length;

        if (totalMoved == 1) {
            this.randomMove();
        }
        else if (totalMoved > 1) {
            this.offensiveMove(lastMove);
        }
        else if (this.filledIndex.length == 8) {
            let nextMoveIndex = this.getAINextOffensiveMoveIndex();
            this.move(nextMoveIndex);
        }
    }

    offensiveMove(lastMove) {
        let alreadyMoved = false;
        winPositions.forEach(position => {
            let alreadyMarked = 0;
            if(!alreadyMoved){
                position.forEach(index => {
                    alreadyMarked = this.moves.filter(a => a.mark === lastMove.mark && a.index === index).length > 0 ? alreadyMarked + 1 : alreadyMarked;
                    alreadyMarked = alreadyMarked ===2 && this.moves.filter(a => a.mark !== lastMove.mark && a.index === index).length > 0 ? 3 : alreadyMarked;
                });

                if (alreadyMarked == 2) {
                    let nextMoveIndex= this.makeWinningMove();
                    if(nextMoveIndex ===-1){
                       nextMoveIndex = this.getAINextDefensiveMoveIndex(position, lastMove);
                    }
                    if (nextMoveIndex > -1) {
                        this.move(nextMoveIndex);
                        alreadyMoved = true;
                        return;
                    }
                }
            }
        });

        if (!alreadyMoved) {
            let nextMoveIndex = this.getAINextOffensiveMoveIndex();
            this.move(nextMoveIndex);
        }
    }


    getAINextOffensiveMoveIndex() {
        let nextMoveIndex=-1;
        winPositions.forEach(position => {
            if(nextMoveIndex ===-1){
                position.forEach(index => {
                    if (this.filledIndex.filter(a => a === index).length == 0) {
                        nextMoveIndex= index;
                    }
                });
            }
        });

        return nextMoveIndex;
    }

    makeWinningMove(){
       let canWin = false;
       let nextMoveIndex=-1;
        winPositions.forEach(position => {
            if(!canWin){
                 let alreadyMarked = 0;
               let hasEmptySlot = false;
                 nextMoveIndex=-1;
                position.forEach(index => {
                    alreadyMarked = this.moves.filter(a => a.mark === 'O' && a.index === index).length > 0 ? alreadyMarked + 1 : alreadyMarked;
                    hasEmptySlot =  hasEmptySlot || this.filledIndex.filter(a => a === index).length == 0;
                    nextMoveIndex = nextMoveIndex ===-1 && hasEmptySlot? index:nextMoveIndex;
                    
                });

               canWin= alreadyMarked ==2 && hasEmptySlot;
            }
        });
         return canWin?nextMoveIndex:-1;
    }

    getAINextDefensiveMoveIndex(position, lastMove) {
        let notMarkedIndex = -1;
        position.forEach(index => {
            if(notMarkedIndex===-1){
                notMarkedIndex =this.moves.filter(a => a.index === index).length == 0 ? index : -1;
            
                if (notMarkedIndex > -1 && this.filledIndex.filter(a => a == notMarkedIndex).length == 0) {
                    return notMarkedIndex;
                } else {
                    notMarkedIndex = -1;
                }
            }
        });
        return notMarkedIndex;
    }

    randomMove() {
        let lastMove = this.moves[this.moves.length - 1];
        let nextIndex = this.getRandomArbitrary(0, 8);
        nextIndex = lastMove.index == nextIndex ? ((nextIndex - 1) < 0 ? (nextIndex + 1) : (nextIndex - 1)) : nextIndex;
        let tictactoeObj = new tictactoe(nextIndex, lastMove.mark === "X" ? "O" : "X");
        this.moves.push(tictactoeObj);
    }

    getRandomArbitrary(min, max) {
        return parseInt(Math.random() * (max - min) + min);
    }

    isGameOver() {
        if (this.moves.length >= 9) {
            return true;
        }
        return false;
    }

    isWinner() {
        let lastMove = this.moves[this.moves.length - 1];
        let winned = false;

        winPositions.forEach(position => {
            if(!winned){
                let count = 0;
                position.forEach(index => {
                    count = this.moves.filter(a => a.mark === lastMove.mark && a.index === index).length > 0 ? count + 1 : count;
                });

                if (count == 3) {
                    winned= true;
                }
            }
        });
        return winned;
    }
}
 class tictactoe {
    constructor(_index,_mark) {
         this.index=_index;
         this.mark=_mark;
    }
}



 const winPositions = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];