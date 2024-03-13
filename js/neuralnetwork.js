import {SimpleArrayRank, ArrayShape, ArrayOp, PrintArray, ArrayReshape, ArrayIndex, ArrayDot, ArrayRandom, ArrayFill, ArrayTranspose, ArrayWhere, ArraySum} from "./arraymath.js";

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

export class Softmax {
    constructor() {
        this.Inputs = [];
        this.EPowX = [];
        this.Outputs = [];
    }

    forward(Inputs) {
        this.Inputs = Inputs;
        this.EPowX = ArrayOp(Math.E, Inputs, "**");
        this.Outputs = ArrayOp(this.EPowX, ArraySum(this.EPowX, 1), "/");
        return this.Outputs;
    }

    backward(Gradient, _LearningRate) {
        let Diag = [];
        for (let i = 0; i < Gradient[0].length; i++) {
            Diag.push([]);
            for (let j = 0; i < Gradient[0].length; i++) {
                if (i == j) {
                    Diag[i][j] = ArrayOp(1, Gradient[i], "-");
                }
                else {
                    Diag[i][j] = ArrayOp(Gradient[j], -1, "*")
                }
            }
        }
        return ArrayDot(Gradient, Diag);
    }
}

export class Norm {
    constructor() {
        this.Inputs = [];
        this.Outputs = [];
    }

    forward(Inputs) {
        this.Inputs = Inputs;
        this.Mu = ArrayOp(ArraySum(Inputs, 1), Inputs[0].length, "/");
        this.X = ArrayOp(Inputs, this.Mu, "-");
        this.Variance = ArrayOp(ArraySum(ArrayOp(this.X, 2, "**"), 1), Inputs[0].length, "/");
        this.Outputs = ArrayOp(this.X, ArrayOp(this.Variance, 10 ** -100, "+"), "/");
        return this.Outputs;
    }

    backward(Gradient, _LearningRate) {
        return Gradient;
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

export function CrossEntropyLoss(Outputs, Targets) {
    return ArrayOp(ArrayOp(Targets, ArrayOp(Outputs, Math.E, "log"), "+"), -1, "*");
}

export function CELd(Outputs, Targets) {
    return ArrayOp(Outputs, Targets, "-");
}
