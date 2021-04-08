import { MEMORY_SIZE } from "./memoryConstants";

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
}