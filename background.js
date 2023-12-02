export class Layer {
    constructor(img, canvas, speed) {
        this.canvas = canvas;
        this.img = img;
        this.width = 1667;
        this.height = 500;
        this.speed = speed;
        this.x = 0;
        this.y = 0;
    }
    draw(ctx) {
        ctx.drawImage(
            this.img,
            0,
            0,
            this.width,
            this.height,
            this.x,
            this.y,
            this.canvas.width,
            this.canvas.height
        );
        ctx.drawImage(
            this.img,
            0,
            0,
            this.width,
            this.height,
            this.x + canvas.width,
            this.y,
            this.canvas.width,
            this.canvas.height
        );
    }
    update(gameSpeed) {
        this.x -= this.speed * gameSpeed;
        if (this.x <= -this.canvas.width) this.x = 0;
    }
}