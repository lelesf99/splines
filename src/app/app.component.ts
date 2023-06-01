import { AfterViewInit, Component, ViewChild } from '@angular/core';
import Line from 'src/models/Line';
import Obj from 'src/models/Obj';
import Point from 'src/models/Point';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  frame = 0;
  title = 'splines';
  mode = 'point';
  objects: Obj[] = [];
  @ViewChild('canvas') canvas: any;

  ngAfterViewInit() {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    window.addEventListener('resize', () => {
      this.canvas.nativeElement.width = window.innerWidth;
      this.canvas.nativeElement.height = window.innerHeight;
    });

    const ctx = this.canvas.nativeElement.getContext('2d');
    this.run(ctx);
  }
  run(ctx: CanvasRenderingContext2D) {
    this.frame++;
    this.draw(ctx);
    requestAnimationFrame(this.run.bind(this, ctx));
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.objects.forEach((obj: Obj) => obj.draw(ctx));
  }
  mouseClick(event: MouseEvent) {
    const lines = this.objects.filter((obj: Obj) => obj instanceof Line) as Line[];
    const points = this.objects.filter((obj: Obj) => obj instanceof Point) as Point[];

    if (this.mode === 'point') {
      if (event.ctrlKey) {
        points.push(new Point(event.clientX, event.clientY));
      }
    } else if (this.mode === 'line') {
      if (event.ctrlKey) {
        if (points.length >= 2) {
          points.push(new Point(event.clientX, event.clientY));
          lines.push(new Line(points[points.length - 2], points[points.length - 1]));

        } else {
          points.push(new Point(event.clientX, event.clientY));
        }
      }
    }
    this.objects = [...points, ...lines];
  }

  mouseDown(event: MouseEvent) {
    for (let i = 0; i < this.objects.length; i++) {
      const obj = this.objects[i];
      obj.select(event.clientX, event.clientY);
    }

    const selected = this.objects.filter((obj: Obj) => obj.selected);
    const lines = this.objects.filter((obj: Obj) => obj instanceof Line) as Line[];
    const points = this.objects.filter((obj: Obj) => obj instanceof Point) as Point[];
    if (event.shiftKey) {
      selected.forEach((obj: Obj) => {
        obj.moving = true;
      });
    }
  }

  mouseMove(event: MouseEvent) {
    const selected = this.objects.filter((obj: Obj) => obj.selected);
    if (event.shiftKey) {
      selected.forEach((obj: Obj) => {
        if(obj.moving) obj.moveTo(event.clientX, event.clientY);
      });
    }
  }

  mouseUp(event: MouseEvent) {
      this.objects.forEach((obj: Obj) => {
        obj.moving = false;
      });
  }
}
