const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: function () {
            this.load.image('player', 'player.png');
            this.load.image('garbage', 'garbage.png');
            this.load.image('tree', 'tree.png');
        },
        create: function () {
            let player = this.physics.add.sprite(400, 300, 'player');
            this.physics.add.collider(player);
            this.input.keyboard.createCursorKeys();
            
            let garbageGroup = this.physics.add.group({
                key: 'garbage',
                repeat: 10,
                setXY: { x: 50, y: 0, stepX: 70 }
            });
            this.physics.add.collider(garbageGroup);
            this.physics.add.overlap(player, garbageGroup, function (player, garbage) {
                garbage.disableBody(true, true);
                // Update player score
            }, null, this);

            let treeGroup = this.physics.add.group({
                key: 'tree',
                repeat: 5,
                setXY: { x: 200, y: 200, stepX: 120 }
            });
            this.physics.add.collider(treeGroup);
            this.physics.add.overlap(player, treeGroup, function (player, tree) {
                tree.disableBody(true, true);
                // Update player score
            }, null, this);

            // Display score
            this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
        },
        update: function () {
            let player = this.physics.world.children.list.find(child => child instanceof Phaser.Physics.Arcade.Sprite && child.texture.key === 'player');
            let cursors = this.input.keyboard.createCursorKeys();

            if (cursors.up.isDown) {
                player.setVelocityY(-200);
            } else if (cursors.down.isDown) {
                player.setVelocityY(200);
            } else {
                player.setVelocityY(0);
            }

            if (cursors.left.isDown) {
                player.setVelocityX(-200);
            } else if (cursors.right.isDown) {
                player.setVelocityX(200);
            } else {
                player.setVelocityX(0);
            }
        }
    }
};

const game = new Phaser.Game(config);