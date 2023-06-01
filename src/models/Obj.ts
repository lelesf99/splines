export default abstract class Obj {
  selected = false;
  moving = false;
  constructor() {
  }
  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract select(x: number, y: number): Obj | null;
  abstract moveTo(x: number, y: number): void;
  abstract moveBy(x: number, y: number): void;
}
