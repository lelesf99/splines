import Obj from "./Obj";
import Point from "./Point";

export default class Line extends Obj {

  p1: Point;
  p2: Point;
  midPoint: Point;

  lineColor = '#ffffff99';
  lineSize = 1;

  selectedLineColor = '#ffffff';
  selectedLineSize = 2;

  constructor(p1: Point, p2: Point) {
    super();
    this.p1 = p1;
    this.p2 = p2;
    this.midPoint = new Point((p1.pos.x + p2.pos.x) / 2, (p1.pos.y + p2.pos.y) / 2);
  }
  override draw(ctx: CanvasRenderingContext2D): void {
    const currentLineWidth = ctx.lineWidth;
    const currentStrokeStyle = ctx.strokeStyle;

    if (this.selected) {
      ctx.lineWidth = this.selectedLineSize;
      ctx.strokeStyle = this.selectedLineColor;
      ctx.fillText("p1", this.p1.pos.x + 10, this.p1.pos.y + 10);
      ctx.fillText("p2", this.p2.pos.x + 10, this.p2.pos.y + 10);
      ctx.beginPath();
      ctx.moveTo(this.p1.pos.x, this.p1.pos.y);
      ctx.lineTo(this.p2.pos.x, this.p2.pos.y);
      ctx.stroke();
    } else {
      ctx.lineWidth = this.lineSize;
      ctx.strokeStyle = this.lineColor;
      ctx.beginPath();
      ctx.moveTo(this.p1.pos.x, this.p1.pos.y);
      ctx.lineTo(this.p2.pos.x, this.p2.pos.y);
      ctx.stroke();
    }

    ctx.lineWidth = currentLineWidth;
    ctx.strokeStyle = currentStrokeStyle;
  }
  override select(x: number, y: number): Obj | null {
    this.selected = this.distanceToLine(x, y, this.p1.pos.x, this.p1.pos.y, this.p2.pos.x, this.p2.pos.y) < 10;
    if (this.selected) {
      this.p1.selected = false;
      this.p2.selected = false;
      return this;
    }
    else return null;
  }
  distanceToLine(x: number, y: number, x1: number, y1: number, x2: number, y2: number): number {
    // https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
    // dst()^2 = |(x2 - x1)(y1 - y) - (x1 - x)(y2 - y1)| / (x2 - x1)^2 + (y2 - y1)^2
    return Math.abs((x2 - x1) * (y1 - y) - (x1 - x) * (y2 - y1)) / Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
  override moveTo(x: number, y: number): void {
    throw new Error("Method not implemented.");

  }
  override moveBy(x: number, y: number): void {
    throw new Error("Method not implemented.");
  }
}
