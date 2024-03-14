class DeepArray {
    constructor(Data, Shape, Size, Rank) {
        this.Data = Data;
        this.Shape = Shape;
        this.Size = Size;
        this.Rank = Rank;
    }
}

ArrayShape(Data) {
    if (typeof(Data) == Number || typeof(Data) == Boolean) {
        return [];
    }
    let Shape0 = ArrayShape(Data[0]);
    for (let i = 1; i < Data.length; i++) {
        if (ArrayShape(Data[i]) != Shape0) {
            throw "ARRAY MATH ERROR: ARRAY SHAPE: ASYMMETRIC ARRAY.";
        }
    }
    return [Data.length].concat(Shape0)
}
