class App {
    constructor() {
        this.setMode('point');
        this.selectedObj = 'white';
        
        this.screen = new Screen();

        this.points = [];
        this.lines = [];
        this.beziers = [];
        this.bezier = new Bezier();
        this.spline = new Spline();
        this.curve = new Curve();

        // this.screen.canvas.addEventListener('mousedown', this.mouseDown.bind(this));

        // this.screen.canvas.addEventListener('mouseup', this.mouseUp.bind(this));

        // this.screen.canvas.addEventListener('mousemove', this.mouseMove.bind(this));
        
        window.addEventListener('keydown', (event) => {
            if (event.key === 'p') {
                this.mode = 'point';
            }
            if (event.key === 'l') {
                this.mode = 'line';
            }
            if (event.key === 'c') {
                this.mode = 'curve';
            }
            if (event.key === 'b') {
                this.mode = 'bezier';
            }
            if (event.key === 's') {
                this.mode === 'spline'
            }
            if (this.mode === 'bezier') {
                if (event.key === 'ArrowLeft') {
                    if (event.ctrlKey)
                        this.bezier.incrementTValue(-1);
                    else
                        this.bezier.incrementTValue(-10);
                }
                if (event.key === 'ArrowRight') {
                    if (event.ctrlKey)
                        this.bezier.incrementTValue();
                    else
                        this.bezier.incrementTValue(10);
                }
            }
            if (this.mode === 'spline') {
                if (event.key === 'ArrowLeft') {
                    if (event.ctrlKey)
                        this.spline.incrementUValue(-1);
                    else
                        this.spline.incrementUValue(-10);
                }
                if (event.key === 'ArrowRight') {
                    if (event.ctrlKey)
                        this.spline.incrementUValue();
                    else
                        this.spline.incrementUValue(10);
                }
            }
        });

        document.querySelectorAll('.mode-btn').forEach((element) => {
            element.addEventListener('click', (event) => {
                this.setMode(event.target.id);
            });
        });
    }
    addPoint(x, y) {
        this.points.push(new Point(x, y));
    }
    addLine(x, y) {
        if (this.points.length === 0) {
            this.addPoint(x, y);
        } else {
            const lastPoint = this.points[this.points.length - 1];
            this.addPoint(x, y);
            this.lines.push(new Line(lastPoint, this.points[this.points.length - 1]));
        }
    }
    addBezier(x, y) {
        if (this.points.length === 0) {
            this.addLine(x, y);
        } else {
            this.addLine(x, y);
            const newBezier = new Bezier(this.lines[this.lines.length - 1]);
            this.beziers.push(newBezier);
        }
    }

    select(x, y) {
        this.points.forEach((point) => {
            point.select(x, y);
        });
    }
    startMove(x, y) {
        this.points.forEach((point) => {
            if (point.selected) {
                point.startMove(x, y);
            }
        });
    }
    stopMove(x, y) {
        this.points.forEach((point) => {
            if (point.selected) {
                point.stopMove(x, y);
            }
        });
    }

    move(x, y) {
        this.points.forEach((point) => {
            if (point.moving) {
                point.moveTo(x, y);
            }
        });
        this.beziers.forEach((bezier) => {
            bezier.updateCurve();
        });

    }
    run() {
        this.screen.draw();
        requestAnimationFrame(this.run.bind(this));
    }

    mouseDown(event) {
        if (event.shiftKey) {
            this.select(event.clientX, event.clientY);
            this.startMove(event.clientX, event.clientY);
        }
    }
    mouseUp(event) {
        if (event.ctrlKey) {
            if (this.mode === 'point') {
                this.addPoint(event.clientX, event.clientY);
            }
            if (this.mode === 'line') {
                this.addLine(event.clientX, event.clientY);
            }
            if (this.mode === 'curve') {
                this.addPoint(event.clientX, event.clientY);
                const lastPoint = this.points[this.points.length - 1];
                this.curve.coords.push([lastPoint.pos[0], lastPoint.pos[1]]);
            }
            if (this.mode === 'bezier') {
                if (this.lines.length === 0) {
                    this.addLine(event.clientX, event.clientY);
                } else {
                    this.addLine(event.clientX, event.clientY);
                    const lastLine = this.lines[this.lines.length - 1];
                    this.bezier.addLine(lastLine);
                }
            }
            if (this.mode === 'spline') {
                if (this.points.length === 0) {
                    this.addBezier(event.clientX, event.clientY);
                } else {
                    if (this.beziers.length === 0) {
                        this.addBezier(event.clientX, event.clientY);
                        const lastBezier = this.beziers[this.beziers.length - 1];
                        lastBezier.addLine(this.lines[this.lines.length - 1]);
                        this.spline.addBezier(this.beziers[this.beziers.length - 1]);
                    } else {
                        const lastBezier = this.beziers[this.beziers.length - 1];
                        if (lastBezier.lines.length === 3) {
                            this.addBezier(event.clientX, event.clientY);
                            const lastBezier = this.beziers[this.beziers.length - 1];
                            lastBezier.addLine(this.lines[this.lines.length - 1]);
                            this.spline.addBezier(this.beziers[this.beziers.length - 1]);
                        } else {
                            this.addLine(event.clientX, event.clientY);
                            lastBezier.addLine(this.lines[this.lines.length - 1]);
                        }
                    }
                }
            }
        } else {
            this.stopMove(event.clientX, event.clientY);
            this.select(event.clientX, event.clientY);
        }
    }
    mouseMove(event) {
        if (event.shiftKey) {
            this.move(event.clientX, event.clientY);
        }
    }
    setMode(mode) {
        this.mode = mode;
        document.querySelectorAll('.mode-btn').forEach((element) => {
            element.classList.remove('selected');
        });
        document.querySelector(`#${mode}`).classList.add('selected');
    }
}