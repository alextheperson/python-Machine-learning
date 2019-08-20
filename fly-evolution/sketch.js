const LIFE_SPAN = 600; // how long flies do live
const POPULATION = 500; // how manny flies do we want
const REWARD_MULT = 10; // what is the reward for finding food
const PUNISH_DIV = 3; // punishment for hitting things
const MUTATION = 0.1; // the mutation rate

let count = 0
let fly, food, wall;

function setup() {
    createCanvas(640, 480);

    fly = new Fly(LIFE_SPAN);
    food = new Food(width/2, 50, 30);
    wall = new Wall(width/2, height - height/3, 300, 30);
}

function draw() {
    background(0, 0, 255)

    fly.update(count);
    fly.show();
    
    food.show();

    wall.show();

    count ++;

    if (count == LIFE_SPAN){
        count = 0;
    }
}