class Start extends Phaser.Scene {
    constructor (config) {
        super(config);
    }

    preload () {
        this.load.image('Start', './assets/logo.png');
    }

    create () {
        var x = config.width / 2;
        var y = config.height / 2;

        var scalex = Math.floor(config.width / (32 * 1.5));
        var scaley = Math.floor(config.height / (32 * 1.5));

        var startButton = this.add.image(x, y, 'Start')
            .setScale(scalex,scaley).
            setInteractive()
        ;

        startButton.on('pointerup', function () {
            this.scene.start('Main');
        }.bind(this))
    }
}