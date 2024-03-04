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
                    throw "DEEP:0 - INVALID SHAPE ERROR";
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

export function PrintArray(Array0, Log=true) {
    if (Array.isArray(Array0)) {
        let Output = "[";
        let ArrLength = Array0.length;
        if (ArrLength > 0) {
            Output = Output + PrintArray(Array0[0], Log=false);
            for (let ArrIndex = 1; ArrIndex < ArrLength; ArrIndex++) {
                Output = Output + ", " + PrintArray(Array0[ArrIndex], Log=false);
            }
        }
        Output = Output + "]";
        if (Log) {
            console.log(Output);
        }
        return Output;
    }
    else {
        return String(Array0);
    }
}
