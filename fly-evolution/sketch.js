const LIFE_SPAN = 600; // how long flies do live
const POPULATION = 500; // how manny flies do we want
const REWARD_MULT = 10; // what is the reward for finding food
const PUNISH_DIV = 3; // punishment for hitting things
const MUTATION = 0.1; // the mutation rate

let count = 0
let food, wall;

let flies = [];

function setup() {
    createCanvas(640, 480);
    
    food = new Food(width/2, 50, 30);
    wall = new Wall(width/2, height - height/3, 300, 30);

    for(let i = 0; i < POPULATION; i++){
        flies[i] = new Fly(LIFE_SPAN, REWARD_MULT, PUNISH_DIV, food)
    }
}

function draw() {
    background(55, 55, 255)

    for(let i = 0; i < POPULATION; i++){
            flies[i].update(count, wall);
            flies[i].show();
    }



    food.show();

    wall.show();

    count ++;

    if (count == LIFE_SPAN){
        count = 0;
    }
}