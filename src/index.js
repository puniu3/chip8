import { Chip8 } from "./Chip8";
import { CLOCKS_PER_TIME_UNIT, TIME_UNIT } from "./registersConstants";
import { makeSoundcard } from "./SoundCard";

let loopId;
let soundcard;

document.querySelector("#rom").addEventListener("change", onSelect);

function onSelect() {
	soundcard = soundcard || makeSoundcard();
	run(this.value);
	this.blur();
}


async function run(romName) {
	const rom = await fetch("/roms/" + romName);
	const arrayBuffer = await rom.arrayBuffer();
	const romBuffer = new Uint8Array(arrayBuffer);
	const chip8 = new Chip8(romBuffer);

	clearInterval(loopId);
	loopId = setInterval(loop, TIME_UNIT);

	function loop() {
		// for (let i = 0; i < CLOCKS_PER_TIME_UNIT; ++i) {
		const op = chip8.memory.getOpcode(chip8.registers.PC);
		chip8.execute(op);
		chip8.display.draw();
		// }

		if (chip8.registers.DT > 0) {
			--chip8.registers.DT;
		}

		if (chip8.registers.ST > 0) {
			--chip8.registers.ST;
			soundcard.start();
		} else {
			soundcard.stop();
		}
	}
}