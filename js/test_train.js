import {SimpleArrayRank, ArrayShape, ArrayOp, PrintArray, ArrayReshape, ArrayIndex, ArrayDot, ArrayRandom, ArrayFill, ArrayTranspose, ArrayWhere} from "arraymath.js";
import {Dense, PReLU, MSE, MSEd} from "neuralnetwork.js"
let Layers = [Dense(4, 2), PReLU(0.01), Dense(2, 2), PReLU(0.01)];
let Data = [[[0, 1, 0, 1], [0, 1]], [[0, 1, 1, 0], [1, 0]], [[1, 0, 0, 1], [1, 0]], [[1, 0, 1, 0], [1, 0]]];
for (let Epoch=0; Epoch < 100; Epoch++) {
    for (let i=0; i < Data.length; i++) {
        let X = ArrayReshape(Data[i][0], [1, 4]);
        let Y = ArrayReshape(Data[i][1], [1, 2]);
        for (let Layer=0; Layer < Layers.length; Layer++) {
            X = Layers[Layer].forward(X);
        }
        ArrayPrint(X, Y);
        ArrayPrint(MSE(X, Y));
        let Gradient = MSEd(X, Y);
        ArrayPrint(Gradient);
        for (let Layer=Layers.length - 1; Layer >= 0; Layer--) {
            Gradient = Layers[Layer].backward(Gradient);
        }
    }
}
