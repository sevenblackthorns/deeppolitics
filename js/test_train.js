import {SimpleArrayRank, ArrayShape, ArrayOp, PrintArray, ArrayReshape, ArrayIndex, ArrayDot, ArrayRandom, ArrayFill, ArrayTranspose, ArrayWhere, ArraySum} from "./arraymath.js";
import {Dense, PReLU, CrossEntropyLoss, Softmax, Norm, CELd} from "./neuralnetwork.js";

let Layers = [new Dense(4, 2), new PReLU(0.01), new Dense(2, 2), new PReLU(0.01), new Softmax()];
let Data = [[[0, 1, 0, 1], [0, 1]], [[0, 1, 1, 0], [1, 0]], [[1, 0, 0, 1], [1, 0]], [[1, 0, 1, 0], [0, 1]]];
for (let Epoch=0; Epoch < 1000; Epoch++) {
    let Loss = 0;
    for (let i=0; i < Data.length; i++) {
        let X = ArrayReshape(Data[i][0], [1, 4]);
        let Y = ArrayReshape(Data[i][1], [1, 2]);
        for (let Layer=0; Layer < Layers.length; Layer++) {
            X = Layers[Layer].forward(X);
            console.log(Layer)
        }
        console.log("X:");
        PrintArray(X);
        console.log("Y:");
        PrintArray(Y);
        console.log("ERROR:");
        let Err = CrossEntropyLoss(X, Y);
        console.log(Err);
        console.log(ArraySum(Err.flat(2), 0) / X.length / X[0].length);
        Loss += ArraySum(Err.flat(2), 0) / X.length / X[0].length;
        let Gradient = CELd(X, Y);
        console.log(Gradient);
        for (let Layer=Layers.length - 1; Layer >= 0; Layer--) {
            Gradient = Layers[Layer].backward(Gradient, 0.1);
            console.log(Gradient)
        }
    }
    console.log(Loss / Data.length);
}
