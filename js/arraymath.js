export function SimpleArrayComparison(Arrays) {
    for (let ArrIndex = 1; ArrIndex < Arrays.length; ArrIndex++) {
        if (Arrays[ArrIndex].length != Arrays[0].length) {
            return false;
        }
    }
    for (let ArrIndex = 0; ArrIndex < Arrays[0].length; ArrIndex++) {
        for (let ArrIndex0 = 1; ArrIndex0 < Arrays.length; ArrIndex0++) {
            if (Arrays[ArrIndex0][ArrIndex] != Arrays[0][ArrIndex]) {
                return false;
            }
        }
    }
    return true;
}

export function SimpleArrayRank(Array0) {
    if (Array.isArray(Array0)) {
        if (Array0.length > 0) {
            return SimpleArrayRank(Array0[0]) + 1;
        }
    }
    return -1;
}

export function ArrayShape(Array0) {
    if (Array.isArray(Array0)) {
        let ArrLength = Array0.length;
        if (ArrLength > 0) {
            let ArrEl0Shape = ArrayShape(Array0[0]);
            for (let ArrIndex = 1; ArrIndex < ArrLength; ArrIndex++) {
                if (SimpleArrayComparison([ArrEl0Shape, ArrayShape(Array0[ArrIndex])]) == false) {
                    throw "DEEP:0 - INVALID SHAPE ERROR.";
                }
            }
            return [ArrLength].concat(ArrEl0Shape);
        }
        else {
            return [];
        }
    }
    else {
        return [];
    }
}

export function PrintArrayLogless(Array0) {
    if (Array.isArray(Array0)) {
        let Output = "[";
        let ArrLength = Array0.length;
        if (ArrLength > 0) {
            Output = Output.concat(PrintArray(Array0[0]));
            for (let ArrIndex = 1; ArrIndex < ArrLength; ArrIndex++) {
                Output = Output.concat(", ", PrintArray(Array0[ArrIndex]));
            }
        }
        Output = Output.concat("]");
        return Output;
    }
    else {
        return String(Array0);
    }
}

export function PrintArray(Array0) {
    if (Array.isArray(Array0)) {
        let Output = "[";
        let ArrLength = Array0.length;
        if (ArrLength > 0) {
            Output = Output.concat(PrintArrayLogless(Array0[0]));
            for (let ArrIndex = 1; ArrIndex < ArrLength; ArrIndex++) {
                Output = Output.concat(", ", PrintArrayLogless(Array0[ArrIndex]));
            }
        }
        Output = Output.concat("]");
        console.log(Output);
        return Output;
    }
    else {
        return String(Array0);
    }
}

export function ArrayOp(Array0, Array1, Op) {
    if (Array.isArray(Array0) == false && Array.isArray(Array1) == false) {
        if (Op == "+") {
            return Array0 + Array1;
        }
        else if (Op == "-") {
            return Array0 - Array1;
        }
        else if (Op == "*") {
            return Array0 * Array1;
        }
        else if (Op == "/") {
            return Array0 / Array1;
        }
        else if (Op == "**") {
            return Array0 ** Array1;
        }
        else if (Op == "==") {
            return Array0 == Array1;
        }
        else if (Op == ">") {
            return Array0 > Array1;
        }
        else if (Op == "<") {
            return Array0 < Array1;
        }
        else if (Op == ">=") {
            return Array0 >= Array1;
        }
        else if (Op == "<=") {
            return Array0 <= Array1;
        }
        else if (Op == "!=") {
            return Array0 != Array1;
        }
        else if (Op == "log") {
            return Math.log(Array0, Array1);
        }
        else {
            throw "DEEP:2 - INVALID OPERATOR ERROR";
        }
    }
    let Rank0 = SimpleArrayRank(Array0);
    let Rank1 = SimpleArrayRank(Array1);
    let DepthDiff = Math.abs(Rank0 - Rank1);
    if (Rank0 < Rank1) {
        for (let i=0; i < DepthDiff; i++) {
            Array0 = [Array0];
        }
    }
    else {
        for (let i=0; i < DepthDiff; i++) {
            Array1 = [Array1];
        }
    }
    let Shape0 = ArrayShape(Array0);
    let Shape1 = ArrayShape(Array1);
    if (Shape0[Shape0.length - 1] == 0) {
        Shape0.pop();
    }
    if (Shape1[Shape1.length - 1] == 0) {
        Shape1.pop();
    }
    for (let i=0; i < Shape0.length; i++) {
        if (Shape0[i] % Shape1[i] == 0 || Shape1[i] % Shape0[i] == 0) {
            let Array2 = [];
            for (let i=0; i < Math.max(Shape0[0], Shape1[0]); i++) {
                Array2[i] = ArrayOp(Array0[i % Shape0[0]], Array1[i % Shape1[0]], Op);
            }
            return Array2;
        }
        else {
            throw "DEEP:1 - SHAPES " + Shape0 + " AND " + Shape1 + " ARE NOT COMPATIBLE.";
        }
    }
}

export function ArrayIndex(Array0, Indexes) {
    let Array0View = [];
    let Start = Indexes[0][0];
    let End = Indexes[0][1];
    let Step = Indexes[0][2];
    let NewIndexes = [];
    for (let i=1; i <= Indexes.length; i++) {
        NewIndexes.push(Indexes[i]);
    }
    for (let i=Start; i <= End; i += Step) {
        if (NewIndexes.length > 0) {
            if (NewIndexes[0] != undefined) {
                Array0View.push(ArrayIndex(Array0[i], NewIndexes));
            }
            else {
                Array0View.push(Array0[i]);
            }
        }
        else {
            Array0View.push(Array0[i]);
        }
    }
    return  Array0View;
}

export function SimpleArraySum(Array0) {
    let Array1 = Array0.flat(SimpleArrayRank(Array0));
    let Sum = 0;
    for (let i=0; i < Array1.length; i++) {
        Sum += Array1[i];
    }
    return Sum;
}

export function SubArrayReshape(Array0, NewShape0) {
    let Shape0 = ArrayShape(Array0);
    let FlatArray0 = Array0;
    let NewArray0 = [];
    let NewSize0 = 1;
    for (let i=0; i < NewShape0.length; i++) {
        NewSize0 *= NewShape0[i];
    }
    let SubSize0 = NewSize0 / NewShape0[0];
    if (NewShape0.length > 1) {
        let SubArrayShape0 = ArrayIndex(NewShape0, [[1, NewShape0.length - 1, 1]]);
        let SubArrayShape0Mul = 1;
        for (let i=0; i < NewShape0[0]; i++) {
            NewArray0[i] = SubArrayReshape(ArrayIndex(FlatArray0, [[i * SubSize0, (i + 1) * (SubSize0) - 1, 1]]), SubArrayShape0);
        }
    }
    else {
        NewArray0 = FlatArray0;
    }
    return NewArray0;
}

export function ArrayReshape(Array0, NewShape0) {
    let Shape0 = ArrayShape(Array0);
    let Size0 = 1;
    for (let i=0; i < Shape0.length; i++) {
        Size0 *= Shape0[i];
    }
    let NewSize0 = 1;
    for (let i=0; i < NewShape0.length; i++) {
        NewSize0 *= NewShape0[i];
    }
    let SubSize0 = NewSize0 / NewShape0[0];
    if (Size0 != NewSize0) {
        throw "DEEP:3 - SHAPES " + Shape0 + " AND " + NewShape0 + " DO NOT HAVE EQUAL SIZES " + Size0 + " AND " + NewSize0 + ".";
    }
    let FlatArray0 = Array0.flat(Shape0.length);
    let NewArray0 = [];
    if (NewShape0.length > 1) {
        let SubArrayShape0 = ArrayIndex(NewShape0, [[1, NewShape0.length - 1, 1]]);
        for (let i=0; i < NewShape0[0]; i++) {
            NewArray0[i] = SubArrayReshape(ArrayIndex(FlatArray0, [[i * SubSize0, (i + 1) * (SubSize0) - 1, 1]]), SubArrayShape0);
        }
    }
    else {
        NewArray0 = FlatArray0;
    }
    return NewArray0;
}

export function ArrayDot(Array0, Array1, Axes) {
    let Shape0 = ArrayShape(Array0);
    let Shape1 = ArrayShape(Array1);
    for (let i = 0; i < (Shape0.length - Shape1.length); i++) {
        Array1 = [Array1];
        Shape1 = [1].concat(Shape1);
    }
    for (let i = 0; i < (Shape1.length - Shape0.length); i++) {
        Array0 = [Array0];
         Shape0 = [1].concat(Shape0);
    }
    if (Axes[0] < 0) {
        Axes[0] = Shape0.length + Axes[0];
    }
    if (Axes[1] < 0) {
        Axes[1] = Shape1.length + Axes[1];
    }
    if (Shape0[Axes[0] + 1] != Shape1[Axes[1]]) {
        throw "DEEP: 4 - INNER DIMENSION NOT MATCHING ERROR.";
    }
    else if (Axes[0] != 0 && Axes[1] == 0) {
        let Array2 = [];
        if (Shape0[0] % Shape1[0] != 0 && Shape1[0] % Shape0[0] != 0) {
            throw "DEEP: 5 - DIMENSIONS NOT EQUAL.";
        }
        for (let i = 0; i < max(Shape0[0], Shape1[0]); i++) {
            Array2 = ArrayDot(Array0[i % Shape0[0]], Array1, [Axes[0] - 1, 0]);
        }
    }
    else if (Axes[0] == 0 && Axes[1] != 0) {
        let Array2 = [];
        if (Shape0[0] % Shape1[0] != 0 && Shape1[0] % Shape0[0] != 0) {
            throw "DEEP: 5 - DIMENSIONS NOT EQUAL.";
        }
        for (let i = 0; i < max(Shape0[0], Shape1[0]); i++) {
            Array2 = ArrayDot(Array0, Array1[i % Shape1[0]], [0, Axes[1] - 1]);
        }
    }
    else if (Axes[0] == 0 && Axes[1] == 0) {
        let Array2 = [];
        for (let i = 0; i < Shape0[0]; i++) {
            Array2[i] = [];
            for (let j = 0; j < Shape1[1]; j++) {
                let sum = 0;
                for (let k = 0; k < Shape0[1]; k++) {
                    sum = ArrayOp(sum, ArrayOp(Array0[i][k], Array1[k][j], "*"), "+");
                }
                Array2[i][j] = sum;
            }
        }
        return Array2;
    }
    else {
        let Array2 = [];
        if (Shape0[0] % Shape1[0] != 0 && Shape1[0] % Shape0[0] != 0) {
            throw "DEEP: 5 - DIMENSIONS NOT EQUAL.";
        }
        for (let i = 0; i < max(Shape0[0], Shape1[0]); i++) {
            Array2 = ArrayDot(Array0[i % Shape0[0]], Array1[i % Shape1[0]], ArrayOp(Axes, 1, "-"));
        }
        return Array2;
    }
}

export function ArrayTranspose(Array0) {
    let Shape0 = ArrayShape(Array0);
    let Array0T = ArrayFill([Shape0[1], Shape0[0]], 0);
    for (let i=0; i < Shape0[0]; i++) {
        for (let j=0; j < Shape0[1]; j++) {
            Array0T[j][i] = Array0[i][j];
        }
    }
    return Array0T;
}

export function ArrayRandom(Shape0, Min, Max) {
    let Size0 = 1;
    let Array0 = []
    for (let i=0; i < Shape0.length; i++) {
        Size0 *= Shape0[i];
    }
    for (let i=0; i < Size0; i++) {
        Array0.push(Math.random() * (Max - Min) + Min);
    }
    return ArrayReshape(Array0, Shape0);
}

export function ArrayFill(Shape0, Filler) {
    let Size0 = 1;
    let Array0 = []
    for (let i=0; i < Shape0.length; i++) {
        Size0 *= Shape0[i];
    }
    for (let i=0; i < Size0; i++) {
        Array0.push(Filler);
    }
    return ArrayReshape(Array0, Shape0);
}

export function ArrayWhere(BoolArray, TrueArray, FalseArray) {
    let Rank0 = SimpleArrayRank(BoolArray);
    let Array0 = BoolArray.flat(Rank0);
    let TrueArrayF = [];
    let FalseArrayF = [];
    if (Array.isArray(TrueArray)) {
        TrueArrayF = TrueArray.flat(Rank0);
    }
    else {
        TrueArrayF = ArrayFill([Array0.length], TrueArray);
    }
    if (Array.isArray(FalseArray)) {
        FalseArrayF = FalseArray.flat(Rank0);
    }
    else {
        FalseArrayF = ArrayFill([Array0.length], FalseArray);
    }
    for (let i=0; i < Array0.length; i++) {
        if (Array0[i] == true) {
            Array0[i] = TrueArrayF[i];
        }
        else {
            Array0[i] = FalseArrayF[i];
        }
    }
    return ArrayReshape(Array0, ArrayShape(BoolArray));
}

export function ArraySum(Array0, Axis) {
    if (Axis == 0) {
        let Sum = 0;
        for (let i=0; i < Array0.length; i++) {
            Sum = ArrayOp(Sum, Array0[i], "+");
        }
        return Sum;
    }
    else {
        let Sum = 0;
        for (let i=0; i < Array0.length; i++) {
            Sum = ArrayOp(Sum, ArraySum(Array0[i], Axis - 1), "+");
        }
        return Sum;
    }
}
