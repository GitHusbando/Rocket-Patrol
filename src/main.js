//create game configuration object
console.log("creating game configuration object...");
let config =
{
    type: Phaser.CANVAS,
    width: 640,
    height: 480
};


//create main game object
console.log("creating main game object...");
let game = new Phaser.Game(config);