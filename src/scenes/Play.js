//create a scene class called menu that inherits Phaser.Scene
class Play extends Phaser.Scene
{
    //new constructor in Menu that calls Phaser.Scene's constructor with the scene name menuScene
    constructor()
    {
        super("playScene");
    }

    preload()
    {
        //load images and tile sprites
        this.load.image("rocket", "./assets/rocket.png");
        this.load.image("spaceship", "./assets/spaceship.png");
        this.load.image("starfield", "./assets/starfield.png");
        this.load.spritesheet("explosion", "./assets/explosion.png", {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create()
    {
        //place tile sprite background
        //things added first go further in the back by default
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, "starfield").setOrigin(0, 0); //making starfield a property of the play object so it can be used in update

        //white rectangle borders
        // x, y, width, height, color
        this.add.rectangle(5, 5, game.config.width-10, 32, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(5, game.config.height-37, game.config.width-10, 32, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(5, 5, 32, game.config.height-10, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width-37, 5, 32, game.config.height-10, 0xFFFFFF).setOrigin(0,0);

        //green UI background
        this.add.rectangle(37, 42, game.config.width-74, 64, 0x00FF00).setOrigin(0,0);

        //add rocket [p1]
        //can use .setScale(0.5, 0.5) to halve size
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - 47, "rocket", 0).setScale(0.5, 0.5);
        
        //add ships
        this.ship01 = new Spaceship(this,game.config.width+192, 132, "spaceship", 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this,game.config.width+96, 196, "spaceship", 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this,game.config.width, 260, "spaceship", 0, 10).setOrigin(0, 0);

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation config create new anim in the animation manager and bind it to the scene
        this.anims.create
        ({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion",{start: 0, end: 9, first: 0}),
            frameRate: 15
        });

        //score
        this.p1Score = 0;

        //score display
        let scoreConfig =
        {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "#F3B141",
            color: "#843605",
            align: "right",
            padding:
            {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);

        //game over flag
        this.gameOver = false;

        //60 to 120-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () =>
        {
            this.add.text(game.config.width/2, game.config.height/2, "GAME OVER", scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, "(F) to Restart or ← for Menu", scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        },
        null, this);
    }

    update() //happens every frame
    {
        //check key input for restart
        if (this.gameOver && (Phaser.Input.Keyboard.JustDown(keyF)) )
        {
            this.scene.restart(this.p1Score);
            this.scene.restart(this.p2Score);
        }

        //check key input for menu
        if (this.gameOver && (Phaser.Input.Keyboard.JustDown(keyLEFT)) )
        {
            this.scene.start("menuScene");
        }

        //scroll background tile sprite
        this.starfield.tilePositionX -= 1;

        if(!this.gameOver)
        {
            //update rocket
            this.p1Rocket.update();

            //update spaceships
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        //check for collisions
        if(this.checkCollision(this.p1Rocket,this.ship03))
        {

            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket,this.ship02))
        {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket,this.ship01))
        {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship)
    {
        //simple AABB bounds checking
        if(rocket.x < ship.x + ship.width &&
           rocket.x + rocket.width > ship.x &&
           rocket.y < ship.y + ship.height &&
           rocket.height + rocket.y > ship.y)
        {
             return true;
        }
        else
        {
            return false;
        }
    }

    shipExplode(ship) //not necessarily the best way to do this
    {
        //temporarily hide ship
        ship.alpha = 0;
        //create explosion at the ship's location
        let boom = this.add.sprite(ship.x, ship.y, "explosion").setOrigin(0, 0);
        boom.anims.play("explode"); //play explosion animation
        boom.on("animationcomplete", () => //callback after animation completes
        {
            ship.reset(); //reset ship position
            ship.alpha = 1; //make ship visible again
            boom.destroy(); //remove explosion sprite
        });

            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;
        
        //play explosion sound
        this.sound.play("sfx_explosion");
    }
}