import Phaser from 'phaser';

class LevelOne extends Phaser.Scene {

    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private character1!: Phaser.Physics.Arcade.Sprite;

    constructor() {
      super('LevelOne');
    }
    preload ()
    {
        this.load.image('ground', 'assets/ground.png');
        this.load.spritesheet('character1', 'assets/character_run.png', {
          frameWidth: 32,
          frameHeight: 32
        });
    }
  
    create ()
    {

        const yPosition = 500;
        const screenWidth = Number(this.sys.game.config.width);
        const groundTileWidth = this.textures.get('ground').getSourceImage().width;
        const groundTileHeight = this.textures.get('ground').getSourceImage().height;
        console.log(groundTileHeight);
        const characterHeight = this.textures.get('character1').getSourceImage().height;
        const characterY = yPosition - groundTileHeight / 2 - characterHeight / 2;


        if (this.input && this.input.keyboard) {
            this.cursors = this.input.keyboard.createCursorKeys();
        }

        // Adding the ground
        const groundGroup = this.physics.add.staticGroup();
        for (let x = 0; x < screenWidth; x += groundTileWidth) {
            for (let y = 0; y < 100; y += groundTileHeight) {
                groundGroup.create(x + groundTileWidth/2, 500+y, 'ground');
            }
        }

        this.character1 = this.physics.add.sprite(100, 100, 'character1', 0);
        this.character1.setCollideWorldBounds(true);
        this.physics.add.collider(this.character1, groundGroup);
  
        console.log("added basic stuff");
  
        this.anims.create({
          key: 'character-walk',
          frames: this.anims.generateFrameNumbers('character1', {start: 0, end: 7}),
          frameRate: 10,
          repeat: 1
        });
        // movement
        
        console.log("added basic movement");
    }
  
    update() {
      this.character1.setVelocityX(0);
  
      // movements
      if(this.cursors.left.isDown) {
        this.character1.setVelocityX(-160);
        this.character1.anims.play('character-walk', true);
        this.character1.setFlipX(true); // flip left
      } else if (this.cursors.right.isDown) {
        this.character1.setVelocityX(160);
        this.character1.anims.play('character-walk', true);
        this.character1.setFlipX(false); // flip left
      }
  
      if ((this.cursors.up.isDown || this.cursors.space.isDown) && this.character1.body?.blocked.down) {
        this.character1.setVelocityY(-250);
      }
    }
  }

  const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor: '#87CEEB',
      scene: LevelOne,
      physics: {
          default: 'arcade',
          arcade: {
              gravity: { x: 0, y: 750 },
              debug: true
          }
      }
  };
  
new Phaser.Game(config);