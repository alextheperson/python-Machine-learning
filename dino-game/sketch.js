let ground;

let dinos = [];
let cacti = [];

let spawnCactusFrame;

function setup() {
    createCanvas(640, 480)

    ground = new Ground();

    spawnCactusFrame = 40;
    cacti.push(new Cactus());

    firstGen()
}

function draw() {
    background(250, 250, 250);

    ground.show();

    if(frameCount == spawnCactusFrame){
        cacti.push(new Cactus());
        spawnCactusFrame += int(random(40, 100));
    }
    
    for(let i = 0;i < cacti.length;i++){
        
        if(cacti[i].pos.x < -cacti[0].width){
            cacti.shift(); // removes first thing
        }
        
        cacti[i].update();
        cacti[i].show();
    }

    for(let i = 0; i < dinos.length; i++){
        if(dinos[i].playerControled){
            if(keyIsDown(DOWN_ARROW)){
                dinos[i].duck();
            }
            else{
                dinos[i].unDuck();
            }
            if(keyIsDown(UP_ARROW)){
                dinos[i].jump();
            }
        }

        dinos[i].update(getClosestCactus(dinos[i]));
        dinos[i].show();
    }
}

function firstGen(){
    dinos = [];
    dinos.push(new Dino(true));
}

function nextGen(){
    dinos = []
    dinos.push(new Dino(true));

}

function getClosestCactus(dino){
    let colsestIndex = 0;
    
    while(dinos[colsestIndex].pos.x + cacti[colsestIndex].fullWidth / 2 < dino.pos.x - dino.width){
        colsestIndex++;
    }
    return cacti[colsestIndex];
}