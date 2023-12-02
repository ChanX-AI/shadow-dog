import {Jump, Run, Sit, Fall, Roll} from './states.js';

export class Player {
    constructor(canvas, img) {
        this.img = img;
        this.spriteWidth = 101;
        this.spriteHeight = 92;
        this.aspectRatio = this.spriteWidth/this.spriteHeight;
        this.width = this.spriteWidth/this.aspectRatio;
        this.height = this.spriteHeight/this.aspectRatio; 
        this.x = 10;
        this.y = canvas.height - this.height;
        this.states = [new Run(this), new Jump(this), new Sit(this), new Fall(this), new Roll(this)];
        this.currentState = this.states[0];
        this.frameX = 0;
        this.frameY = 3;
        this.maxFrames = 9;
        this.animationTimer = 0;
        this.animationInterval = 50;
        this.vy = 0;
        this.gravity = 1;
        this.gameSpeed = 5;
        this.deltaTime;
        this.energy = 400;
        this.score = 0;
        //this.disp = document.getElementById('score');
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
        ctx.arc(this.x + this.width/2, this.y + this.height/2, 35, 0, 2*Math.PI);
        ctx.stroke();
        //this.disp.innerText = 'Score : ' + this.score;
    }
    update(deltaTime, input) {
        this.deltaTime = deltaTime;
        if (this.animationTimer > this.animationInterval) {
            this.animationTimer = 0;
            this.frameX === this.maxFrames - 1 ? this.frameX = 0 : this.frameX++;
        } else this.animationTimer += deltaTime;
        this.currentState.handleInput(input);
        this.y += this.vy;
        if (!this.onGround()) {
            this.vy += this.gravity;
        } else  {
            this.vy = 0;
        }
    }
    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
    onGround() {
        return this.y >= canvas.height - this.height;
    }
}