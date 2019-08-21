class Food {
    constructor(x, y, radius) {
        this.pos = createVector(x, y)
        this.radius = radius;
    }

    show(){
        push();
        noStroke();
        translate(this.pos.x, this.pos.y);
        fill(55, 255, 55);
        ellipse(0, 0, this.radius, this.radius);
        pop();

    }
}