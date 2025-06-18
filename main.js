class LevelOne extends Phaser.Scene
    {
        preload ()
        {
            this.load.image('pig', 'assets/character.png');
            this.load.image('ground', 'assets/ground.png');
        }

        create ()
        {
            const yPosition = 500;
            const screenWidth = this.sys.game.config.width;
            const groundTileWidth = this.textures.get('ground').getSourceImage().width;
            const groundTileHeight = this.textures.get('ground').getSourceImage().height;
            console.log(groundTileHeight);
            const pigHeight = this.textures.get('pig').getSourceImage().height;
            const pigY = yPosition - groundTileHeight / 2 - pigHeight / 2;
            
            // Adding the ground
            this.groundGroup = this.physics.add.staticGroup();
            for (let x = 0; x < screenWidth; x += groundTileWidth) {
                for (let y = 0; y < 100; y += groundTileHeight) {
                    this.groundGroup.create(x + groundTileWidth/2, 500+y, 'ground');
                }
            }

            // Adding the pigoo
            this.pig = this.physics.add.sprite(100, pigY, 'pig');
            this.pig.setCollideWorldBounds(true);
            this.physics.add.collider(this.pig, this.groundGroup);
        }
    }

    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: LevelOne,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }
            }
        }
    };

    const game = new Phaser.Game(config);