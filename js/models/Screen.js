class Screen {
    constructor() {
        this.height = window.innerHeight;
        this.width = window.innerWidth;
        this.canvas = document.querySelector('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext('2d');

        window.addEventListener('resize', () => {
            this.height = window.innerHeight;
            this.width = window.innerWidth;

            this.canvas.height = window.innerHeight;
            this.canvas.width = window.innerWidth;
        });
        this.canvas.addEventListener('wheel', (e) => {
            this.ctx.translate(e.clientX, e.clientY);
            if (e.deltaY < 0) {
                this.ctx.scale(1.05, 1.05);
            } else {
                this.ctx.scale(0.95, 0.95);
            }
            this.ctx.translate(-e.clientX, -e.clientY);

        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        const currentColor = this.ctx.strokeStyle;
        const currentLineWidth = this.ctx.lineWidth;
        this.ctx.strokeStyle = "#FFFFFF55";

        this.ctx.lineWidth = .5;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.height / 2);
        this.ctx.lineTo(this.width, this.height / 2);
        this.ctx.moveTo(this.width / 2, 0);
        this.ctx.lineTo(this.width / 2, this.height);
        this.ctx.stroke();

        for (let i = 0; i < this.height; i += 10) {
            this.ctx.lineWidth = .1;
            this.ctx.beginPath();
            this.ctx.moveTo(0, this.height / 2 + i);
            this.ctx.lineTo(this.width, this.height / 2 + i);
            this.ctx.moveTo(0, this.height / 2 - i);
            this.ctx.lineTo(this.width, this.height / 2 - i);
            this.ctx.stroke();
        }

        for (let i = 0; i < this.width; i += 10) {
            this.ctx.lineWidth = .1;
            this.ctx.beginPath();
            this.ctx.moveTo(this.width / 2 + i, 0);
            this.ctx.lineTo(this.width / 2 + i, this.height);
            this.ctx.moveTo(this.width / 2 - i, 0);
            this.ctx.lineTo(this.width / 2 - i, this.height);
            this.ctx.stroke();
        }

        this.ctx.strokeStyle = currentColor;
        this.ctx.lineWidth = currentLineWidth;
    }
}