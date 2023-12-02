export class InputHandler {
    constructor() {
        this.key = '';
        this.btns = document.getElementsByClassName('btn');
    }
    keyPressEvent() {
        Array.from(this.btns).forEach(btn => {
            btn.addEventListener('click', e => {
                if (btn.innerText === 'J')
                    this.key = 'jump';
                else if (btn.innerText === 'S')
                    this.key = 'sit';
                else if (btn.innerText === 'R')
                    this.key = 'roll';
            });
        });
    }
}     
