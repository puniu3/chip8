import { ENTRY_POINT } from "./memoryConstants";
import { NUM_REGISTERS, STACK_DEPTH } from "./registersConstants";

export class Registers {
	constructor() {
		this.reset();
	}

	reset() {
		this.V = new Uint8Array(NUM_REGISTERS).fill(0);
		this.I = 0;
		this.DT = 0;
		this.ST = 0;
		this.PC = ENTRY_POINT;
		this.SP = -1;
		this.stack = new Uint16Array(STACK_DEPTH).fill(0);
	}

	push(val) { this.stack[++this.SP] = val; }
	pop() { return this.stack[this.SP--]; }
}