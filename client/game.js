/*
** Configure Game
*/

var size = 30;

var config = {
    type: Phaser.WEBGL,
    width: 16 * size,
    height: 16 * size,
    backgroundColor: '#000000',
    pixelArt: true,
};

/*
** Create Game
*/

var game = new Phaser.Game(config);
game.scene.add('Main', Main);
game.scene.add('Start', Start);
game.scene.add('End', End);

game.scene.start('Start');