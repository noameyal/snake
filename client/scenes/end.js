class End extends Phaser.Scene {
    constructor (config) {
        super(config)
    }

    preload () {
        this.load.image('Start', './assets/apple.png');
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

        var height = scalex * 32;
        var gap = (config.width - height) / 2;
        var textPos = 1.5 * gap + height;
        var fontSize = (config.width - scalex * 32) / 4;

        var scoreText = this.add.text(x, textPos, state.score, {
            fontSize: `${fontSize}px`
        });

        scoreText.setOrigin(0.5, 0.5)
    }
}