import {SimpleArrayRank, ArrayShape, ArrayAdd, PrintArray} from "./arraymath.js";
let Array0 = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]];
console.log(SimpleArrayRank(Array0));
PrintArray(ArrayShape(Array0), true);
PrintArray(Array0, true);
let Array1 = ArrayAdd(Array0, Array0);
PrintArray(Array1);
