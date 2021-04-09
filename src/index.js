import { CHAR_HEIGHT } from "./charSet";
import { Chip8 } from "./Chip8";
import { disassemble } from "./disassemble";
import { Registers } from "./Registers";
import { CLOCK } from "./registersConstants";
import { soundcard } from "./SoundCard";


(async () => {
	const rom = await fetch("../roms/test_opcode.ch8");
	const arrayBuffer = await rom.arrayBuffer();
	const romBuffer = new Uint8Array(arrayBuffer);
	const chip8 = new Chip8(romBuffer);

	console.log(chip8.memory.getOpcode(0x200).toString(16));
	console.log(chip8.memory.getOpcode(0x202).toString(16));
	console.log(chip8.memory.getOpcode(0x204).toString(16));
	// while (true) {
	// 	if (chip8.registers.DT)
	// 		--chip8.registers.DT;
	// 	if (chip8.registers.ST) {
	// 		--chip8.registers.ST;
	// 		soundcard.start();
	// 	} else {
	// 		soundcard.stop();
	// 	}
	// 	await chip8.sleep(CLOCK);
	// }
})();