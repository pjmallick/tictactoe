"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TicTacToeMove = exports.TicTacToeMove = function () {
    function TicTacToeMove() {
        _classCallCheck(this, TicTacToeMove);

        this.moves = [];
        this.filledIndex = [];
        this.winPositions = winPositions;
    }

    _createClass(TicTacToeMove, [{
        key: "move",
        value: function move(index, doAIMove) {
            if (this.moves.length >= 9) {
                return false;
            }
            var lastMove = this.moves[this.moves.length - 1];
            var tictactoeObj = new tictactoe(index, lastMove && lastMove.mark === "X" ? "O" : "X");

            this.moves.push(tictactoeObj);
            this.updateFilledIndex();
            if (this.isWinner() || this.isGameOver()) {
                return;
            }
            if (doAIMove) {
                this.aimove();
            }
            return true;
        }
    }, {
        key: "updateFilledIndex",
        value: function updateFilledIndex() {
            var _this = this;

            this.filledIndex = [];
            this.moves.forEach(function (move) {
                _this.filledIndex.push(move.index);
            });
        }
    }, {
        key: "aimove",
        value: function aimove() {
            var lastMove = this.moves[this.moves.length - 1];
            var totalMoved = this.moves.filter(function (a) {
                return a.mark === lastMove.mark;
            }).length;

            if (totalMoved == 1) {
                this.randomMove();
            } else if (totalMoved > 1) {
                this.offensiveMove(lastMove);
            } else if (this.filledIndex.length == 8) {
                var nextMoveIndex = this.getAINextOffensiveMoveIndex();
                this.move(nextMoveIndex);
            }
        }
    }, {
        key: "offensiveMove",
        value: function offensiveMove(lastMove) {
            var _this2 = this;

            var alreadyMoved = false;
            winPositions.forEach(function (position) {
                var alreadyMarked = 0;
                if (!alreadyMoved) {
                    position.forEach(function (index) {
                        alreadyMarked = _this2.moves.filter(function (a) {
                            return a.mark === lastMove.mark && a.index === index;
                        }).length > 0 ? alreadyMarked + 1 : alreadyMarked;
                        alreadyMarked = alreadyMarked === 2 && _this2.moves.filter(function (a) {
                            return a.mark !== lastMove.mark && a.index === index;
                        }).length > 0 ? 3 : alreadyMarked;
                    });

                    if (alreadyMarked == 2) {
                        var nextMoveIndex = _this2.makeWinningMove();
                        if (nextMoveIndex === -1) {
                            nextMoveIndex = _this2.getAINextDefensiveMoveIndex(position, lastMove);
                        }
                        if (nextMoveIndex > -1) {
                            _this2.move(nextMoveIndex);
                            alreadyMoved = true;
                            return;
                        }
                    }
                }
            });

            if (!alreadyMoved) {
                var nextMoveIndex = this.getAINextOffensiveMoveIndex();
                this.move(nextMoveIndex);
            }
        }
    }, {
        key: "getAINextOffensiveMoveIndex",
        value: function getAINextOffensiveMoveIndex() {
            var _this3 = this;

            var nextMoveIndex = -1;
            winPositions.forEach(function (position) {
                if (nextMoveIndex === -1) {
                    position.forEach(function (index) {
                        if (_this3.filledIndex.filter(function (a) {
                            return a === index;
                        }).length == 0) {
                            nextMoveIndex = index;
                        }
                    });
                }
            });

            return nextMoveIndex;
        }
    }, {
        key: "makeWinningMove",
        value: function makeWinningMove() {
            var _this4 = this;

            var canWin = false;
            var nextMoveIndex = -1;
            winPositions.forEach(function (position) {
                if (!canWin) {
                    var alreadyMarked = 0;
                    var hasEmptySlot = false;
                    nextMoveIndex = -1;
                    position.forEach(function (index) {
                        alreadyMarked = _this4.moves.filter(function (a) {
                            return a.mark === 'O' && a.index === index;
                        }).length > 0 ? alreadyMarked + 1 : alreadyMarked;
                        hasEmptySlot = hasEmptySlot || _this4.filledIndex.filter(function (a) {
                            return a === index;
                        }).length == 0;
                        nextMoveIndex = nextMoveIndex === -1 && hasEmptySlot ? index : nextMoveIndex;
                    });

                    canWin = alreadyMarked == 2 && hasEmptySlot;
                }
            });
            return canWin ? nextMoveIndex : -1;
        }
    }, {
        key: "getAINextDefensiveMoveIndex",
        value: function getAINextDefensiveMoveIndex(position, lastMove) {
            var _this5 = this;

            var notMarkedIndex = -1;
            position.forEach(function (index) {
                if (notMarkedIndex === -1) {
                    notMarkedIndex = _this5.moves.filter(function (a) {
                        return a.index === index;
                    }).length == 0 ? index : -1;

                    if (notMarkedIndex > -1 && _this5.filledIndex.filter(function (a) {
                        return a == notMarkedIndex;
                    }).length == 0) {
                        return notMarkedIndex;
                    } else {
                        notMarkedIndex = -1;
                    }
                }
            });
            return notMarkedIndex;
        }
    }, {
        key: "randomMove",
        value: function randomMove() {
            var lastMove = this.moves[this.moves.length - 1];
            var nextIndex = this.getRandomArbitrary(0, 8);
            nextIndex = lastMove.index == nextIndex ? nextIndex - 1 < 0 ? nextIndex + 1 : nextIndex - 1 : nextIndex;
            var tictactoeObj = new tictactoe(nextIndex, lastMove.mark === "X" ? "O" : "X");
            this.moves.push(tictactoeObj);
        }
    }, {
        key: "getRandomArbitrary",
        value: function getRandomArbitrary(min, max) {
            return parseInt(Math.random() * (max - min) + min);
        }
    }, {
        key: "isGameOver",
        value: function isGameOver() {
            if (this.moves.length >= 9) {
                return true;
            }
            return false;
        }
    }, {
        key: "isWinner",
        value: function isWinner() {
            var _this6 = this;

            var lastMove = this.moves[this.moves.length - 1];
            var winned = false;

            winPositions.forEach(function (position) {
                if (!winned) {
                    var count = 0;
                    position.forEach(function (index) {
                        count = _this6.moves.filter(function (a) {
                            return a.mark === lastMove.mark && a.index === index;
                        }).length > 0 ? count + 1 : count;
                    });

                    if (count == 3) {
                        winned = true;
                    }
                }
            });
            return winned;
        }
    }]);

    return TicTacToeMove;
}();

var tictactoe = function tictactoe(_index, _mark) {
    _classCallCheck(this, tictactoe);

    this.index = _index;
    this.mark = _mark;
};

var winPositions = [[0, 1, 2], [0, 3, 6], [2, 5, 8], [1, 4, 7], [0, 4, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]];