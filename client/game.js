/*
** Configure Game
*/
var config = {
    type: Phaser.WEBGL,
    width: 16*17,
    height: 16*17,
    scene: {preload, create, update}
};

/*
** Create Game
*/
var game = new Phaser.Game(config);