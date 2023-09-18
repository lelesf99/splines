class Line {
    constructor(start, end) {
        this.start = start;
        this.end = end;

        this.color = "white";
        this.lineWidth = 1;

        this.selected = false;
        this.selectedColor = "white";
        this.selectedLineWidth = 2;

        this.moving = false;
        this.moveStart = null;
    }
    draw(ctx) {
        const currentColor = ctx.strokeStyle;
        const currentLineWidth = ctx.lineWidth;

        if (this.selected) {
            ctx.strokeStyle = this.selectedColor;
            ctx.lineWidth = this.selectedLineWidth;
        } else {
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.lineWidth;
        }

        ctx.beginPath();
        ctx.moveTo(this.start.pos[0], this.start.pos[1]);
        ctx.lineTo(this.end.pos[0], this.end.pos[1]);
        ctx.stroke();

        ctx.strokeStyle = currentColor;
        ctx.lineWidth = currentLineWidth;
    }
    select(x, y) {
        const distance = this.distanceToLine(x, y, this.start.pos[0], this.start.pos[1], this.end.pos[0], this.end.pos[1]);
        if (distance < 15) {
            this.selected = true;
        } else {
            this.selected = false;
        }
        return this;
    }
    distanceToLine(x, y, x1, y1, x2, y2) {
        if(Math.min(x1, x2) > x || Math.max(x1, x2) < x || Math.min(y1, y2) > y || Math.max(y1, y2) < y){
            return 10000000;
        }
        // https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
        // dst()^2 = |(x2 - x1)(y1 - y) - (x1 - x)(y2 - y1)| / (x2 - x1)^2 + (y2 - y1)^2
        return Math.abs((x2 - x1) * (y1 - y) - (x1 - x) * (y2 - y1)) / Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
    lerp(t) {
        const p1 = this.start.pos;
        const p2 = this.end.pos;
        return [p1[0] + (p2[0] - p1[0]) * t, p1[1] + (p2[1] - p1[1]) * t];
    }
}