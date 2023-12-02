const states = {
    IDLE  : 7,
    JUMP  : 7,
    FALL  : 7,
    RUN   : 9,
    DIZZY : 11,
    SIT   : 5,
    ROLL  : 7,
    BITE  : 7,
    KO    : 12,
    HIT   : 7
};

export class Run {
    constructor(player) {
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.frameY = 3;
        this.player.maxFrames = states.RUN;
        this.player.gameSpeed = 5;
        this.player.energy = 400;
    }
    handleInput(input) {
        if (input.key === 'jump') {
            this.player.setState(1);
        }
        else if(input.key === 'sit') this.player.setState(2);
        else if(input.key === 'roll') this.player.setState(4);
    }
}

export class Jump {
    constructor(player) {
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.frameY = 1;
        this.player.maxFrames = states.JUMP;
        this.player.vy =  -20;
        this.player.gameSpeed = 5.5//8;
    }
    handleInput(input) {
        if (this.player.onGround()) {
            this.player.setState(0);
            input.key = 'run';
        }
        if (this.player.vy >= 0) this.player.setState(3);
    }
}

export class Sit {
    constructor(player) {
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.frameY = 5;
        this.player.maxFrames = states.SIT;
        this.player.gameSpeed = 0;
    }
    handleInput(input) {
        if (input.key === 'jump') {
            input.key = 'run';
            this.player.setState(0);
        }
    }
}

export class Fall {
    constructor(player) {
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.frameY = 2;
        this.player.maxFrames = states.FALL;
    }
    handleInput(input) {
        if (this.player.vy === 0) {
            input.key = '';
            this.player.setState(0);
        }
    }
}

export class Roll {
    constructor(player) {
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.frameY = 6;
        this.player.maxFrames = states.ROLL;
    }
    handleInput(input) {
        if (this.player.energy < 0) {
            input.key = '';
            this.player.setState(0);
        } else this.player.energy -= this.player.deltaTime;
    }
}
