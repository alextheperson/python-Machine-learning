class Dino {
    constructor(playerControled) {
        this.originalWidth = 30;
        this.originalHeight = 50;
        this.width = this.originalWidth;
        this.height = this.originalHeight;

        this.pos = createVector(width / 4, this.calcGround());
        this.vel = createVector();

        this.playerControled = playerControled;

        this.isAlive = true;
    }

    calcGround(){
        return height - height / 4 - this.height/2;//position of the ground - half the height of the dino
    }
    
    update(colsestCactus){
        this.vel.y += -0.5; //strength of gravity
        this.pos.y -= this.vel.y//apply gravity
        
        let groundPos = this.calcGround();

        if(this.pos.y >= groundPos){
        this.pos.y = groundPos;
        this.vel.y = 0
        }

        if(this.hitCactus(colsestCactus)){
            this.isAlive = false;
        }
    }

    jump(){

        if(this.pos.y == this.calcGround() && this.height > this.originalWidth){ // NOT ducked
            this.vel.y = 11;//jump strenth
        }
    }

    duck(){
        if(this.pos.y == this.calcGround()){
            this.height = this.originalWidth;
            this.width = this.originalHeight;
        }
    }

    unDuck(){
        this.height = this.originalHeight;
        this.width = this.originalWidth;
    }

    show(){
        push();
        noStroke();
        translate(this.pos.x, this.pos.y);
        fill(83, 83, 83, 255);
        textAlign(LEFT);
        textSize(15);
        if(this.playerControled){
            text("Player", -60, 0);
            
        }
        else{
            text("CPU", -50, 0);
        }
        rectMode(CENTER);
        rect(0, 0, this.width, this.height);
        pop();
    }

    hitCactus(cactus) {
        let cactusWidth = ((cactus.width + cactus.spacing) * cactus.count) - cactus.spacing; // Calculate Full Width of Cactus

        if (this.pos.x + this.width / 2 > cactus.pos.x - cactus.width / 2 && this.pos.x - this.width / 2 < cactus.pos.x + cactusWidth) { // Check X
            if (this.pos.y + this.height / 2 > cactus.pos.y - cactus.height / 2) {
                return true;
                
            }
        }
        return false;
    }

}