// game.js

var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
};

var player;
var cursors;
var trees;
var garbage;
var score = 0;
var scoreText;

var game = new Phaser.Game(config);

function preload() {
    this.load.image('background', 'background-image-url.jpg');
    this.load.image('player', 'player-image-url.png');
    this.load.image('tree', 'tree-image-url.png');
    this.load.image('garbage', 'garbage-image-url.png');
}

function create() {
    // Background
    this.add.image(0, 0, 'background').setOrigin(0);

    // Player
    player = this.physics.add.sprite(100, 450, 'player').setScale(0.5);
    player.setCollideWorldBounds(true);

    // Trees
    trees = this.physics.add.group({
        key: 'tree',
        repeat: 5,
        setXY: { x: 100, y: 0, stepX: 150 }
    });

    // Garbage
    garbage = this.physics.add.group({
        key: 'garbage',
        repeat: 5,
        setXY: { x: 300, y: 0, stepX: 150 }
    });

    // Score text
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

    // Input
    cursors = this.input.keyboard.createCursorKeys();

    // On-screen controls for mobile
    createOnscreenControls(this);
}

function update() {
    // Player movement
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }

    // Tree collection
    this.physics.add.overlap(player, trees, collectTree, null, this);

    // Garbage collection
    this.physics.add.overlap(player, garbage, collectGarbage, null, this);
}

function collectTree(player, tree) {
    tree.disableBody(true, true);
    score += 10;
    updateScoreText();
}

function collectGarbage(player, garbageItem) {
    garbageItem.disableBody(true, true);
    score -= 5; // Penalty for collecting garbage
    updateScoreText();
}

function updateScoreText() {
    scoreText.setText('Score: ' + score);
}

function createOnscreenControls(scene) {
    // Left button
    scene.add.image(50, window.innerHeight - 70, 'button').setInteractive().on('pointerdown', function () {
        cursors.left.isDown = true;
    }).on('pointerup', function () {
        cursors.left.isDown = false;
    });

    // Right button
    scene.add.image(150, window.innerHeight - 70, 'button').setInteractive().on('pointerdown', function () {
        cursors.right.isDown = true;
    }).on('pointerup', function () {
        cursors.right.isDown = false;
    });
}
