import { CHARSET, CHAR_HEIGHT } from "./charSet";
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

	chip8.execute(0x69f5);
	chip8.execute(0xf929);
	chip8.execute(0xd005);
	chip8.execute(0xff55);
	chip8.display.draw();

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