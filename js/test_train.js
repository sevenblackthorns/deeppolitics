import {SimpleArrayRank, ArrayShape, ArrayOp, PrintArray, ArrayReshape, ArrayIndex} from "./arraymath.js";
let Array0 = [[[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]], [[13, 14, 15], [16, 17, 18], [19, 20, 21], [22, 23, 24]]];
let Array1 = ArrayIndex(Array0, [[0, 0, 1], [0, 2, 2], [0, 3, 1]]);
PrintArray(Array1);
PrintArray(ArrayShape(Array1));
let Array2 = ArrayReshape(Array1);
PrintArray(Array2);
PrintArray(ArrayShape(Array2));
