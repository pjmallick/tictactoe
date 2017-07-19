import { TicTacToeMove } from './tictactoe.move';
var tictactoeMove = new TicTacToeMove();

document.querySelectorAll('div.center').forEach(a =>
    a.addEventListener('click', function (event) {
        if (a.textContent.trim().length > 0) {
            return;
        }

        if (tictactoeMove.isGameOver() || tictactoeMove.isWinner()) {
            return;
        }
        let prevMovesCount = tictactoeMove.moves ? tictactoeMove.moves.length : 0;
        tictactoeMove.move(parseInt(a.getAttribute('id')), true);
        let totalMovesCount = tictactoeMove.moves.length;
        let lastMove = totalMovesCount - prevMovesCount == 2 ? tictactoeMove.moves[tictactoeMove.moves.length - 2] : tictactoeMove.moves[tictactoeMove.moves.length - 1];
        a.textContent = lastMove.mark;
        if (totalMovesCount - prevMovesCount == 2) {
            let aiMove = tictactoeMove.moves[tictactoeMove.moves.length - 1];
            document.getElementById(aiMove.index).textContent = aiMove.mark;
        }
        if (tictactoeMove.isGameOver()) {

            document.getElementById('dvGameOver').textContent = 'Game Over !';

        }

        if (tictactoeMove.isWinner()) {
            let lastMove = tictactoeMove.moves[tictactoeMove.moves.length - 1];
            document.getElementById('dvGameOver').textContent = lastMove.mark === 'X' ? 'You won!' : 'You lose!';

        }

    }));

    document.getElementById('btnReset').addEventListener('click', function(){
        tictactoeMove.moves=[];
        tictactoeMove.filledIndex=[];
         document.getElementById('dvGameOver').textContent = '';
         
        document.querySelectorAll('div.center').forEach(a =>{
                  a.textContent='';
        });
   });