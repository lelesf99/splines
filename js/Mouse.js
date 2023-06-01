class Mouse {
    constructor() {
        this.pos = new Point(0, 0);
        this.size = 10;
    }
    updatePos(event) {
        this.pos.x = event.clientX;
        this.pos.y = event.clientY;
    }
    isHovering(point) {
        const distance = Math.pow(this.pos.x - point.x, 2) + Math.pow(this.pos.y - point.y, 2);
        return distance < 200;
    }
}