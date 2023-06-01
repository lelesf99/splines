class Curve {
    constructor(points) {
        this.resolution = 1000
        this.points = points ? points : [];

        this.color = "white";
        this.lineWidth = 2;

        this.selected = false;
        this.selectedColor = "white";
        this.selectedLineWidth = 4;
    }
    addPoint(point) {
        this.points.push(point);
    }
    draw(ctx) {
        if (this.points.length === 0) return;
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);

        for (let i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        const currentColor = ctx.fillStyle;
        const currentLineWidth = ctx.lineWidth;
        if (this.selected) {
            ctx.strokeStyle = this.selectedColor;
            ctx.lineWidth = this.selectedLineWidth;
        } else {
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.lineWidth;
        }
        ctx.stroke();
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = currentLineWidth;
    }
    isHovering(x, y) {
        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i].isHovering(x, y)) return true;
        }
        return false;
    }
    select() {
        this.selected = true;
    }
    deselect() {
        this.selected = false;
    }
}
