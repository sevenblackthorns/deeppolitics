import {SimpleArrayRank, ArrayShape, ArrayOp, PrintArray, ArrayReshape, ArrayIndex, ArrayDot} from "./arraymath.js";
let Array0 = [[0, 1, 0, 1, 0, 1, 0]];
let Array1 = [[0, 1, 2], [0, 1, 2], [0, 0, 1], [2, 0, 1], [2, 0, 0], [1, 2, 0], [1, 2, 0]];
PrintArray(ArrayDot(Array0, Array1));
PrintArray(ArrayShape(ArrayDot(Array0, Array1)));
