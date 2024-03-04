export function SimpleArrayRank(Array0) {
    if (Array.isArray(Array0)) {
        if (Array0.length > 0) {
            let Rank = SimpleArrayRank(Array0[0]) + 1;
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
                if (ArrEl0Shape != ArrayShape(Array0[ArrIndex])) {
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
    console.log("TEST PRINT");
    if (Array.isArray(Array0)) {
        let Output = "[";
        let ArrLength = Array.length;
        if (ArrLength > 0) {
            Output += PrintArray(Array0[0]);
            for (let ArrIndex = 1; ArrIndex < ArrLength; ArrIndex++) {
                Output += ", " + PrintArray(Array0[ArrIndex], Log=false);
            }
        }
        Output += "]";
        if (Log) {
            console.log(Output);
        }
        return Output;
    }
    else {
        return String(Array0);
    }
}
