//create a scene class called menu that inherits Phaser.Scene
class Menu extends Phaser.Scene
{
    //new constructor in Menu that calls Phaser.Scene's constructor with the scene name menuScene
    constructor()
    {
        super("menuScene");
    }

    create()
    {
        //menu text
        this.add.text(20, 20, "Rocket Patrol Menu");

        //debug: move to text scene
        //starts a scene from this current scene
        this.scene.start("playScene");
    }
}

    //these methods must be run in this order
    /*
    init()
    {
        //sets the stage
    }

    preload()
    {
        //loads assets n stuff
    }

   create()
   {
       this.add.text(20, 20, "Rocket Patrol Menu");
   }

   /*
   update()
   {
       //loop
   }
   */