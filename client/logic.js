/* 
 * State
 *      Stores the current game state
 * Keys:
 *      board
 *      boardSize
 *      snake
 *          body
 *          direction
 *      apple
 *      score
 *      status
 */
var state = {}

/*
 * Create Board
 *      Return an empty board object
 * Args: size > 0
 * Return: None
 * Create:
 *      board = [[h|b|a|b|n]]
 *      coord(x,y) = head | body | apple | border | none
 */

function createBoard(size, hook=()=>{}) {
    if (size <= 0) {
        console.warn("Board must be larger than 0x0.");
        return;
    }
    
    board = [];
    for (x=0; x <= (size + 1) ; x++) {
        row = [];
        for (y=0; y <= (size + 1); y++) {
            isBorder = x == 0 || y == 0 || x == (size + 1) || y == (size + 1);
            item = isBorder ? "Border" : "None";
            row.push(item);
            hook(item, x, y);
        }
        board.push(row);
    }

    state.board = board;
    state.boardSize = size;
}

/*
 * Create Snake
 *      Return an initial snake object
 * Args: None
 * Return: None
 * Create:
 *      snake = {
 *          body: [head,[x,y],tail],
 *          direction: up | right | down | left
 *          }
 */

function createSnake(hook=updateBoard) {
    start = Math.floor(state.boardSize / 2)
    snake = {
        body: [[start, start]],
        direction: "right"
    }

    state.snake = snake;
    hook([start,start], "Head");
}

/*
 * Start Game
 *      Set up state
 * Args: size (default 15)
 * Return: None
 */

function startGame(
    size=15,
    boardHook=createBoard,
    snakeHook=createSnake,
    appleHook=addApple) {
    boardHook(size);
    snakeHook();

    state.status = "Playing";
    state.score = 0;

    appleHook();
}

/*
 * Update Board
 *      Update point (x,y) on the board
 * Args: coordinate, value
 * Return: None
 */

function updateBoard(coordinate, value, hook=()=>{}) {
    x = coordinate[0]
    y = coordinate[1]

    state.board[y][x] = value;
    hook(value, x, y);
}

/*
 * Move
 *      Move the snake one step
 * Args: None
 * Return: None
 */

function move(hook=updateBoard, scoreHook=score, dieHook=die) {
    if (state.status != "Playing") return;

    head = state.snake.body[0];
    direction = state.snake.direction;

    next = move.next(direction, head);
    state.snake.body.unshift(next);

    hook(head, "Body");

    move.check(next, hook, dieHook, scoreHook);
    if (state.status == "Dead") return;

    hook(next, "Head");
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
move.check = function(coord, drawHook, dieHook, scoreHook) {
    x = coord[0];
    y = coord[1];

    switch (state.board[y][x]) {
        case "Body":
        case "Border":
            dieHook();
            break;
        case "Apple":
            scoreHook();
            break;
        default:
            tail = state.snake.body.pop();
            drawHook(tail, "None");
            break;
    }
}

/*
 * Change direction
 *      Change the direction of the snake
 * Args: Direction
 * Return: None
 */

function changeDirection(direction) {
    if (state.status != "Playing") return;

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

/*
 * Add apple
 *      Add an apple to the board
 * Args: None
 * Return: None
 */

function addApple(hook=updateBoard) {
    if (state.status != "Playing") return;
    
    size = state.boardSize;

    x = Math.floor(Math.random() * size) + 1;
    y = Math.floor(Math.random() * size) + 1;

    while (state.board[y][x] != "None") {
        x = Math.floor(Math.random() * size) + 1;
        y = Math.floor(Math.random() * size) + 1;
    }

    hook([x,y], "Apple");

    state.apple = [x,y];
}

/*
 * Die
 *      Finishes the game
 * Args: None
 * Return: None
 */

function die() {
    if (state.status != "Playing") return;
    
    state = {
        score: state.score,
        status: "Dead"
    }
}

/*
 * Score
 *      Win a point
 * Args: None
 * Return: None
 */

function score(hook=addApple) {
    if (state.status != "Playing") return;
    
    state.score++;
    hook();
}

/*
 * Get Board
 *      Returns the board from state
 * Args: None
 * Return: Board
 */

function getBoard() {
    return state.board;
}

/*
 * Get Score
 *      Returns the score from state
 * Args: None
 * Return: Score
 */

function getScore() {
    return state.score;
}

/*
 * Get Status
 *      Returns the status from state
 * Args: None
 * Return: Status
 */

function getStatus() {
    return state.status;
}