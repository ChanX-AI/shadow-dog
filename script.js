import {Player} from './player.js';
import {Layer} from './background.js';
import {InputHandler} from './input.js';
import {Enemy} from './enemy.js';


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx =  canvas.getContext('2d');
ctx.imageSmoothingEnabled = true;

const playerImg = new Image();
playerImg.src = 'player-1.png';

const enemyImg = new Image();
enemyImg.src = 'enemy_ghost.png';

const layer1 = new Image();
layer1.src = 'layer-1 (1).png';

const layer2 = new Image();
layer2.src = 'layer-2.png';

const layer3 = new Image();
layer3.src = 'layer-3.png';

const layer4 = new Image();
layer4.src = 'layer-4.png';

const layer5 = new Image();
layer5.src = 'layer-5.png';

class Game {
    constructor() {
        this.player = new Player(canvas, playerImg);
        this.enemies = [];
        this.bgImg1 = new Layer(layer1, canvas, 0.2);
        this.bgImg2 = new Layer(layer2, canvas, 0.4);
        this.bgImg3 = new Layer(layer3, canvas, 0.6);
        this.bgImg4 = new Layer(layer4, canvas, 0.8);
        this.bgImg5 = new Layer(layer5, canvas, 1);
        this.enemyInterval = 2000;
        this.enemyTimer = 0;
        this.lastTime = 0;
        this.layers = [
            this.bgImg1,
            this.bgImg2,
            this.bgImg3,
            this.bgImg4,
            this.bgImg5
        ];
        this.input = new InputHandler();
     }
     animate(timeStamp) {
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         const deltaTime = timeStamp - this.lastTime;
         this.lastTime = timeStamp;
         this.layers.forEach(layer => {
             layer.draw(ctx);
             layer.update(this.player.gameSpeed);
         });
         
         if (this.enemyTimer > this.enemyInterval) {
             this.enemyTimer = 0;
             this.enemies.push(new Enemy(enemyImg, this.player));
             this.enemyInterval = Math.floor(Math.random()*(5500 - 2000 + 1)) + 2000;
         } else this.enemyTimer += deltaTime;
         
         this.input.keyPressEvent();
         this.player.draw(ctx);
         this.player.update(deltaTime, this.input);
         
         this.enemies.forEach(enemy => {
             enemy.draw(ctx);
             enemy.update(deltaTime);
         });
         this.enemies = this.enemies.filter(e => !e.mark);
         requestAnimationFrame(this.animate.bind(this));
     }
}

const game = new Game();
game.animate(0);