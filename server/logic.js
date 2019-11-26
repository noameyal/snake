/*
 * Game Logic
 */

// State
//      Stores the current game state
// Keys:
//      board
//      boardSize
//      snake
//          body
//          direction
//      apple
//      score
//      status
let state = {}

// Create Board
//      Return an empty board object
// Args: size > 0
// Return: None
// Create:
//      board = [[h|b|a|b|n]]
//      coord(x,y) = head | body | apple | border | none

function createBoard(size) {
    assert(size > 0, "Board must be larger than 0x0.");

    board = [];
    for (x=0; x <= (size + 1) ; x++) {
        row = [];
        for (y=0; y <= (size + 1); y++) {
            isBorder = x == 0 || y == 0 || x == (size + 1) || y == (size + 1);
            row.push(isBorder ? "Border" : "None");
        }
        board.push(row);
    }

    state.board = board;
    state.boardSize = size;
}

// Create Snake
//      Return an initial snake object
// Args: None
// Return: None
// Create:
//      snake = {
//          body: [head,[x,y],tail],
//          direction: up | right | down | left
//          }

function createSnake() {
    start = Math.floor(state.boardSize / 2)
    snake = {
        body: [[start, start]],
        direction: "right"
    }

    state.snake = snake;
    updateBoard([start,start], "Head");
}

// Start Game
//      Set up state
// Args: size (default 15)
// Return: None

function startGame(size=15) {
    createBoard(size);
    createSnake();

    state.status = "Playing";
    state.score = 0;

    addApple();
}

// Update Board
//      Update point (x,y) on the board
// Args: coordinate, value
// Return: None

function updateBoard(coordinate, value) {
    x = coordinate[0]
    y = coordinate[1]

    state.board[y][x] = value
}

// Move
//      Move the snake one step
// Args: None
// Return: None

function move() {
    assert(state.status == "Playing", "Game not currently running.");
    
    head = state.snake.body[0];
    direction = state.snake.direction;

    tail = state.snake.body.pop();
    next = move.next(direction, head);
    state.snake.body.unshift(next);

    move.check(next);

    if (state.status == "Dead") return;

    updateBoard(head, "Body");
    updateBoard(tail, "None");
    updateBoard(next, "Head");
}

// Next: Helper function for move
move.next = function(direction, head) {
    switch(direction) {
        case "right": return [head[0] + 1, head[1]]
        case "down": return [head[0], head[1] + 1]
        case "left": return [head[0] - 1, head[1]]
        case "up": return [head[0], head[1] - 1]
    }
}

// Check: Helper function for move
move.check = function(coord) {
    x = coord[0];
    y = coord[1];

    switch (state.board[y][x]) {
        case "Body":
        case "Border":
            die();
            break;
        case "Apple":
            score();
            break;
        default:
            break;
    }
}

// Change direction
//      Change the direction of the snake
// Args: Direction
// Return: None

function changeDirection(direction) {
    assert(state.status == "Playing", "Game not currently running.");
    
    opposite = {
        right: "left",
        left: "right",
        up: "down",
        down: "up"
    }
    currentDirection = state.snake.direction;
    if (direction == opposite[currentDirection]) return;

    state.snake.direction = direction;
}

// Add apple
//      Add an apple to the board
// Args: None
// Return: None

function addApple() {
    assert(state.status == "Playing", "Game not currently running.");
    
    size = state.boardSize;

    x = Math.floor(Math.random() * size) + 1;
    y = Math.floor(Math.random() * size) + 1;

    while (state.board[y][x] != "None") {
        x = Math.floor(Math.random() * size) + 1;
        y = Math.floor(Math.random() * size) + 1;
    }

    updateBoard([x,y], "Apple");

    state.apple = [x,y];
}

// Die
//      Finishes the game
// Args: None
// Return: None

function die() {
    assert(state.status == "Playing", "Game not currently running.");
    
    state = {
        score: state.score,
        status: "Dead"
    }
}

// Score
//      Win a point
// Args: None
// Return: None

function score() {
    assert(state.status == "Playing", "Game not currently running.");
    
    state.score++;
    addApple();
}

// Get Board
//      Returns the board from state
// Args: None
// Return: Board

function getBoard() {
    return state.board;
}

// Get Score
//      Returns the score from state
// Args: None
// Return: Score

function getScore() {
    return state.score;
}

module.exports = {
    getBoard,
    getScore,
    startGame,
    move,
    changeDirection
}