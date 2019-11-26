function preload() {
    this.load.image('apple', './assets/apple.png')
    this.load.image('background', './assets/background.png')
    this.load.image('border', './assets/border.png')
    this.load.image('snake', './assets/snake.png')
}

var cursors;

function drawBoard() {
    status = getStatus()
    if (status == "Dead") return;
    
    board = getBoard()
    y = 0
    board.forEach(row => {
        x = 0
        row.forEach(tile => {
            switch (tile) {
                case "None":
                    this.add.image(x, y, 'background').setOrigin(0, 0);
                    break;
                case "Head":
                case "Body":
                    this.add.image(x, y, 'snake').setOrigin(0, 0);
                    break;
                case "Apple":
                    this.add.image(x, y, 'apple').setOrigin(0, 0);
                    break;
                case "Border":
                    this.add.image(x, y, 'border').setOrigin(0, 0);
                    break;
            }
            x += 16
        })
        y += 16
    });
}

function showMove() {
    move()
    drawBoard.bind(this)()
}

function create() {
    startGame()
    drawBoard.bind(this)()

    this.input.keyboard.on("keydown-UP", event => {
        changeDirection("up")
    })
    this.input.keyboard.on("keydown-DOWN", event => {
        changeDirection("down")
    })
    this.input.keyboard.on("keydown-LEFT", event => {
        changeDirection("left")
    })
    this.input.keyboard.on("keydown-RIGHT", event => {
        changeDirection("right")
    })
    
    timedEvent = this.time.addEvent({
        delay: 500, 
        callback: showMove.bind(this), 
        callbackScope: this, 
        loop: true 
    });
}

function update() {
/*
    if (cursors.up.isDown) {
        objects.text.setVelocityY(-200)
    }
    else if (cursors.down.isDown) {
        objects.text.setVelocityY(200)
    }
    else {
        objects.text.setVelocityY(0)
    }

    if (cursors.left.isDown) {
        objects.text.setVelocityX(-200)
    }
    else if (cursors.right.isDown) {
        objects.text.setVelocityX(200)
    }
    else {
        objects.text.setVelocityX(0)
    }*/
}