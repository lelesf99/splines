class Bezier {
    constructor(points) {
        this.resolution = 1000
        this.points = points ? points : [];
        this.tPoint = this.points.length ? new Point(this.points[0].x, this.points[0].y) : new Point(0, 0);
        this.tValue = 1.0;
        this.tIncrement = 1 / this.resolution;

        this.lines = [];
        this.tempLines = [];

        this.curve = new Curve();

        this.color = "white";
        this.lineWidth = 2;
    }

    addPoint(point) {
        this.points.push(point);
        this.updateLines();
        this.updateCurve();
    }

    draw(ctx) {
        if (this.points.length === 0) return;

        // Draw points
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].color = "#dddddd55";
            this.points[i].draw(ctx);
        }

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
        this.tPoint = this.calculateTPoint(this.lines, this.tValue, true);
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


    calculateTPoint(lines, t, draw = false, iter = 0) {
        iter++;
        if (lines.length === 0) return new Point(this.points[0].x, this.points[0].y);
        if (lines.length === 1) {
            return lines[0].lerp(t);
        } else {
            const recursiveTempLines = [];
            for (let i = 0; i < lines.length - 1; i++) {
                const newLine = new Line(lines[i].lerp(t), lines[i + 1].lerp(t));
                recursiveTempLines.push(newLine);
                if (draw) {
                    this.tempLines.push(newLine)
                };
            }
            return this.calculateTPoint(recursiveTempLines, t, draw, iter);
        }
    }

    select(x, y) {
        const selection = {
            point: this.selectPoint(x, y),
            line: this.selectLine(x, y),
            curve: this.selectCurve(x, y)
        }
        if(selection.point === this.points[0] || selection.point === this.points[this.points.length - 1]) this.curve.deselect();
        if (selection.point) return selection.point;
        if (selection.curve) return selection.curve;
        if (selection.line) return selection.line;
        return null;
    }

    selectCurve(x, y) {
        if (this.curve.isHovering(x, y)) {
            this.curve.select();
            return this.curve;
        } else {
            this.curve.deselect();
            return null;
        }
    }

    selectLine(x, y) {
        return null;
    }

    selectPoint(x, y) {
        let selectedPoint = null;
        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i].isHovering(x, y)) {
                this.points[i].selected = true;
                selectedPoint = this.points[i];
            } else {
                this.points[i].selected = false;
            }
        }
        return selectedPoint;
    }

    updateLines() {
        this.lines = [];
        if (this.points.length > 1) {
            for (let i = 0; i < this.points.length - 1; i++) {
                this.lines.push(new Line(this.points[i], this.points[i + 1]));
            }
        }
    }
    updateCurve() {
        this.curve.points = [];
        if (this.points.length > 1) {
            for (let tempT = 0; tempT <= this.tValue; tempT += this.tIncrement) {
                const tempTPoint = this.calculateTPoint(this.lines, tempT);
                this.curve.addPoint(tempTPoint);
            }
        }
    }

    deleteSelectedPoint() {
        const tempPoints = this.points.filter(point => !point.selected);
        const tempLines = [];
        for (let i = 0; i < tempPoints.length - 1; i++) {
            tempLines.push(new Line(tempPoints[i], tempPoints[i + 1]));
        }
        this.points = tempPoints;
        this.lines = tempLines;
    }

    moveSelected(x, y) {
        const selectedPoint = this.points.find(point => point.selected);
        if (selectedPoint) {
            selectedPoint.moveTo(x, y);
            this.updateLines();
            this.updateCurve();
        }
    }
    moveSelectedBy(x, y) {
        const selectedPoint = this.points.find(point => point.selected);
        if (selectedPoint && !this.curve.selected) {
            selectedPoint.moveTo(selectedPoint.x + x, selectedPoint.y + y);
            this.updateLines();
            this.updateCurve();
        }
        if (this.curve.selected) {
            this.tValue += x / this.resolution;
            if(this.tValue < 0) this.tValue = 0;
            if(this.tValue > 1) this.tValue = 1;
            this.updateCurve();
        }
    }
}