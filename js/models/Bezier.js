class Bezier {
    constructor(lines) {
        this.resolution = 1000
        this.lines = lines ? lines : [];
        this.tPoint = this.lines.length ? this.lines[0].p1 : new Point(0, 0);
        this.tValue = 1;
        this.tIncrement = 1 / this.resolution;

        this.lines = [];
        this.tempLines = [];

        this.curve = new Curve();

        this.color = "white";
        this.lineWidth = 2;
    }
    addLine(line) {
        this.lines.push(line);
        this.updateCurve();
    }
    updateCurve() {
        this.curve.coords = [];
        for (let tempT = 0; tempT <= this.tValue; tempT += this.tIncrement) {
            this.curve.coords.push(this.calculateTPoint(this.lines, tempT, false));
        }
    }
    incrementTValue(scale = 1) {
        if (this.lines.length === 0) return;
        this.tValue += this.tIncrement * scale;
        console.log(scale);
        this.updateCurve();
    }
    teste() {
        console.log("teste");
    }
    draw(ctx) {
        if (this.lines.length === 0) return;

        // Draw lines
        for (let i = 0; i < this.lines.length; i++) {
            this.lines[i].color = "#dddddd44";
            this.lines[i].draw(ctx);
        }

        // draw bezier curve
        this.curve.color = this.color;
        this.curve.lineWidth = this.lineWidth;
        this.curve.draw(ctx);

        // Draw tPoint
        this.tempLines = [];
        const tPointCoords = this.calculateTPoint(this.lines, this.tValue, true);
        this.tPoint = new Point(tPointCoords[0], tPointCoords[1]);
        this.tPoint.fill = false;
        this.tPoint.radius = 6;
        this.tPoint.color = "red";
        this.tPoint.draw(ctx);

        //draw tempLines
        for (let i = 0; i < this.tempLines.length; i++) {
            this.tempLines[i].color = "#dddddd44";
            this.tempLines[i].lineWidth = 1;
            this.tempLines[i].draw(ctx);
        }

    }
    calculateTPoint(lines, t, draw = false) {
        if (lines.length === 1) {
            return lines[0].lerp(t);
        } else {
            const recursiveTempLines = [];
            for (let i = 0; i < lines.length - 1; i++) {
                const lerpCoords1 = lines[i].lerp(t);
                const lerpCoords2 = lines[i + 1].lerp(t);
                const newLine = new Line(new Point(lerpCoords1[0], lerpCoords1[1]), new Point(lerpCoords2[0], lerpCoords2[1]));
                recursiveTempLines.push(newLine);
                if (draw) {
                    this.tempLines.push(newLine)
                };
            }
            return this.calculateTPoint(recursiveTempLines, t, draw);
        }
    }
}