import {SimpleArrayRank, ArrayShape, ArrayOp, PrintArray, ArrayReshape, ArrayIndex} from "./arraymath.js";
let Array0 = [[[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]], [[13, 14, 15], [16, 17, 18], [19, 20, 21], [22, 23, 24]]];
PrintArray(ArrayShape(Array0));
PrintArray(ArrayReshape(Array0, [1, 1, 9, 2, 1, 1]));
PrintArray(ArrayShape(ArrayReshape(Array0, [1, 1, 9, 2, 1, 1])))
