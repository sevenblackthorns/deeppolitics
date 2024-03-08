import {SimpleArrayRank, ArrayShape, ArrayOp, PrintArray, ArrayReshape, ArrayIndex, ArrayDot, ArrayRandom, ArrayFill, ArrayTranspose} from "./arraymath.js";
let Array0 = ArrayRandom([200, 50, 10, 32], -1, 1);
PrintArray(Array0);
PrintArray(ArrayShape(Array0));
let Array1 = ArrayRandom([200, 50, 10, 50], -1, 1);
PrintArray(Array1);
PrintArray(ArrayShape(Array1));
let Array1T = ArrayTranspose(Array1);
PrintArray(ArrayShape(Array1T));
let Array2 = ArrayDot(Array0, Array1T);
PrintArray(Array2);
PrintArray(ArrayShape(Array2))
