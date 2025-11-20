export default class Mole {
  constructor(hole, ttl = 900) {
    this.hole = hole;
    this.el = null;
    this.timer = null;
    this.ttl = ttl;
  }

  spawn() {
    this.el = document.createElement("div");
    this.el.className = "mole";
    this.hole.appendChild(this.el);

    this.timer = setTimeout(() => this.hide(), this.ttl);
  }

  hide() {
    clearTimeout(this.timer);
    this.el?.remove();
    this.el = null;
  }

  hit() {
    this.hide();
    return true;
  }
}
