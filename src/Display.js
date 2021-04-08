import { BG_COLOR, COLOR, SCALE, DISPLAY_HEIGHT, DISPLAY_WIDTH, SPRITE_WIDTH } from "./displayConstants";

export class Display {
	constructor() {
		console.log("Create a new Display");
		this.screen = document.querySelector("canvas");

		this.screen.width = DISPLAY_WIDTH * SCALE;
		this.screen.height = DISPLAY_HEIGHT * SCALE;
		this.context = this.screen.getContext("2d");

		this.frameBuffer = blankBuffer();
		this.draw();
	}

	draw() {
		this.context.fillStyle = BG_COLOR;
		this.context.fillRect(0, 0, screen.width, screen.height);

		this.context.fillStyle = COLOR;
		this.frameBuffer.forEach((row, y) =>
			row.forEach((pic, x) =>
				pic && this.context.fillRect(x * SCALE, y * SCALE, SCALE, SCALE)));
	}

	drawSprite(sprite, x = 0, y = 0) {
		for (let row = 0; row < sprite.length; ++row) {
			for (let col = 0; col < SPRITE_WIDTH; ++col)
				this.frameBuffer[y + row][x + col] = sprite[row] & 1 << 7 - col;
		}
	}
}

const blankBuffer = () => Array(DISPLAY_HEIGHT).fill([]).map(row => Array(DISPLAY_WIDTH).fill(0));