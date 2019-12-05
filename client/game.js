/*
** Configure Game
*/

var size = 30;

var config = {
    type: Phaser.WEBGL,
    width: 16 * size,
    height: 16 * size,
    backgroundColor: '#000000',
    scene: {
        preload,
        create,
        update
    }
};

/*
** Create Game
*/

var game = new Phaser.Game(config);

var directionQueue = [];

function preload() {
    this.load.image('Apple', './assets/apple.png');
    this.load.image('Snake', './assets/snake.png');
}

function showMove() {
    if (directionQueue.length != 0) {
        changeDirection(directionQueue.pop())
    }
    drawMove()
}

function create() { 
    game = this;
    
    drawGame(size);

    this.input.keyboard.on("keydown-UP", event => {
        directionQueue.unshift("up")
        if (directionQueue.length > 2) directionQueue.pop();
    })
    this.input.keyboard.on("keydown-DOWN", event => {
        directionQueue.unshift("down")
        if (directionQueue.length > 2) directionQueue.pop();
    })
    this.input.keyboard.on("keydown-LEFT", event => {
        directionQueue.unshift("left")
        if (directionQueue.length > 2) directionQueue.pop();
    })
    this.input.keyboard.on("keydown-RIGHT", event => {
        directionQueue.unshift("right")
        if (directionQueue.length > 2) directionQueue.pop();
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