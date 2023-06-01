class CubicBezier extends Bezier {
    constructor(start, end, c1, c2) {
        super([start, c1, c2, end]);
    }
}