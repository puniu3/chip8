import { CHAR_HEIGHT } from "./charSet";
import { Chip8 } from "./Chip8";
import { Registers } from "./Registers";

const chip8 = new Chip8();

(async () => {
	const zero = chip8.memory.sprite(0);
	const four = chip8.memory.sprite(4);
	const a = chip8.memory.sprite(10);
	chip8.display.drawSprite(zero, 0, 10);
	chip8.display.drawSprite(four, 8, 10);
	chip8.display.drawSprite(a, 16, 10);
	chip8.display.draw();
})();