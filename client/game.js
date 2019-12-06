/*
** Configure Game
*/

var size, config, game;

function startPhaserGame(size) {
    if (game) {
        document.getElementById('game').innerHTML = ""
        game.sys.game.destroy(true);
        game = null;
    }

    config = {
        type: Phaser.WEBGL,
        width: 16 * size,
        height: 16 * size,
        backgroundColor: '#000000',
        pixelArt: true,
        parent: 'game',
    };

    /*
    ** Create Game
    */

    game = new Phaser.Game(config);
    game.scene.add('Main', Main);
    game.scene.add('Start', Start);
    game.scene.add('End', End);

    game.scene.start('Start');
}

startPhaserGame(30);