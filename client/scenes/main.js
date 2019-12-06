class Main extends Phaser.Scene {
    constructor (config) {
        super(config);
        this.directionQueue = [];
    }

    preload () {
        this.load.image('Apple', './assets/apple.png');
        this.load.image('Snake', './assets/snake.png');
    }
    
    showMove () {
        if (this.directionQueue.length != 0) {
            changeDirection(this.directionQueue.pop())
        }
        drawMove()
    }

    create () {
        game = this;
        
        drawGame(size);
    
        this.input.keyboard.on("keydown-UP", event => {
            this.directionQueue.unshift("up")
            if (this.directionQueue.length > 2) this.directionQueue.pop();
        })
        this.input.keyboard.on("keydown-DOWN", event => {
            this.directionQueue.unshift("down")
            if (this.directionQueue.length > 2) this.directionQueue.pop();
        })
        this.input.keyboard.on("keydown-LEFT", event => {
            this.directionQueue.unshift("left")
            if (this.directionQueue.length > 2) this.directionQueue.pop();
        })
        this.input.keyboard.on("keydown-RIGHT", event => {
            this.directionQueue.unshift("right")
            if (this.directionQueue.length > 2) this.directionQueue.pop();
        })
        
        this.time.addEvent({
            delay: 250, 
            callback: this.showMove.bind(this), 
            callbackScope: this, 
            loop: true 
        });
    }
}