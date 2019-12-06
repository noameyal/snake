class Start extends Phaser.Scene {
    constructor (config) {
        super(config);
    }

    preload () {
        this.load.image('Start', './assets/logo.png');
    }

    create () {
        game = this;

        var x = game.scale.width / 2;
        var y = game.scale.height / 2;

        var scalex = Math.floor(game.scale.width / (32 * 1.5));
        var scaley = Math.floor(game.scale.height / (32 * 1.5));

        var startButton = this.add.image(x, y, 'Start')
            .setScale(scalex,scaley)
            .setInteractive()
        ;

        startButton.on('pointerup', function () {
            this.scene.start('Main');
        }.bind(this))
    }
}