class Population {
    constructor( life_span, pop_size, reward, punishment, new_pop){
        this.life_span = life_span;
        this.pop_size = pop_size;
        this.reward = reward;
        this.punishment = punishment;
        this.sucsessRate = 0

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
    
    evaluate(){
        let maxFit = 0
        
        for(let i = 0; i < this.pop_size; i++){

            if(this.flies[i].hitFood){
                this.sucsessRate +=1
                totSucsessRate +=1
            }

            if(this.flies[i].fitness > maxFit){
                maxFit = this.flies[i].fitness;
            }
        }
        
        

        for(let i = 0;i < this.pop_size; i++){
            let poolRank = int(this.flies[i].fitness/maxFit * 40)

            for(let j = 0; j < poolRank;j++){
                this.pool.push(this.flies[i])
            }
        }
    }

    findAverageFitness(){
        let totalFitness = 0;
        
        for(let i = 0;i < this.pop_size;i++){
            totalFitness += this.flies[i].fitness;
        }

        return (totalFitness/this.pop_size).toFixed(1);
    }

    generateNewPop(mutationRate){
        let NewFlies = [];
        for(let i = 0; i < this.pop_size; i++){
           
            let newfly = new Fly(this.life_span, this.reward, this.punishment, this.food);

            let randomA = int(random(0, this.pool.length));
            let randomB = int(random(0, this.pool.length));

            let parentA = this.pool[randomA];
            let parentB = this.pool[randomB];

            newfly.dna.generateMergedDna(mutationRate, parentA, parentB);

            NewFlies.push(newfly);

        }
        return NewFlies;
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