import {SimpleArrayRank, ArrayShape, ArrayOp, PrintArray, ArrayReshape, ArrayIndex, ArrayDot, ArrayRandom, ArrayTranspose} from "./arraymath.js";
let Array0 = ArrayRandom([100, 5, 8, 10], -1, 1);
PrintArray(Array0);
PrintArray(ArrayShape(Array0));
let Array1 = ArrayRandom([100, 5, 8, 10], -1, 1);
PrintArray(Array1);
PrintArray(ArrayShape(Array1));
PrintArray(ArrayDot(Array0, ArrayTranspose(Array1, [0, 1]), [0, 1]));
PrintArray(ArrayShape(ArrayDot(Array0, ArrayTranspose(Array1), [0, 1])));
