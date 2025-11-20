import Game from "./modules/game.js";

const game = new Game(document.body);

game.initBoard();

const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');
const endBtn = document.querySelector('#end');

startBtn.addEventListener('click', () => {
    game.start();
});

pauseBtn.addEventListener('click', () => {
    game.stop();
});

endBtn.addEventListener('click', () => {
    game.reset();
});