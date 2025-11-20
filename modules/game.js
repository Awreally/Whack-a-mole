import Mole from "./mole.js";

export default class Game {
  constructor(root) {
    this.root = root;
    this.holes = [];
    this.moles = new Map();
    this.score = 0;
    this.misses = 0;
    this.timeLeft = 60;
    this.isRunning = false;
    this.isPaused = false;
    this.spawnInterval = null;
    this.tickInterval = null;
  }

  initBoard() {
    const board = document.querySelector("#gameboard");

    for (let i = 0; i < 9; i++) {
      const hole = document.createElement("button");
      hole.className = "hole";
      hole.type = "button";
      hole.setAttribute("aria-label", `Hole ${i + 1}`);
      board.appendChild(hole);
      this.holes.push(hole);
    }

    board.addEventListener("click", (e) => this.onClick(e));
  }

  start() {
    this.stop();
    this.score = 0;
    this.misses = 0;
    this.timeLeft = 60;
    this.isRunning = true;
    this.isPaused = false;
    this.refresh();

    this.spawnInterval = setInterval(() => this.spawnMole(), 1000);
    this.tickInterval = setInterval(() => {
      this.timeLeft--;
      this.refresh();
      if (this.timeLeft <= 0) this.stop();
    }, 1000);
  }

  stop() {
    clearInterval(this.spawnInterval);
    clearInterval(this.tickInterval);

    this.moles.forEach((mole) => mole.hide());
    this.moles.clear();

    this.isRunning = false;
    this.isPaused = false;
  }

  pause() {
    if (!this.isRunning || this.isPaused) return;

    this.isPaused = true;
    clearInterval(this.spawnInterval);
    clearInterval(this.tickInterval);
  }

  resume() {
    if (!this.isPaused) return;

    this.isPaused = false;
    this.spawnInterval = setInterval(() => this.spawnMole(), 1000);
    this.tickInterval = setInterval(() => {
      this.timeLeft--;
      this.refresh();
      if (this.timeLeft <= 0) this.stop();
    }, 1000);
  }

  spawnMole() {
    const emptyHoles = this.holes.filter((h) => !this.moles.has(h));
    if (emptyHoles.length === 0) return;

    const hole = emptyHoles[Math.floor(Math.random() * emptyHoles.length)];
    const mole = new Mole(hole, 800);

    this.moles.set(hole, mole);
    mole.spawn();

    setTimeout(() => this.moles.delete(hole), 800);
  }

  onClick(e) {
    if (!this.isRunning || this.isPaused) return;

    const hole = e.target.closest(".hole");
    if (!hole) return;

    const mole = this.moles.get(hole);
    if (mole) {
      this.score++;
      mole.hit();
      this.moles.delete(hole);
    } else {
      this.misses++;
    }

    this.refresh();
  }

  refresh() {
    document.querySelector("#score").textContent = `Score: ${this.score}`;
    document.querySelector("#miss").textContent = `Miss count = ${this.misses}`;
    document.querySelector("#time").textContent = `Time: ${this.timeLeft}`;
  }

  reset() {
    this.stop();
    this.score = 0;
    this.misses = 0;
    this.timeLeft = 60;
    this.refresh();
  }
}
