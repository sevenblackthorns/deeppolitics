import {SimpleArrayRank, ArrayShape, ArrayOp, PrintArray, ArrayReshape, ArrayIndex, ArrayDot, ArrayRandom, ArrayFill, ArrayTranspose, ArrayWhere} from "./arraymath.js";

export class Dense {
    constructor(InputSize, OutputSize) {
        this.Weights = ArrayRandom([InputSize, OutputSize], -0.5, 0.5);
        this.Biases = ArrayRandom([OutputSize], -0.5, 0.5);
        this.Inputs = [];
    }

    forward(Inputs) {
        this.Inputs = Inputs;
        return ArrayOp(ArrayDot(Inputs, this.Weights), this.Biases, "+");
    }

    backward(Gradient, LearningRate) {
        let WeightGradient = ArrayDot(ArrayTranspose(this.Inputs), Gradient);
        let InputGradient = ArrayDot(Gradient, ArrayTranspose(this.Weights));
        this.Weights = ArrayOp(this.Weights, ArrayOp(WeightGradient, LearningRate, "*"), "-");
        this.Biases = ArrayOp(this.Biases, ArrayOp(Gradient, LearningRate, "*"), "-");
        return InputGradient;
    }
}

export class PReLU {
    constructor(Param) {
        this.Inputs = [];
        this.Param = Param;
    }

    forward(Inputs) {
        this.Inputs = Inputs;
        return ArrayWhere(ArrayOp(Inputs, 0, "<"), ArrayOp(Inputs, this.Param, "*"), Inputs);
    }

    backward(Gradient, _LearningRate) {
        return ArrayWhere(ArrayOp(this.Inputs, 0, "<"), ArrayOp(Gradient, this.Param, "*"), Gradient);
    }
}

export function MSE(Outputs, Targets) {
    let SE = ArrayOp(ArrayOp(Outputs, Targets, "-"), 2, "**");
    let SSE = 0;
    let SEFlat = SE.flat();
    for (let i=0; i < SEFlat.length; i++) {
        SSE += SEFlat[i];
    }
    return ArrayOp(SSE, Outputs.length, "/");
}

export function MSEd(Outputs, Targets) {
    let SE = ArrayOp(ArrayOp(Outputs, Targets, "-"), 2, "*");
    return ArrayOp(SE, Outputs.length, "/");
}
