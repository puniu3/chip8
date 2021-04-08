import { Display } from "./Display";
import { Keyboard } from "./Keyboard";
import { Memory } from "./Memory";
import { Registers } from "./Registers";

export class Chip8 {
	constructor() {
		console.log("Create a new Chip-8");
		this.display = new Display();
		this.memory = new Memory();
		this.registers = new Registers();
		this.keyboard = new Keyboard();
	}
}