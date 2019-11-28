/*
** Configure Game
*/

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

function preload() {
    this.load.image('apple', './assets/apple.png');
    this.load.image('snake', './assets/snake.png');
}

function create() {

}