import Obj from "./Obj";

export default class Point extends Obj {
  pos = {x: 0, y: 0};
  weigth = 1;

  //apperance
  size = 5;
  color = 'black';
  lineColor = '#ffffff';
  lineSize = 1;
  fill = false;

  selectedSize = 7;
  selectedColor = '#ffffff';
  selectedLineColor = '#ffffff';
  selectedLineSize = 1;
  selectedFill = true;

  constructor(public x: number, public y: number) {
    super();
    this.pos = {x, y};
  }

  override draw(ctx: CanvasRenderingContext2D) {
    const currentColor = ctx.fillStyle;
    const currentLineWidth = ctx.lineWidth;
    const currentStrokeStyle = ctx.strokeStyle;

    if(this.selected){
      ctx.fillStyle = this.selectedColor;
      ctx.lineWidth = this.selectedLineSize;
      ctx.strokeStyle = this.selectedLineColor;
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.selectedSize, 0, 2 * Math.PI);
      if (this.selectedFill) ctx.fill();
      else ctx.stroke();
    } else {
      ctx.fillStyle = this.color;
      ctx.lineWidth = this.lineSize;
      ctx.strokeStyle = this.lineColor;
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
      if (this.fill) ctx.fill();
      else ctx.stroke();
    }



    ctx.fillStyle = currentColor;
    ctx.lineWidth = currentLineWidth;
    ctx.strokeStyle = currentStrokeStyle;
  }
  override select(x: number, y: number): Obj | null {
    this.selected = Math.pow(x - this.pos.x, 2) + Math.pow(y - this.pos.y, 2) < Math.pow((this.size + 5), 2);
    if(this.selected) return this;
    else return null;
  }
  override moveBy(x: number, y: number): void {
    this.pos.x += x;
    this.pos.y += y;
  }
  override moveTo(x: number, y: number): void {
    this.pos.x = x;
    this.pos.y = y;
  }
}
