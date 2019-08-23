class Selection {
    constructor() {

    }

    createNewGen(numDinos, lastGeneration, mutationRate) {

        this.lastGeneration = lastGeneration;

        var dinos = [];

        var selectionPool = this.getSelectionPool(lastGeneration);

        for (let i = 0; i < numDinos; i++) {

            var dinoToPick = int(random(0, selectionPool.length));

            var selectedDinoBrain = selectionPool[dinoToPick].brain.copy();
            selectedDinoBrain.mutate(mutationRate);

            var newDino = new Dino(false, selectedDinoBrain);

            dinos.push(newDino);
        }

        return dinos;

    }

    // We are not breeding instead using something closer to natural selection
    getSelectionPool(lastGeneration) {

        var maxScore = 0;
        var selectionPool = [];

        for (let i = 0; i < this.lastGeneration.length; i++) {
            if (this.lastGeneration[i].score > maxScore && !this.lastGeneration[i].playerControled) {
                maxScore = this.lastGeneration[i].score;
            }
        }

        for (let i = 0; i < this.lastGeneration.length; i++) {

            if (!this.lastGeneration[i].playerControled) {

                var selectionCount = (lastGeneration[i].score / maxScore) * 10;

                for (var j = 0; j < selectionCount; j++) {
                    selectionPool.push(this.lastGeneration[i])
                }
            }
        }

        return selectionPool;
    }
}