function setup() {
    createCanvas(640, 480)

    ground = new Ground();
}

function draw() {
    background(250, 250, 250);

    ground.show();
}