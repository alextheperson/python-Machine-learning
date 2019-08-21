const LIFE_SPAN = 600; // how long flies do live
const POPULATION = 500; // how manny flies do we want
const REWARD_MULT = 10; // what is the reward for finding food
const PUNISH_DIV = 3; // punishment for hitting things
const MUTATION = 0.1; // the mutation rate

let count = 0

function setup() {
    createCanvas(640, 480);

    population = new Population(LIFE_SPAN, POPULATION, REWARD_MULT, PUNISH_DIV)
}

function draw() {
    background(55, 55, 255)
    population.run(count)
    count ++;

    if (count == LIFE_SPAN){
        count = 0;
    }
}