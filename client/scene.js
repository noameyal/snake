var size = 25;
var boardObjects = [];
var directionQueue = [];

function preload() {
    this.load.image('apple', './assets/apple.png')
    this.load.image('background', './assets/background.png')
    this.load.image('border', './assets/border.png')
    this.load.image('snake', './assets/snake.png')
}

function drawBoard() {
    status = getStatus()
    boardObjects.forEach(function (object) {
        object.destroy();
    });

    if (status == "Dead") return;

    board = getBoard()
    y = 0
    board.forEach(row => {
        x = 0
        row.forEach(tile => {
            switch (tile) {
                case "Head":
                case "Body":
                    boardObjects.push(this.add.image(x, y, 'snake').setOrigin(0, 0));
                    break;
                case "Apple":
                    boardObjects.push(this.add.image(x, y, 'apple').setOrigin(0, 0));
                    break;
                case "Border":
                    boardObjects.push(this.add.image(x, y, 'border').setOrigin(0, 0));
                    break;
            }
            x += 16
        })
        y += 16
    });
}

function showMove() {
    if (directionQueue.length != 0) {
        changeDirection(directionQueue.pop())
    }
    move()
    drawBoard.bind(this)()
}

function create() {
    startGame(size)
    drawBoard.bind(this)()

    this.input.keyboard.on("keydown-UP", event => {
        directionQueue.unshift("up")
    })
    this.input.keyboard.on("keydown-DOWN", event => {
        directionQueue.unshift("down")
    })
    this.input.keyboard.on("keydown-LEFT", event => {
        directionQueue.unshift("left")
    })
    this.input.keyboard.on("keydown-RIGHT", event => {
        directionQueue.unshift("right")
    })
    
    timedEvent = this.time.addEvent({
        delay: 250, 
        callback: showMove.bind(this), 
        callbackScope: this, 
        loop: true 
    });
}

function update() {
}