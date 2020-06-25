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
    }

    update() //happens every frame
    {
        //scroll background tile sprite
        this.starfield.tilePositionX -= 1;

        //update rocket
        this.p1Rocket.update();

        //update spaceships
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();

        if(this.checkCollision(this.p1Rocket,this.ship03))
        {

            this.p1Rocket.reset();
            this.ship03.reset();
        }
        if(this.checkCollision(this.p1Rocket,this.ship02))
        {
            this.p1Rocket.reset();
            this.ship02.reset();
        }
        if(this.checkCollision(this.p1Rocket,this.ship01))
        {
            this.p1Rocket.reset();
            this.ship01.reset();
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
}