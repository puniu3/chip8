import { CHAR_HEIGHT } from "./charSet";
import { CHARSET_ADDRESS, MEMORY_SIZE } from "./memoryConstants";

export class Memory {
	constructor() {
		this.memory = new Uint8Array(MEMORY_SIZE);
		this.memory.fill(0);
	}

	setMemory(idx, val) {
		console.assert(idx < MEMORY_SIZE, "setMemory: RAM out of index");
		this.memory[idx] = val;
	}

	getMemory(idx) {
		console.assert(idx < MEMORY_SIZE, "getMemory: RAM out of index");
		return this.memory[idx];
	}

	getOpcode(idx) {
		const hb = this.getMemory(idx);
		const lb = this.getMemory(idx + 1);
		return (hb << 8) | lb;
	}

	sprite(id) {
		const offset = CHARSET_ADDRESS + id * CHAR_HEIGHT;
		return this.memory.slice(offset, offset + CHAR_HEIGHT);
	}
}