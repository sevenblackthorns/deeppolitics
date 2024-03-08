import {SimpleArrayRank, ArrayShape, ArrayOp, PrintArray, ArrayReshape, ArrayIndex, ArrayDot, ArrayRandom, ArrayFill, ArrayTranspose, ArrayWhere} from "./arraymath.js";
import {Dense, PReLU, MSE, MSEd} from "./neuralnetwork.js"
let Layers = [new Dense(4, 2), new PReLU(0.01), new Dense(2, 2), new PReLU(0.01)];
let Data = [[[0, 1, 0, 1], [0, 1]], [[0, 1, 1, 0], [1, 0]], [[1, 0, 0, 1], [1, 0]], [[1, 0, 1, 0], [1, 0]]];
for (let Epoch=0; Epoch < 400; Epoch++) {
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
        console.log("MSE:");
        let Err = MSE(X, Y);
        console.log(Err);
        Loss += Err;
        let Gradient = MSEd(X, Y);
        console.log("GRADIENT:");
        PrintArray(Gradient);
        for (let Layer=Layers.length - 1; Layer >= 0; Layer--) {
            Gradient = Layers[Layer].backward(Gradient, 0.05);
        }
    }
    console.log(Loss / Data.length);
}
