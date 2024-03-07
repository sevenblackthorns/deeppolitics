import {SimpleArrayRank, ArrayShape, ArrayOp, PrintArray, ArrayReshape, ArrayIndex, ArrayDot} from "./arraymath.js";
let Array0 = [[1, 2, 3, 1, 2, 3, 7]];
let Array1 = [[3, 1, 4], [1, 5, 3], [5, 6, 2], [9, 1, 4], [1, 7, 7], [7, 7, 7], [6, 6, 6]];
PrintArray(ArrayDot(Array0, Array1));
PrintArray(ArrayShape(ArrayDot(Array0, Array1)));
