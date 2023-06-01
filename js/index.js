const tSlider = document.querySelector('#tSlider');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bezier = new Bezier();
bezier.resolution = 1000;
bezier.color = "#45D2FF";

const mouseMoveCallback = (event) => {
    bezier.movePoint(event.clientX, event.clientY);
};

window.addEventListener('keyup', function (event) {
    if (event.key === 'Delete') {
        bezier.deleteSelectedPoint();
    }
});

canvas.addEventListener('mousedown', function (event) {
    if (event.ctrlKey) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let x = event.clientX;
        let y = event.clientY;
        let p = new Point(x, y);
        bezier.addPoint(p);
    } else if (event.shiftKey) {
        bezier.selectPoint(event.clientX, event.clientY);
        canvas.addEventListener('mousemove', mouseMoveCallback);
    } else {
        bezier.selectPoint(event.clientX, event.clientY);
        console.log(bezier.tempLines);
    }
});

canvas.addEventListener('mouseup', function (event) {
    canvas.removeEventListener('mousemove', mouseMoveCallback);
});

tSlider.addEventListener('input', function (event) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bezier.tValue = event.target.value / bezier.resolution;
});

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bezier.draw(ctx);
    requestAnimationFrame(update);
}
update();


