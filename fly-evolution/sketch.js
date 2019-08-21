const LIFE_SPAN = 600; // how long flies do live
const POPULATION = 500; // how manny flies do we want
const REWARD_MULT = 500; // what is the reward for finding food
const PUNISH_DIV = 3; // punishment for hitting things
const MUTATION = 0.1; // the mutation rate

let count = 0
let generation = 0
let averageFit = 0
let sucsessRate = 0
let totalSucsessRate = 0


function setup() {
    createCanvas(640, 480);

    population = new Population(LIFE_SPAN, POPULATION, REWARD_MULT, PUNISH_DIV)
}

function draw() {
    background(55, 55, 255)
    
    textSize(20);
    text("Generation: " + generation, 5, 29);
    text("Average Fitness: " + averageFit, 5, 63);
    text("Sucsess Rate: " + sucsessRate + "/" + POPULATION, 5, 97);
    text("Total Sucsesses: " + totalSucsessRate, 5, 129);

    population.run(count)
    count ++;
    averageFit = population.findAverageFitness();
    if (count == LIFE_SPAN){
        population.evaluate();

        averageFit = population.findAverageFitness();
        sucsessRate = population.sucsessRate

        let newFlies = population.generateNewPop(MUTATION)

        population = new Population(LIFE_SPAN, POPULATION, REWARD_MULT, PUNISH_DIV, newFlies)

        count = 0;
        generation++
        population.sucsessRate = 0;
    }
}