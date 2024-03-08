import {SimpleArrayRank, ArrayShape, ArrayOp, PrintArray, ArrayReshape, ArrayIndex, ArrayDot, ArrayRandom, ArrayFill, ArrayTranspose, ArrayWhere} from "./arraymath.js";
let Array0 = ArrayRandom([5, 5], -10, 10);
PrintArray(Array0);
PrintArray(ArrayWhere(ArrayOp(Array0, 0, ">")), Array0, ArrayFill([5, 5], 0));
