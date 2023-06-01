class App {
    constructor() {
        this.selected = 'bezier';
        this.selectedObj = 'white';
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        const bezier = new Bezier();
        bezier.addPoint(new Point(this.canvas.width - 100, this.canvas.height - 100));
        bezier.addPoint(new Point(this.canvas.width - 100, 100));
        bezier.addPoint(new Point(100, this.canvas.height - 100));
        bezier.addPoint(new Point(100, 100));

        this.beziers = [bezier];

        this.canvas.addEventListener('mousedown', this.input.bind(this));

        this.canvas.addEventListener('mouseup', this.input.bind(this));

        this.canvas.addEventListener('mousemove', this.input.bind(this));
    }
    input(event) {
        switch (event.type) {
            case 'mousedown':
                this.mouseDown(event);
                break;
            case 'mouseup':
                this.mouseUp(event);
                break;
            case 'mousemove':
                this.mouseMove(event);
                break;
            default:
                break;
        }
    }
    addBezier(bezier) {
        this.beziers.push(bezier);
    }
    select(x, y) {
        for (let i = 0; i < this.beziers.length; i++) {
            this.beziers.select(x, y);
        }
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.beziers.length; i++) {
            this.beziers[i].draw(this.ctx);
        }
    }
    run() {
        this.draw();
        requestAnimationFrame(this.run.bind(this));
    }

    mouseDown(event) {
        switch (this.selected) {
            case 'bezier':
                this.canvas.addEventListener('mousemove', this.input.bind(this));
                break;
            default:
                break;
        }
    }
    mouseUp(event) {
        switch (this.selected) {
            case 'bezier':
                this.canvas.removeEventListener('mousemove', this.input.bind(this));
                this.select(event.target.clientX, event.target.clientY);
                break;
            default:
                break;
        }
    }
    mouseMove(event) {
        switch (this.selected) {
            case 'bezier':
                break;
            default:
                break;
        }
    }
}