//i didn't even think it was possible, but i somehow DELETED my finished game code from github
//like, even from the commit history wtf
//i mean, it might be somewhere i can't find maybe?
//anyway, i redid the parts that got deleted by copying them from my modded game

//create game configuration object
console.log("creating game configuration object...");

let config =
{
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play], //keep these in order, defaults to starting from the first one
};

//create main game object
console.log("creating main game object...");
let game = new Phaser.Game(config);

//reserve some keyboard bindings
let keyF, keyLEFT, keyRIGHT;