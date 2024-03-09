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
        let ArrayIdentity = [];
        let ArrayTiled = [];
        // let Size = ArraySum(ArrayShape(Gradient), 0);
        let Size = Gradient[0].length;
        for (let i=0; i < Size; i++) {
            ArrayIdentity.push([]);
            ArrayTiled.push(this.Outputs);
            for (let j=0; j < Size; j++) {
                if (j == i) {
                    ArrayIdentity[i][j] = 1;
                }
                else {
                    ArrayIdentity[i][j] = 0;
                }
            }
        }
        ArrayTiled = ArrayReshape(ArrayTiled, ArrayShape(ArrayIdentity));
        return ArrayDot(Gradient, ArrayOp(ArrayTiled, ArrayOp(ArrayIdentity, ArrayTiled, "-"), "*"));
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
        this.Variance = ArrayOp(ArraySum(ArrayOp(Inputs, 2, "**"), 1), Inputs[0].length, "/");
        this.Outputs = ArrayOp(this.X, this.Variance, "/");
        return this.Outputs;
    }

    backward(Gradient, _LearningRate) {
        let ArrayIdentity = [];
        let Size = Gradient[0].length;
        for (let i=0; i < Size; i++) {
            ArrayIdentity.push([]);
            for (let j=0; j < Size; j++) {
                if (j == i) {
                    ArrayIdentity[i][j] = 1;
                }
                else {
                    ArrayIdentity[i][j] = 0;
                }
            }
        }
        return ArrayOp(ArrayOp(ArrayOp(ArrayOp(Size, 3, "**"), Gradient, "*"), -1, "*"), ArrayOp(ArrayOp(ArrayOp(Size, 1, "-"), 2, "**"), this.Inputs, "*"), "/");
        // return ArrayOp(ArrayOp(ArrayOp(ArrayOp(Size, ArrayIdentity, "*"), 1, "-"), ArrayOp(Size, this.Variance, "*"), "/"), ArrayDot(, ), "-");
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
