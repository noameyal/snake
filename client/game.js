/*
** Configure Game
*/
var config = {
    type: Phaser.WEBGL,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
};

/*
** Create Game
*/
var game = new Phaser.Game(config);

/*
** Add Scenes
*/
game.scene.add('Game', Game);

/*
** Start Game
*/
game.scene.start('Game');