export class UI {
    constructor() {
        this.width = 3;
        this.height = 5;
    }
    draw(ctx) {
        ctx.fillStyle = 'black';
        for (let i = 1; i <= 10; i++) {
            ctx.fillRect(20*i, 20, this.width, this.height);
        }
    }
}