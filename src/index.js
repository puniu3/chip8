import { CHARSET, CHAR_HEIGHT } from "./charSet";
import { Chip8 } from "./Chip8";
import { disassemble } from "./disassemble";
import { Registers } from "./Registers";
import { CLOCK } from "./registersConstants";
import { makeSoundcard } from "./SoundCard";

document.addEventListener("mousedown", boot);

function boot() {
	run();
	document.removeEventListener("mousedown", boot);
}

async function run() {
	const rom = await fetch("/roms/PONG2");
	const arrayBuffer = await rom.arrayBuffer();
	const romBuffer = new Uint8Array(arrayBuffer);
	const chip8 = new Chip8(romBuffer);
	const soundcard = makeSoundcard();

	while (true) {
		const op = chip8.memory.getOpcode(chip8.registers.PC);
		chip8.execute(op);
		chip8.display.draw();

		if (chip8.registers.DT > 0) {
			--chip8.registers.DT;
		}

		if (chip8.registers.ST > 0) {
			--chip8.registers.ST;
			soundcard.start();
		} else {
			soundcard.stop();
		}

		await chip8.sleep(CLOCK / 5);
	}
}