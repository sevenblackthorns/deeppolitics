import {SimpleArrayRank, ArrayShape, ArrayOp, PrintArray, ArrayReshape, ArrayIndex, ArrayDot, ArrayRandom} from "./arraymath.js";
let Array0 = ArrayRandom([1, 6, 1, 1, 7, 1], -10, 10);
PrintArray(Array0);
PrintArray(ArrayShape(Array0));
let Array1 = ArrayRandom([1, 7, 1, 1, 3, 1], -10, 10);
PrintArray(Array1);
PrintArray(ArrayShape(Array1));
PrintArray(ArrayDot(Array0, Array1, [1, 4]));
PrintArray(ArrayShape(ArrayDot(Array0, Array1, [1, 4])));
