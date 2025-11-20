import Mole from "./mole.js";

export default class Game {
    constructor(rootElement) {
        this.rootElement = rootElement;
        this.boardElement = null;
        this.holes = [];
        this.score = 0;
        this.miss = 0;
        this.timeLeft = 60;
        this.timerId = null;
        this.intervalId = null;
        this.isPaused = false;
        this.settings = {
            ttl: 800,
            spawnSpeed: 1000
        };
    }

    initBoard() {
        const gameBoard = document.querySelector('#gameboard');
        
        for(let i = 0; i < 9; i++) {
            const holeBtn = document.createElement('button');
            holeBtn.classList.add('hole');
            holeBtn.type = 'button';
            holeBtn.setAttribute('aria-label', `Hole ${i + 1}`)
            gameBoard.appendChild(holeBtn);
            this.holes.push(holeBtn);
        }
        
        gameBoard.addEventListener('click', (event) => this.handleClick(event));
    }

    start() {
        this.score = 0;
        this.miss = 0;
        this.timeLeft = 60;
        this.updateScoreboard();

        if(this.intervalId) {
            clearInterval(this.intervalId);
        }
        
        this.intervalId = setInterval(() => {
            this.spawnMole();
        }, this.settings.spawnSpeed);
        
        if (this.timerId) {
            clearInterval(this.timerId);
        }

        this.timerId = setInterval(() => {
            this.timeLeft--;
            this.updateScoreboard();
        
            if (this.timeLeft <= 0) {
                this.stop();
                clearInterval(this.timerId);
                this.timerId = null;
            }
        }, 1000);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

        if(this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }

        this.holes.forEach(hole => {
            const mole = hole.querySelector('.mole');
            if (mole) mole.remove();
        });
    }

    spawnMole() {
        const randomHole = Math.floor(Math.random() * this.holes.length);
        const moleHole = this.holes[randomHole];

        if(moleHole.querySelector('.mole')) {
            return;
        }
        
        const mole = new Mole(moleHole, {
            ttl: this.settings.ttl
        });

        mole.mount();
    }

    handleClick(event) {
        const hole = event.target.closest('.hole');

        if (!hole || !this.holes.includes(hole)) return;

        const moleEl = hole.querySelector('.mole');

        if (moleEl) {
            this.score++;
            moleEl.moleInstance.wasHit();
            this.updateScoreboard();
        } else {
            this.miss++;
            this.updateScoreboard();
        }
    }

    updateScoreboard() {
        const scoreEl = document.querySelector('#score');
        if (scoreEl) {
            scoreEl.textContent = `Score: ${this.score}`;
        };
        
        const missEl = document.querySelector('#miss');
        if (missEl) {
            missEl.textContent = `Miss count = ${this.miss}`;
        };

        const timeEl = document.querySelector('#time');
        if (timeEl) {
            timeEl.textContent = `Time: ${this.timeLeft}`;
        };
    };

    reset() {
        this.stop();
        this.score = 0;
        this.miss = 0;

        this.updateScoreboard();
    }
}
