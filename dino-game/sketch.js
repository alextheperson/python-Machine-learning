let ground;
let selection;

const DINO_COUNT = 10;

let dinos = [];
let cacti = [];

let spawnCactusFrame;


let score = 0
let hiScore = 0

function setup() {
    tf.setBackend('cpu');
    createCanvas(640, 480)

    ground = new Ground();
    
    spawnCactusFrame = int(random(40, 100));
    cacti.push(new Cactus());

    selection = new Selection();

    firstGen()
}

function draw() {
    background(250, 250, 250);
    score += 1;

    push();
    fill(83, 83, 83);
    textSize(30);
    textAlign(RIGHT)
    text("HI:  " + hiScore.toFixed(0)+ "  " + score.toFixed(0), width - 15, height/3)

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
    
    let allDead = true;

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
        
        if(dinos[i].isAlive){
            allDead = false;
            dinos[i].update(getClosestCactus(dinos[i]), score);
            dinos[i].show();
        }
        else{
        }
    }
    if(allDead || score == 2500){
       nextGen(); 
    }
}

function firstGen(){
    dinos = [];

    for(let i = 0; i < DINO_COUNT; i++){
        dinos.push(new Dino(false, new NeuralNetwork(2, 4, 3)));
    }

    dinos.push(new Dino(true));
}

function nextGen(){
    dinos = selection.createNewGen(DINO_COUNT, dinos, 0.99);//0.99 mutation rate

    dinos.push(new Dino(true));

    spawnCactusFrame = frameCount + int(random(40, 100));
    cacti = [];
    cacti.push(new Cactus);
    if(score > hiScore){
        hiScore = score
    }
    score = 0;

}

function getClosestCactus(dino){
    let colsestIndex = 0;
    
    while(dinos[colsestIndex].pos.x + cacti[colsestIndex].fullWidth / 2 < dino.pos.x - dino.width){
        colsestIndex++;
    }
    return cacti[colsestIndex];
}