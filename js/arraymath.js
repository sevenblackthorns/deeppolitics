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
    let ShapeT = [];
    for (let i=0; i < Shape0.length; i++) {
        if (i == Axes[1]) {
            ShapeT.push(Shape1[i]);
        }
        else {
            ShapeT.push(Shape0[i]);
        }
    }
    if (Shape0[Axes[1]] != Shape1[Axes[0]]) {
        throw "DEEP:4 - " + Shape0 + "'S DIMENSION " + Axes[1] + " AND " + Shape1 + "'S DIMENSION " + Axes[0] + " DO DO NOT MATCH.";
    }
    if (Axes[0] == 0) {
        let Array2 = [];
        let Index0 = [];
        let Index1 = [];
        for (let i=0; i < Axes[1] + 1; i++) {
            Index0.push([0, Shape0[i] - 1, 1]);
            Index1.push([0, Shape1[i] - 1, 1]);
        }
        for (let i=0; i < Shape0[Axes[0]]; i++) {
            Array2.push([]);
            for (let j=0; j < Shape1[Axes[1]]; j++) {
                let Sum = ArrayFill(ArrayIndex(ShapeT, [[Axes[1] - 1, ShapeT.length - 1, 1]]), 0);
                for (let k=0; k < Shape1[Axes[0]]; k++) {
                    Index0[Axes[0]] = [i, i, 1];
                    Index1[Axes[0]] = [k, k, 1];
                    Index0[Axes[1]] = [k, k, 1];
                    Index1[Axes[1]] = [j, j, 1];
                    Sum = ArrayOp(Sum, ArrayOp(ArrayIndex(Array0, Index0), ArrayIndex(Array1, Index1), "*"), "+");
                }
                Array2[i].push(Sum);
            }
        }
        return Array2;
    }
    else {
        let Array2 = [];
        let Index0 = [];
        let Index1 = [];
        for (let i=0; i < Axes[1] + 1; i++) {
            Index0.push([0, Shape0[i] - 1, 1]);
            Index1.push([0, Shape1[i] - 1, 1]);
        }
        for (let i=0; i < Shape0[Axes[0]]; i++) {
            Array2[i] = ArrayDot(Array0[i % Array0.length], Array1[i % Array1.length], ArrayOp(Axes, 1, "-"));
        }
        return Array2;
    }
}

export function ArrayTranspose(Array0, Axes) {
    let Array0T = [];
    let Shape0 = ArrayShape(Array0);
    for (let i=0; i < Shape0[Axes[0]]; i++) {
        for (let j=0; j < Shape0[Axes[1]]; j++) {
            
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
