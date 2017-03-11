var WIDTH = 4
var board = [];

function printBoard() {
    console.log(board);
}

$(document).ready(function() {
    reset();
    update();
});

window.onkeydown = function(event) {
    var moved = false;
    if (event.keyCode == 37) {
        // LEFT
        for (var column = 1; column < WIDTH; column++) {
            for (var row = 0; row < WIDTH; row++) {
                if (board[row * WIDTH + column] != 0) {
                    var canSlide = true;
                    var checkleft = column - 1;
                    while (canSlide) {
                        if (board[row * WIDTH + checkleft] == 0) {
                            checkleft--;
                        } else if (board[row * WIDTH + checkleft] == board[row * WIDTH + column]) {
                            board[row * WIDTH + checkleft] *= 2;
                            board[row * WIDTH + column] = 0;
                            canSlide = false;
                            moved = true;
                        } else {
                            if (checkleft != column - 1) {
                                board[row * WIDTH + checkleft + 1] = board[row * WIDTH + column];
                                board[row * WIDTH + column] = 0;
                                moved = true;
                            }
                            canSlide = false;
                        }
                        if (checkleft < 0) {
                            board[row * WIDTH] = board[row * WIDTH + column];
                            board[row * WIDTH + column] = 0;
                            canSlide = false;
                            moved = true;
                        }
                    }
                }
            }
        }
    } else if (event.keyCode == 38) {
        // UP
        for (var row = 1; row < WIDTH; row++) {
            for (var column = 0; column < WIDTH; column++) {
                if (board[row * WIDTH + column] != 0) {
                    var canSlide = true;
                    var checkup = row - 1;
                    while (canSlide) {
                        if (board[checkup * WIDTH + column] == 0) {
                            checkup--;
                        } else if (board[checkup * WIDTH + column] == board[row * WIDTH + column]) {
                            board[checkup * WIDTH + column] *= 2;
                            board[row * WIDTH + column] = 0;
                            canSlide = false;
                            moved = true;
                        } else {
                            if (checkup != row - 1) {
                                board[(checkup + 1) * WIDTH + column] = board[row * WIDTH + column];
                                board[row * WIDTH + column] = 0;
                                moved = true;
                            }
                            canSlide = false;
                        }
                        if (checkup < 0) {
                            board[(checkup + 1) * WIDTH + column] = board[row * WIDTH + column];
                            board[row * WIDTH + column] = 0;
                            canSlide = false;
                            moved = true;
                        }
                    }
                }
            }
        }
    } else if (event.keyCode == 39) {
        // RIGHT
        for (var column = WIDTH - 2; column >= 0; column--) {
            for (var row = 0; row < WIDTH; row++) {
                if (board[row * WIDTH + column] != 0) {
                    var canSlide = true;
                    var checkright = column + 1;
                    while (canSlide) {
                        if (board[row * WIDTH + checkright] == 0) {
                            checkright++;
                        } else if (board[row * WIDTH + checkright] == board[row * WIDTH + column]) {
                            board[row * WIDTH + checkright] *= 2;
                            board[row * WIDTH + column] = 0;
                            canSlide = false;
                            moved = true;
                        } else {
                            if (checkright != column + 1) {
                                board[row * WIDTH + checkright - 1] = board[row * WIDTH + column];
                                board[row * WIDTH + column] = 0;
                                moved = true;
                            }
                            canSlide = false;
                        }
                        if (checkright > WIDTH - 1) {
                            board[row * WIDTH + checkright - 1] = board[row * WIDTH + column];
                            board[row * WIDTH + column] = 0;
                            canSlide = false;
                            moved = true;
                        }
                    }
                }
            }
        }
    } else if (event.keyCode == 40) {
        // DOWN
        for (var row = WIDTH - 2; row >= 0; row--) {
            for (var column = 0; column < WIDTH; column++) {
                if (board[row * WIDTH + column] != 0) {
                    var canSlide = true;
                    var checkdown = row + 1;
                    while (canSlide) {
                        if (board[checkdown * WIDTH + column] == 0) {
                            checkdown++;
                        } else if (board[checkdown * WIDTH + column] == board[row * WIDTH + column]) {
                            board[checkdown * WIDTH + column] *= 2;
                            board[row * WIDTH + column] = 0;
                            canSlide = false;
                            moved = true;
                        } else {
                            if (checkdown != row + 1) {
                                board[(checkdown - 1) * WIDTH + column] = board[row * WIDTH + column];
                                board[row * WIDTH + column] = 0;
                                moved = true;
                            }
                            canSlide = false;
                        }
                        if (checkdown > WIDTH - 1) {
                            board[(checkdown - 1) * WIDTH + column] = board[row * WIDTH + column];
                            board[row * WIDTH + column] = 0;
                            canSlide = false;
                            moved = true;
                        }
                    }
                }
            }
        }
    }
    if (moved) {
        addTile();
    }
    if (isGameOver()) {
        reset();
    }
    update();
}

function update() {
    for (var row = 0; row < WIDTH; row++) {
        for (var column = 0; column < WIDTH; column++) {
            $("#tile" + row + "" + column).text(board[row * WIDTH + column]);
        }
    }
}

function reset() {
    for (var i = 0; i < WIDTH * WIDTH; i++) {
        board[i] = 0;
    }
    init();
}

function init() {
    board[getRandomInt(0, WIDTH) * WIDTH + getRandomInt(0, WIDTH)] = 2;
    board[getRandomInt(0, WIDTH) * WIDTH + getRandomInt(0, WIDTH)] = 2;
}

function addTile() {
    var zeros = [];
    for (var i = 0; i < WIDTH * WIDTH; i++) {
        if (board[i] == 0) {
            zeros.push(i);
        }
    }

    var index = getRandomInt(0, zeros.length);
    board[zeros[index]] = Math.random() >= .5 ? 2 : 4;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function isGameOver() {
    if (!isBoardFull()) {
        return false;
    }
    for (var i = 0; i < WIDTH; i++) {
        for (var j = 0; j < WIDTH; j++) {
            if (hasMatchingAdjacent(i, j)) {
                return false;
            }
        }
    }
    return true;
}

function hasMatchingAdjacent(i, j) {
    if (board[WIDTH * i + j] == board[WIDTH * (i + 1) + j] || board[WIDTH * i + j] == board[WIDTH * (i - 1) + j] || board[WIDTH * i + j] == board[WIDTH * i + j + 1] || board[WIDTH * i + j] == board[WIDTH * i + j - 1]) {
        return true;
    }
    return false;
}

function isBoardFull() {
    return board.indexOf(0) === -1 ? true : false;
}
