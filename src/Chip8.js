import { CHARSET } from "./charSet";
import { Display } from "./Display";
import { Keyboard } from "./Keyboard";
import { Memory } from "./Memory";
import { CHARSET_ADDRESS, ENTRY_POINT } from "./memoryConstants";
import { Registers } from "./Registers";
import { CLOCK } from "./registersConstants";

export class Chip8 {
	constructor(romBuffer) {
		console.log("Create a new Chip-8");
		this.display = new Display();
		this.memory = new Memory();
		this.registers = new Registers();
		this.keyboard = new Keyboard();
		this.memory.memory.set(CHARSET, CHARSET_ADDRESS);
		this.loadRom(romBuffer);
	}

	loadRom(romBuffer) {
		console.assert(romBuffer.length + ENTRY_POINT <= 0x0fff);
		this.memory.memory.set(romBuffer, ENTRY_POINT);
		this.registers.PC = ENTRY_POINT;
	}

	sleep(ms = CLOCK) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}