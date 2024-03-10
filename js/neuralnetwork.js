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
        /*
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
        */
        let ArrayIdentity = [];
        let Size = Gradient[1].length;
        for (let i=0; i < Size; i++) {
            ArrayIdentity.push([]);
            for (let j=0; j < Size; j++) {
                if (j == i) {
                    ArrayIdentity[i][j] = 0;
                }
                else {
                    ArrayIdentity[i][j] = 1;
                }
            }
        }
        return ArrayDot(Gradient, ArrayOp(ArrayOp(ArrayOp(Size, this.EPowX, "*"), ArrayOp(this.EPowX, ArrayIdentity, "*"), "*"), ArrayOp(ArraySum(this.EPowX, 1), 2, "**"), "/"));
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
        // this.Outputs = ArrayOp(this.X, ArrayOp(this.Variance, 10 ** -100, "+"), "/");
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
        /*
        let GradientMean = ArrayOp(ArraySum(Gradient, 1), Size, "/");
        let Variance = ArrayOp(ArraySum(ArrayOp(Gradient, 2, "**"), 1), Size, "/");
        let GSubM = ArrayOp(Gradient, GradientMean, "-");
        return ArrayOp(ArrayOp(ArrayOp(ArrayOp(Size, ArrayIdentity, "*"), 1, "-"), ArrayOp(ArrayOp(Size, Variance, "*"), 10 ** -100, "+"), "/"), ArrayOp(ArrayDot(GSubM, ArrayTranspose(GSubM)), ArrayOp(ArrayOp(Size, ArrayOp(Variance, 3, "**"), "*"), 10 ** -100, "+"), "/"), "-");
        */
        // return ArrayDot(Gradient, ArrayOp(ArrayOp(Size ** 2, ArrayOp(ArrayIdentity, ArrayOp(this.Inputs, 2, "**"), "*"), "*"), ArrayOp(Size - 1, ArrayOp(ArraySum(ArrayOp(this.Inputs, 2, "**"), 1), 2, "**"), "*"), "/"));
        // return ArrayDot(Gradient, ArrayOp(ArrayOp(ArrayOp(Size ** 2, ArrayOp(ArrayIdentity, ArrayOp(this.Inputs, 2, "**"), "*"), "*"), ArrayOp(Size - 1, ArrayOp(ArraySum(ArrayOp(this.Inputs, 2, "**"), 1), 2, "**"), "*"), "/"), -1, "*"));
        return ;
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
