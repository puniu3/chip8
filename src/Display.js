import { BG_COLOR, COLOR, SCALE, DISPLAY_HEIGHT, DISPLAY_WIDTH, SPRITE_WIDTH } from "./displayConstants";

export class Display {
	constructor() {
		this.screen = document.querySelector("canvas");

		this.screen.width = DISPLAY_WIDTH * SCALE;
		this.screen.height = DISPLAY_HEIGHT * SCALE;
		this.context = this.screen.getContext("2d");
		this.clear();

		this.draw();
	}

	clear() { this.frameBuffer = blankBuffer(); }

	draw() {
		this.frameBuffer.forEach((row, y) =>
			row.forEach((pic, x) => {
				this.context.fillStyle = pic ? COLOR : BG_COLOR;
				this.context.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
			}));
	}

	drawSprite(sprite, x = 0, y = 0) {
		let collision = false;
		for (let row = 0; row < sprite.length; ++row) {
			for (let col = 0; col < SPRITE_WIDTH; ++col) {
				if (this.blitz && row + y >= DISPLAY_HEIGHT)
					return;
				const xx = (x + col) % DISPLAY_WIDTH;
				const yy = (y + row) % DISPLAY_HEIGHT;
				const pix = (sprite[row] & (1 << (7 - col))) ? 1 : 0;
				if (this.frameBuffer[yy][xx] && pix)
					collision = true;
				this.frameBuffer[yy][xx] ^= pix;
			}
		}
		return collision;
	}
}

const blankBuffer = () => Array(DISPLAY_HEIGHT).fill([]).map(row => Array(DISPLAY_WIDTH).fill(0));