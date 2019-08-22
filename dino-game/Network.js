class NeuralNetwork {
    constructor(a, b, c, d) {
        
        if(a instanceof tf.Sequential){
            this.model = a;
            this.inputNodes = b;
            this.hiddenNodes = c;
            this.outputNodes = d;
        }
    }
}