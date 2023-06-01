class Bezier {
    constructor(points) {
        this.resolution = 1000
        this.points = points ? points : [];
        this.tPoint = this.points.length ? new Point(this.points[0].x, this.points[0].y) : new Point(0, 0);
        this.tValue = 1.0;
        this.tIncrement = 1 / this.resolution;

        this.color = "white";
        this.lineWidth = 2;

        this.lines = [];
        this.tempLines = [];
    }

    addPoint(point) {
        const lastPoint = this.points[this.points.length - 1];
        this.points.push(point);
        const newPoint = this.points[this.points.length - 1];
        if (this.points.length > 1)
            this.lines.push(new Line(lastPoint, newPoint));
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
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);

        for (let tempT = 0; tempT <= this.tValue; tempT += this.tIncrement) {
            const tempTPoint = this.calculateTPoint(this.lines, tempT);
            // console.log(tPoint);
            ctx.lineTo(tempTPoint.x, tempTPoint.y);
            ctx.moveTo(tempTPoint.x, tempTPoint.y);
        }
        const currentColor = ctx.fillStyle;
        const currentLineWidth = ctx.lineWidth;
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();

        ctx.fillStyle = currentColor;
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = currentLineWidth;

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

    deleteSelectedPoint() {
        const tempPoints = this.points.filter(point => !point.selected);
        const tempLines = [];
        for (let i = 0; i < tempPoints.length - 1; i++) {
            tempLines.push(new Line(tempPoints[i], tempPoints[i + 1]));
        }
        this.points = tempPoints;
        this.lines = tempLines;
    }

    movePoint(x, y) {
        const selectedPoint = this.points.find(point => point.selected);
        if (selectedPoint) {
            selectedPoint.moveTo(x, y);
        }
    }

}