const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#fff',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 }
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };
  
  let game = new Phaser.Game(config);
  
  function preload() {
    // Load assets
    this.load.image('background', 'assets/background.png');
    this.load.image('tileset', 'assets/tileset.png');
    this.load.spritesheet('character', 'assets/character.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('button', 'assets/button.png');
    this.load.bitmapFont('pixelFont', 'assets/pixelFont.png', 'assets/pixelFont.xml');
  }
  
  function create() {
    // Create background image
    const background = this.add.image(400, 300, 'background');
    background.setScale(2);
  
    // Create map (replace with your actual map data)
    const map = this.add.tilemap();
    const tileset = map.addTilesetImage('tileset');
    const mapData = [
      [1, 1, 1, 2],
      [2, 0, 0, 1],
      [1, 0, 3, 1],
      [1, 1, 1, 1],
    ];
    const layer = map.createLayer(0, tileset, 0, 0);
    map.setCollision([1, 2, 3]);
  
    // Create character
    const player = this.physics.add.sprite(50, 50, 'character');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.setScale(2);
  
    // Create animations (replace with your own frames)
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('character', { start: 1, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('character', { start: 4, end: 6 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'turn',
      frames: [{ key: 'character', frame: 0 }],
      frameRate: 20
    });
  
    // Create trash items (replace with your own logic)
    const trash = this.physics.add.group({
      classType: Phaser.GameObjects.Sprite,
      defaultKey: 'button',
      setScale: 0.5
    });
    trash.create(100, 100);
    trash.create(300, 200);
  
    // Create score text
    const scoreText = this.add.bitmapText(10, 10, 'pixelFont', 'Score: 0', 16);
  
    // Define keyboard controls
    const cursors = this.input.keyboard.createCursorKeys();
  
    // Track collected trash and score
    let collectedTrash = 0;
}
  
    // Update function
    this.update = function () {
        // Player movement
        const speed = 100;
      
        // Move left
        if (cursors.left.isDown) {
          player.setVelocityX(-speed);
          player.anims.play('left', true);
        } else if (cursors.right.isDown) {
          player.setVelocityX(speed);
          player.anims.play('right', true);
        } else {
          player.setVelocityX(0);
          player.anims.play('turn', true);
        }
      
        // Player jump (optional)
        if (cursors.up.isDown && player.body.onGround()) {
          player.setVelocityY(-300);
        }
      
        // Collision detection with trash
        this.physics.arcade.overlap(player, trash, collectTrash, null, this);
      };
      