/*
** Configure Game
*/
var config = {
    type: Phaser.WEBGL,
    width: 16*(size + 2),
    height: 16*(size + 2),
    scene: {preload, create, update}
};

/*
** Create Game
*/
var game = new Phaser.Game(config);