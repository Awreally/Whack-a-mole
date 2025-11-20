export default class Mole {
    constructor(holeElement, options = {}) {
        this.holeElement = holeElement;
        this.element = null;
        this.ttl = options.ttl || 800;
        this.timeoutId = null;
    }

    mount() {
        this.element = document.createElement('div');
        this.element.classList.add('mole');

        this.element.moleInstance = this;

        this.holeElement.appendChild(this.element);

        this.timeoutId = setTimeout(() => {
            this.remove();
        }, this.ttl);
    }

    remove() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }

        if (this.element && this.element.parentNode) {
            this.element.remove();
        }
        this.element = null;
    }

    wasHit() {
        this.remove();
        return true;
    }
}