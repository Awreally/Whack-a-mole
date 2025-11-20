import Game from "./modules/game.js";

const game = new Game(document.body);

game.initBoard();

const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');
const endBtn = document.querySelector('#end');

startBtn.addEventListener('click', () => {
    game.start();
    pauseBtn.textContent = 'Pause';
});

pauseBtn.addEventListener('click', () => {
    if (!game.isPaused) {
        game.pause();
        pauseBtn.textContent = 'Resume';
    } else {
        game.resume();
        pauseBtn.textContent = 'Pause';
    }
});

endBtn.addEventListener('click', () => {
    game.reset();
    pauseBtn.textContent = 'Pause';
});