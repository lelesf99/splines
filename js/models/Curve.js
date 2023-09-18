class Curve {
    constructor(coords) {
        this.coords = coords || [];

        this.lineWidth = 1;
        this.color = "white";

        this.selected = false;
        this.selectedColor = "white";
        this.selectedLineWidth = 2;
    }
    draw(ctx) {
        if(this.coords.length < 2) return;
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
        ctx.moveTo(this.coords[0][0], this.coords[0][1]);
        for (let i = 1; i < this.coords.length; i++) {
            ctx.lineTo(this.coords[i][0], this.coords[i][1]);
        }
        ctx.stroke();

        ctx.strokeStyle = currentColor;
        ctx.lineWidth = currentLineWidth;
    }
    select(x, y) {
        const tempPoint = new Point(x, y);

        let distance = 10000000;
        for (let i = 0; i < this.coords.length - 1; i++) {
            const tempDistance = tempPoint.distanceBetween(new Point(this.coords[i][0], this.coords[i][1]));
            if (tempDistance < distance) {
                distance = tempDistance;
            }
        }
        if (distance < 15) {
            this.selected = true;
        } else {
            this.selected = false;
        }
        return this;
    }
}