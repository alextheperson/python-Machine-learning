class Population {
    constructor( life_span, pop_size, reward, punishment, new_pop){
        this.life_span = life_span;
        this.pop_size = pop_size;
        this.reward = reward;
        this.punishment = punishment;

        this.food = new Food(width/2, 50, 30);
        this.wall = new Wall(width/2, height - height / 3, 300, 30);

        this.flies = [];
        this.pool = [];

        if(new_pop === undefined){
            for(let i = 0; i < pop_size; i++){
                this.flies[i] = new Fly(this.life_span, this.reward, this.punishment, this.food);
            }
        }
        else{
                this.flies = new_pop;
        }

    }

    run(count){
        this.food.show();
        this.wall.show();
        for(let i = 0; i < this.pop_size; i++){
            this.flies[i].update(count, this.wall);
            this.flies[i].show();
        }
    }
}