import {SimpleArrayRank, ArrayShape, ArrayOp, PrintArray, ArrayReshape, ArrayIndex, ArrayDot, ArrayRandom, ArrayFill, ArrayTranspose, ArrayWhere, ArraySum} from "./arraymath.js";

export class Dense {
    constructor(InputSize, OutputSize) {
        this.Weights = ArrayRandom([InputSize, OutputSize], -0.5, 0.5);
        this.Biases = ArrayRandom([OutputSize], -0.5, 0.5);
        this.Inputs = [];
    }

    forward(Inputs) {
        this.Inputs = Inputs;
        return ArrayOp(ArrayDot(Inputs, this.Weights, [-2, -2]), this.Biases, "+");
    }

    backward(Gradient, LearningRate) {
        let WeightGradient = ArrayDot(ArrayTranspose(this.Inputs), Gradient, [-2, -2]);
        let InputGradient = ArrayDot(Gradient, ArrayTranspose(this.Weights), [-2, -2]);
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
        return ArrayDot(Gradient, ArrayOp(this.Outputs, ArrayOp(1, this.Outputs, "-"), "*"), [-2, -2]);
    }
}

export class Norm {
    constructor(Axis) {
        this.Inputs = [];
        this.Outputs = [];
        this.Gamma = Math.random();
        this.Beta = Math.random();
        this.Axis = Axis;
    }

    forward(Inputs) {
        this.Inputs = Inputs;
        this.Mu = ArrayOp(ArraySum(Inputs, 1), ArrayShape(Inputs)[this.Axis], "/");
        this.X = ArrayOp(Inputs, this.Mu, "-");
        this.Variance = ArrayOp(ArraySum(ArrayOp(this.X, 2, "**"), this.Axis), ArrayShape(Inputs)[this.Axis], "/");
        this.Outputs = ArrayOp(ArrayOp(ArrayOp(this.X, ArrayOp(this.Variance, 10 ** -100, "+"), "/"), this.Gamma, "*"), this.Beta, "+");
        return this.Outputs;
    }

    backward(Gradient, LearningRate) {
        let InputGradient = 0;
        let GammaGradient = ArraySum(ArrayOp(ArrayOp(Gradient, this.Outputs, "*"), ArrayShape(Inputs)[this.Axis], "/").flat(), 0);
        this.Gamma = ArrayOp(this.Gamma, ArrayOp(GammaGradient[0], LearningRate, "*"), "-");
        this.Beta = ArrayOp(this.Beta, ArrayOp(ArraySum(ArrayOp(Gradient, ArrayShape(Inputs)[this.Axis], "/").flat(), 0), LearningRate, "*"), "-");
        return InputGradient;
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
