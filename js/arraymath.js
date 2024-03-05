export function SimpleArrayComparison(Arrays) {
    for (let ArrIndex = 1; ArrIndex < Arrays.length; ArrIndex++) {
        if (Arrays[ArrIndex].length != Arrays[ArrIndex].length) {
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
                if (SimpleArrayComparison([ArrEl0Shape, ArrayShape(Array0[ArrIndex])])) {
                    throw "DEEP:0 - INVALID SHAPE ERROR.";
                }
            }
            return [ArrLength].concat(ArrEl0Shape);
        }
        else {
            return [0];
        }
    }
    else {
        return [0];
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

export function ArrayAdd(Array0, Array1) {
    if (Array.isArray(Array0) == false && Array.isArray(Array1) == false) {
        return Array0 + Array1;
    }
    let Rank0 = SimpleArrayRank(Array0);
    let Rank1 = SimpleArrayRank(Array0);
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
    let Shape1 = ArrayShape(Array1);
    for (let i=0; i < Shape0.length; i++) {
        if (Shape0[i] % Shape1[i] == 0 || Shape1[i] % Shape0[i] == 0) {
            let Array2 = [];
            for (let i=0; i < Math.max(Shape0[0], Shape1[0]); i++) {
                Array2[i] = ArrayAdd(Array0[i % Shape0[0]], Array1[i % Shape0[1]]);
            }
            return Array2;
        }
        else {
            throw "DEEP:1 - INCOMPATIBLE SHAPES ERROR.";
        }
    }
}
