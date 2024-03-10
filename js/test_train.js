import {SimpleArrayRank, ArrayShape, ArrayOp, PrintArray, ArrayReshape, ArrayIndex, ArrayDot, ArrayRandom, ArrayFill, ArrayTranspose, ArrayWhere} from "./arraymath.js";
import {Dense, PReLU, CrossEntropyLoss, Softmax, Norm} from "./neuralnetwork.js";

let Layers = [new Dense(4, 2), new PReLU(0.01), new Norm(), new Dense(2, 2), new PReLU(0.01), new Norm(), new Softmax()];
let Data = [[[0, 1, 0, 1], [0, 1]], [[0, 1, 1, 0], [1, 0]], [[1, 0, 0, 1], [1, 0]], [[1, 0, 1, 0], [0, 1]]];
for (let Epoch=0; Epoch < 1000; Epoch++) {
    let Loss = 0;
    for (let i=0; i < Data.length; i++) {
        let X = ArrayReshape(Data[i][0], [1, 4]);
        let Y = ArrayReshape(Data[i][1], [1, 2]);
        for (let Layer=0; Layer < Layers.length; Layer++) {
            X = Layers[Layer].forward(X);
        }
        console.log("X:");
        PrintArray(X);
        console.log("Y:");
        PrintArray(Y);
        console.log("ERROR:");
        let Err = CrossEntropyLoss(X, Y);
        console.log(Err);
        Loss += ArraySum(Err, 0) / X.length;
        let Gradient = Err;
        console.log("GRADIENT:");
        PrintArray(Gradient);
        for (let Layer=Layers.length - 1; Layer >= 0; Layer--) {
            Gradient = Layers[Layer].backward(Gradient, 0.1);
        }
    }
    console.log(Loss / Data.length);
}
