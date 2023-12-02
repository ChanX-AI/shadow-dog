export class Enemy{
    constructor(img, player) {
        this.img = img;
        this.player = player;
        this.spriteWidth = 261;
        this.spriteHeight = 209;
        this.aspectRatio = this.spriteWidth/this.spriteHeight;
        this.width = this.spriteWidth/5*this.aspectRatio;
        this.height = this.spriteHeight/5*this.aspectRatio;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrames = 6;
        this.x = window.innerWidth - this.width;
        this.y = window.innerHeight - this.height - 10;
        this.animationTimer = 0;
        this.animationInterval = 50;
        this.mark = false;
        this.check = true;
        this.speed = Math.random()*(8 - 5 + 1) + 5;
    }
    draw(ctx) {
        ctx.drawImage(
            this.img,
            this.frameX*this.spriteWidth,
            this.frameY*this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
       );
       ctx.fillStyle = 'black';
       ctx.beginPath();
       ctx.arc(this.x + this.width/2, this.y + this.height/2, 30, 0, 2*Math.PI);
       ctx.stroke();
    }
    update(deltaTime) {
        if (this.animationTimer > this.animationInterval) {
            this.animationTimer = 0;
            this.frameX === this.maxFrames - 1 ? this.frameX = 0 : this.frameX++;
        } else this.animationTimer += deltaTime;
        
        this.x -= this.speed;
        
        if (this.x < 0) this.mark = true;
        
        //coordinates
        
        let x1 = this.player.x + this.player.width/2;
        let y1 = this.player.y + this.player.height/2;
        let r1 = 35;
        
        let x2 = this.x + this.width/2;
        let y2 = this.y + this.height/2;
        let r2 = 30;
        
        if (this.isCollide(x1, y1, r1, x2, y2, r2) && this.check) {
            this.check = false;
            this.player.score++;
        }
    }
    isCollide(x1, y1, r1, x2, y2, r2) {
        let r = r1 + r2;
        let dx = x1 - x2;
        let dy = y1 - y2;
        
        return (r  >= Math.sqrt(dx * dx + dy * dy));
    }
}