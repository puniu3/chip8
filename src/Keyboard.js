const keyMap = [..."x123qweasdzc4rfv"];

export class Keyboard {
	constructor() {
		window.addEventListener("keydown", this.keydown);
	}

	keydown({ key }) {
		const idx = keyMap.indexOf(key);
		console.log(idx);
	}
}