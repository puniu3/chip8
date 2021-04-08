import { CHARSET } from "./charSet";
import { Display } from "./Display";
import { Keyboard } from "./Keyboard";
import { Memory } from "./Memory";
import { CHARSET_ADDRESS } from "./memoryConstants";
import { Registers } from "./Registers";

export class Chip8 {
	constructor() {
		console.log("Create a new Chip-8");
		this.display = new Display();
		this.memory = new Memory();
		this.registers = new Registers();
		this.keyboard = new Keyboard();
		this.memory.memory.set(CHARSET, CHARSET_ADDRESS);
	}

	sleep(ms = 500) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}