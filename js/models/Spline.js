class Spline {
    constructor() {
        this.beziers = [];
        this.uValue = this.calculateUValue();
        this.resolution = 1000;
        this.uValueIncrement = 1 / this.resolution;
        this.lineWidth = 1;

        this.color = "white";
        this.selected = false;
        this.selectedColor = "white";
        this.selectedLineWidth = 2;
    }
    addBezier(bezier) {
        this.beziers.push(bezier);
        this.uValue = this.calculateUValue();
    }
    draw(ctx) {
        if(this.beziers.length === 0) return;
        const currentColor = ctx.strokeStyle;
        const currentLineWidth = ctx.lineWidth;

        if (this.selected) {
            ctx.strokeStyle = this.selectedColor;
            ctx.lineWidth = this.selectedLineWidth;
        } else {
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.lineWidth;
        }

        for (let i = 0; i < this.beziers.length; i++) {
            this.beziers[i].draw(ctx);
        }

        ctx.strokeStyle = currentColor;
        ctx.lineWidth = currentLineWidth;

        // Draw uPoint
        const uPointCoords = this.getUPoint();
        this.tPoint = new Point(uPointCoords[0], uPointCoords[1]);
        this.tPoint.fill = false;
        this.tPoint.radius = 8;
        this.tPoint.color = "blue";
        this.tPoint.draw(ctx);
    }

    calculateUValue(){
        let uValue = 0;
        for(let i = 0; i < this.beziers.length; i++){
            uValue += this.beziers[i].tValue;
        }
        return uValue;
    }

    getUPoint(){
        let index = Math.floor(this.uValue);
        if(index >= this.beziers.length) index = this.beziers.length - 1;
        if(index < 0) index = 0;
        return this.beziers[index].calculateTPoint(this.beziers[index].lines, this.uValue - index);
    }        
                
    setTValues(){
        let index = Math.floor(this.uValue);
        if(index >= this.beziers.length) index = this.beziers.length - 1;
        if(index < 0) index = 0;
        for(let i = 0; i < index; i++){
            this.beziers[i].tValue = 1;
        }
        this.beziers[index].tValue = this.uValue - Math.floor(this.uValue);
        this.beziers[index].updateCurve();
    }


    incrementUValue(scale = 1) {
        this.uValue += this.uValueIncrement * scale;
        this.setTValues();
    }
}