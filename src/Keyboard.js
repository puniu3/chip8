const keyMap = [..."x123qweasdzc4rfv"];
const NUM_KEYS = 16;

export class Keyboard {
	constructor() {
		this.keys = new Array(NUM_KEYS).fill(false);
		window.addEventListener("keydown", e => this.keydown(e));
		window.addEventListener("keyup", e => this.keyup(e));
	}

	keydown({ key }) {
		const idx = keyMap.indexOf(key);
		if (idx !== -1) this.keys[idx] = true;
	}

	keyup({ key }) {
		const idx = keyMap.indexOf(key);
		if (idx !== -1) this.keys[idx] = false;
	}

	getkey(key) { return this.keys[key] || false; }
	getPressedKey() { return this.keys.indexOf(true); }
	anydown() { return this.keys.some(down => down); }
}