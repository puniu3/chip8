import { CHAR_HEIGHT } from "./charSet";
import { CHARSET_ADDRESS, MEMORY_SIZE } from "./memoryConstants";

export class Memory {
	constructor() {
		this.memory = new Uint8Array(MEMORY_SIZE);
		this.memory.fill(0);
	}

	setMemory(idx, val) {
		if (idx < MEMORY_SIZE)
			this.memory[idx] = val;
	}

	getMemory(idx) {
		if (idx < MEMORY_SIZE) return this.memory[idx];
	}

	sprite(id) {
		const offset = CHARSET_ADDRESS + id * CHAR_HEIGHT;
		return this.memory.slice(offset, offset + CHAR_HEIGHT);
	}
}