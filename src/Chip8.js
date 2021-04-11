import { CHARSET, CHAR_HEIGHT } from "./charSet";
import { disassemble } from "./disassemble";
import { Display } from "./Display";
import { Keyboard } from "./Keyboard";
import { Memory } from "./Memory";
import { CHARSET_ADDRESS, ENTRY_POINT } from "./memoryConstants";
import { Registers } from "./Registers";
import { CLOCK } from "./registersConstants";

export class Chip8 {
	constructor(romBuffer) {
		this.display = new Display();
		this.memory = new Memory();
		this.registers = new Registers();
		this.keyboard = new Keyboard();
		this.loadCharset();
		this.loadRom(romBuffer);
	}

	loadCharset() {
		this.memory.memory.set(CHARSET, CHARSET_ADDRESS);
	}

	loadRom(romBuffer) {
		console.assert(romBuffer.length + ENTRY_POINT <= 0x0fff, "rom too large to fit in memory");
		this.memory.memory.set(romBuffer, ENTRY_POINT);
		this.registers.PC = ENTRY_POINT;
	}

	sleep(ms = CLOCK) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async execute(opcode) {
		const { id, args } = disassemble(opcode);
		this.registers.PC += 2;
		// console.log(id, ...args.map(n => n.toString(16)));

		const V = this.registers.V;

		switch (id) {
			case "CLS":
				this.display.clear();
				break;
			case "RET":
				this.registers.PC = this.registers.pop();
				break;
			case "JP_ADDR":
				this.registers.PC = args[0];
				break;
			case "CALL_ADDR":
				this.registers.push(this.registers.PC);
				this.registers.PC = args[0];
				break;
			case "SE_VX_KK":
				if (V[args[0]] === args[1])
					this.registers.PC += 2;
				break;
			case "SNE_VX_KK":
				if (V[args[0]] !== args[1])
					this.registers.PC += 2;
				break;
			case "SE_VX_VY":
				if (V[args[0]] === V[args[1]])
					this.registers.PC += 2;
				break;
			case "LD_VX_KK":
				V[args[0]] = args[1];
				break;
			case "ADD_VX_KK":
				V[args[0]] += args[1];
				break;
			case "LD_VX_VY":
				V[args[0]] = V[args[1]];
				break;
			case "OR_VX_VY":
				V[args[0]] |= V[args[1]];
				break;
			case "AND_VX_VY":
				V[args[0]] &= V[args[1]];
				break;
			case "XOR_VX_VY":
				V[args[0]] ^= V[args[1]];
				break;
			case "ADD_VX_VY":
				V[0xf] =
					(0xff - V[args[0]] < V[args[1]] ? 1 : 0);
				V[args[0]] += V[args[1]];
				break;
			case "SUB_VX_VY":
				V[0xf] =
					(V[args[0]] > V[args[1]] ? 1 : 0);
				V[args[0]] -= V[args[1]];
				break;
			case "SHR_VX_VY":
				V[0xf] =
					(V[args[0]] & 1 ? 1 : 0);
				V[args[0]] >>>= 1;
				break;
			case "SUBN_VX_VY":
				V[0xf] =
					(V[args[0]] < V[args[1]] ? 1 : 0);
				V[args[0]] -= V[args[1]];
				break;
			case "SHL_VX_VY":
				V[0xf] =
					(V[args[0]] & 0x80 ? 1 : 0);
				V[args[0]] <<= 1;
				break;
			case "SNE_VX_VY":
				if (V[args[0]] !== V[args[1]])
					this.registers.PC += 2;
				break;
			case "LD_ADDR":
				this.registers.I = args[0];
				break;
			case "JP_V0_ADDR":
				this.registers.PC = args[0] + V[0];
				break;
			case "RND_VX_KK":
				V[args[0]] = (Math.random() * 0xff | 0) & args[1];
				break;
			case "DRW_VX_VY_N":
				const I = this.registers.I;
				const x = V[args[0]];
				const y = V[args[1]];
				const spr = this.memory.memory.slice(I, I + args[2]);
				const collision = this.display.drawSprite(spr, x, y);
				V[0xf] = collision ? 1 : 0;
				break;
			case "SKP_VX":
				if (this.keyboard.getkey(V[args[0]]))
					this.registers.PC += 2;
				break;
			case "SKNP_VX":
				if (!this.keyboard.getkey(V[args[0]]))
					this.registers.PC += 2;
				break;
			case "LD_VX_DT":
				V[args[0]] = this.registers.DT;
				break;
			case "LD_VX_K":
				while (!this.keyboard.anydown()) {
					await this.sleep(CLOCK);
				}
				V[args[0]] = this.keyboard.getPressedKey();
				break;
			case "LD_DT_VX":
				this.registers.DT = V[args[0]];
				break;
			case "LD_ST_VX":
				this.registers.ST = V[args[0]];
				break;
			case "ADD_I_VX":
				this.registers.I += V[args[0]];
				break;
			case "LD_F_VX":
				this.registers.I = CHARSET_ADDRESS + CHAR_HEIGHT * V[args[0]];
				break;
			case "LD_B_VX":
				const h = V[args[0]] / 100 | 0;
				const t = (V[args[0]] / 10 | 0) % 10;
				const o = V[args[0]] % 10
				this.memory.memory.set([h, t, o], this.registers.I);
				break;
			case "LD_I_VX":
				this.memory.memory.set(V.slice(0, args[0] + 1), this.registers.I);
				break;
			case "LD_VX_I":
				for (let i = 0; i <= args[0]; ++i) {
					V[i] = this.memory.memory[this.registers.I + i];
				}
				break;
			default:
				break;
		}
	}
}