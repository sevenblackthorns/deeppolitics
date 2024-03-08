import {SimpleArrayRank, ArrayShape, ArrayOp, PrintArray, ArrayReshape, ArrayIndex, ArrayDot, ArrayRandom, ArrayFill, ArrayTranspose, ArrayWhere} from "./arraymath.js";

export class Dense {
    constructor(InputSize, OutputSize) {
        this.Weights = ArrayRandom([InputSize, OutputSize], -1, 1);
        this.Biases = ArrayRandom([OutputSize], -1, 3);
        this.Inputs = [];
    }

    forward(Inputs) {
        this.Inputs = Inputs;
        return ArrayOp(ArrayDot(Inputs, this.Weights), Biases, "+");
    }

    backward(Gradient, LearningRate) {
        let WeightGradient = ArrayDot(ArrayTranspose(this.Inputs), Gradient);
        let InputGradient = ArrayDot(Gradient, ArrayTranspose(this.Weights));
        this.Weights = ArrayOp(this.Weights, ArrayOp(WeightGradient, LearningRate, "*"));
        this.Biases = ArrayOp(this.Biases, ArrayOp(Gradient, LearningRate, "*"));
        return InputGradient;
    }
}
