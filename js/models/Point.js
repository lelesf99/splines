class Point {
    constructor(x, y) {
        this.pos = [x, y];

        this.radius = 5;
        this.color = "white";
        this.fill = false;
        this.lineWidth = 2;

        this.selected = false;
        this.selectedRadius = 7;
        this.selectedColor = "white";
        this.selectedFill = true;

        this.moving = false;
        this.moveStart = null;
    }
    draw(ctx) {
        const currentColor = ctx.fillStyle;
        const currentLineWidth = ctx.lineWidth;

        if (this.selected) {
            ctx.strokeStyle = this.selectedColor;
            ctx.fillStyle = this.selectedColor;
            ctx.lineWidth = this.lineWidth;
            ctx.beginPath();
            ctx.arc(this.pos[0], this.pos[1], this.selectedRadius, 0, 2 * Math.PI);
            if (this.selectedFill) ctx.fill();
            else ctx.stroke();
        } else {
            ctx.strokeStyle = this.color;
            ctx.fillStyle = this.color;
            ctx.lineWidth = this.lineWidth;
            ctx.beginPath();
            ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
            if (this.fill) ctx.fill();
            else ctx.stroke();
        }

        ctx.fillStyle = currentColor;
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = currentLineWidth;
    }
    select(x, y){
        const distance = Math.pow(x - this.pos[0], 2) + Math.pow(y - this.pos[1], 2);
        if(distance < Math.pow(this.radius + 15, 2)){
            this.selected = true;
        } else {
            this.selected = false;
        }
        return this;
    }
    
    startMove(x, y){
        if(this.selected){
            this.moving = true;
            this.moveStart = [x, y];
        }
    }
    stopMove(x, y){
        if(this.moving){
            this.moving = false;
            this.moveStart = null;
        }
    }

    moveTo(x, y) {
        this.pos = [x, y];
    }
    moveBy(x, y) {
        this.pos[0] += x;
        this.pos[1] += y;
    }
    distanceTo(x, y) {
        return Math.sqrt(Math.pow(x - this.pos[0], 2) + Math.pow(y - this.pos[1], 2));
    }
    distanceBetween(point) {
        return this.distanceTo(point.pos[0], point.pos[1]);
    }

}