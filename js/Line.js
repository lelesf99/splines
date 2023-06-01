class Line {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.lineWidth = 1;
        this.color = "white";

    }
    draw(ctx){
        const currentLineWidth = ctx.lineWidth;
        const currentStrokeStyle = ctx.strokeStyle;
        const currentLineCap = ctx.lineCap;
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.stroke();
        ctx.lineWidth = currentLineWidth;
        ctx.strokeStyle = currentStrokeStyle;
        ctx.lineCap = currentLineCap;
    }
    lerp(t) {
        return new Point(this.p1.x + (this.p2.x - this.p1.x) * t, this.p1.y + (this.p2.y - this.p1.y) * t);
    }
}