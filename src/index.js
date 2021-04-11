import { Chip8 } from "./Chip8";
import { CLOCKS_PER_TIME_UNIT, TIME_UNIT } from "./registersConstants";
import { makeSoundcard } from "./SoundCard";

document.querySelector("#rom").addEventListener("change", onSelect);
let running = false;

function onSelect() {
	console.log(this.value);
	run(this.value);
	document.querySelector("#rom").style.display = "none";
}

async function run(romName) {
	const rom = await fetch("/roms/" + romName);
	const arrayBuffer = await rom.arrayBuffer();
	const romBuffer = new Uint8Array(arrayBuffer);
	const chip8 = new Chip8(romBuffer);
	const soundcard = makeSoundcard();

	while (true) {
		for (let i = 0; i < CLOCKS_PER_TIME_UNIT; ++i) {
			const op = chip8.memory.getOpcode(chip8.registers.PC);
			chip8.execute(op);
			chip8.display.draw();
		}
		if (chip8.registers.DT > 0) {
			--chip8.registers.DT;
		}

		if (chip8.registers.ST > 0) {
			--chip8.registers.ST;
			soundcard.start();
		} else {
			soundcard.stop();
		}
		await chip8.sleep(TIME_UNIT);
	}
}