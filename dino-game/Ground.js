class Ground {
    constructor() {
        this.pos = createVector(width/2, height - height/4);
    }

    show(){
        push();
        noStroke();
        translate(this.pos.x, this.pos.y);
        fill(83, 83, 83);
        rectMode(CENTER);
        rect(0, 0, width, 1);
        pop();
    }
}
