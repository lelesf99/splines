class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.radius = 5;
        this.color = "white";
        this.fill = true;
        this.lineWidth = 2;

        this.selected = false;
        this.selectedRadius = 7;
        this.selectedColor = "white";
        this.selectedFill = true;
        this.selectedLineWidth = 2;
    }
    draw(ctx) {
        const currentColor = ctx.fillStyle;
        const currentLineWidth = ctx.lineWidth;

        if (this.selected) {
            ctx.strokeStyle = this.selectedColor;
            ctx.fillStyle = this.selectedColor;
            ctx.lineWidth = this.selectedLineWidth;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.selectedRadius, 0, 2 * Math.PI);
            if (this.selectedFill) ctx.fill();
            else ctx.stroke();
        } else {
            ctx.strokeStyle = this.color;
            ctx.fillStyle = this.color;
            ctx.lineWidth = this.lineWidth;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            if (this.fill) ctx.fill();
            else ctx.stroke();
        }

        ctx.fillStyle = currentColor;
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = currentLineWidth;
    }
    isHovering(x, y) {
        const distance = Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2);
        return distance < Math.pow(this.radius + 15, 2);
    }
    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }
    distanceTo(x, y) {
        return Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
    }
    distanceBetween(point) {
        return this.distanceTo(point.x, point.y);
    }
}