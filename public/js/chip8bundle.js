/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Chip8": () => (/* binding */ Chip8)
/* harmony export */ });
/* harmony import */ var _charSet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _disassemble__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _Display__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _Keyboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _Memory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _memoryConstants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
/* harmony import */ var _Registers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9);








class Chip8 {
	constructor(romBuffer) {
		this.display = new _Display__WEBPACK_IMPORTED_MODULE_2__.Display();
		this.memory = new _Memory__WEBPACK_IMPORTED_MODULE_4__.Memory();
		this.registers = new _Registers__WEBPACK_IMPORTED_MODULE_6__.Registers();
		this.keyboard = new _Keyboard__WEBPACK_IMPORTED_MODULE_3__.Keyboard();
		this.loadCharset();
		this.loadRom(romBuffer);
	}

	loadCharset() {
		this.memory.memory.set(_charSet__WEBPACK_IMPORTED_MODULE_0__.CHARSET, _memoryConstants__WEBPACK_IMPORTED_MODULE_5__.CHARSET_ADDRESS);
	}

	loadRom(romBuffer) {
		console.assert(romBuffer.length + _memoryConstants__WEBPACK_IMPORTED_MODULE_5__.ENTRY_POINT <= 0x0fff, "rom too large to fit in memory");
		this.memory.memory.set(romBuffer, _memoryConstants__WEBPACK_IMPORTED_MODULE_5__.ENTRY_POINT);
		this.registers.PC = _memoryConstants__WEBPACK_IMPORTED_MODULE_5__.ENTRY_POINT;
	}

	async execute(opcode) {
		const { id, args } = (0,_disassemble__WEBPACK_IMPORTED_MODULE_1__.disassemble)(opcode);
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
				V[args[0]] = Math.floor(Math.random() * 0xff) & args[1];
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
				if (!this.keyboard.anydown())
					this.registers.PC -= 2;
				else
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
				this.registers.I = _memoryConstants__WEBPACK_IMPORTED_MODULE_5__.CHARSET_ADDRESS + _charSet__WEBPACK_IMPORTED_MODULE_0__.CHAR_HEIGHT * V[args[0]];
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

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CHAR_HEIGHT": () => (/* binding */ CHAR_HEIGHT),
/* harmony export */   "CHARSET": () => (/* binding */ CHARSET)
/* harmony export */ });
const CHAR_HEIGHT = 5;
const CHARSET = [
	0xF0,
	0x90,
	0x90,
	0x90,
	0xF0,
	0x20,
	0x60,
	0x20,
	0x20,
	0x70,
	0xF0,
	0x10,
	0xF0,
	0x80,
	0xF0,
	0xF0,
	0x10,
	0xF0,
	0x10,
	0xF0,
	0x90,
	0x90,
	0xF0,
	0x10,
	0x10,
	0xF0,
	0x80,
	0xF0,
	0x10,
	0xF0,
	0xF0,
	0x80,
	0xF0,
	0x90,
	0xF0,
	0xF0,
	0x10,
	0x20,
	0x40,
	0x40,
	0xF0,
	0x90,
	0xF0,
	0x90,
	0xF0,
	0xF0,
	0x90,
	0xF0,
	0x10,
	0xF0,
	0xF0,
	0x90,
	0xF0,
	0x90,
	0x90,
	0xE0,
	0x90,
	0xE0,
	0x90,
	0xE0,
	0xF0,
	0x80,
	0x80,
	0x80,
	0xF0,
	0xE0,
	0x90,
	0x90,
	0x90,
	0xE0,
	0xF0,
	0x80,
	0xF0,
	0x80,
	0xF0,
	0xF0,
	0x80,
	0xF0,
	0x80,
	0x80,
];

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "disassemble": () => (/* binding */ disassemble)
/* harmony export */ });
function Instruction(key, id, name, pattern, args = []) {
	this.key = key;
	this.id = id;
	this.name = name;
	this.pattern = pattern;
	this.mask = args.reduce((pat, arg) => pat ^ arg, 0xffff);
	this.args = args.map(mask => ({ mask, shift: trailZeros(mask) }));

	function trailZeros(mask) {
		if ((mask & 0x0fff) === 0) return 12;
		if ((mask & 0x00ff) === 0) return 8;
		if ((mask & 0x000f) === 0) return 4;
		return 0;
	}
}

const INSTRUCTIONS = [
	new Instruction(2, "CLS", "CLS", 0x00e0),
	new Instruction(3, "RET", "RET", 0x00ee),
	new Instruction(4, "JP_ADDR", "JP", 0x1000, [0x0fff]),
	new Instruction(5, "CALL_ADDR", "CALL", 0x2000, [0x0fff]),
	new Instruction(6, "SE_VX_KK", "SE", 0x3000, [0x0f00, 0x00ff]),
	new Instruction(7, "SNE_VX_KK", "SNE", 0x4000, [0x0f00, 0x00ff]),
	new Instruction(8, "SE_VX_VY", "SE", 0x5000, [0x0f00, 0x00f0]),
	new Instruction(9, "LD_VX_KK", "LD", 0x6000, [0x0f00, 0x00ff]),
	new Instruction(10, "ADD_VX_KK", "ADD", 0x7000, [0x0f00, 0x00ff]),
	new Instruction(11, "LD_VX_VY", "LD", 0x8000, [0x0f00, 0x00f0]),
	new Instruction(12, "OR_VX_VY", "OR", 0x8001, [0x0f00, 0x00f0]),
	new Instruction(13, "AND_VX_VY", "AND", 0x8002, [0x0f00, 0x00f0]),
	new Instruction(14, "XOR_VX_VY", "XOR", 0x8003, [0x0f00, 0x00f0]),
	new Instruction(15, "ADD_VX_VY", "ADD", 0x8004, [0x0f00, 0x00f0]),
	new Instruction(16, "SUB_VX_VY", "SUB", 0x8005, [0x0f00, 0x00f0]),
	new Instruction(17, "SHR_VX_VY", "SHR", 0x8006, [0x0f00, 0x00f0]),
	new Instruction(18, "SUBN_VX_VY", "SUBN", 0x8007, [0x0f00, 0x00f0]),
	new Instruction(19, "SHL_VX_VY", "SHL", 0x800e, [0x0f00, 0x00f0]),
	new Instruction(20, "SNE_VX_VY", "SNE", 0x9000, [0x0f00, 0x00f0]),
	new Instruction(21, "LD_ADDR", "LD", 0xa000, [0x0fff]),
	new Instruction(22, "JP_V0_ADDR", "JP", 0xb000, [0x0fff]),
	new Instruction(23, "RND_VX_KK", "RND", 0xc000, [0x0f00, 0x00ff]),
	new Instruction(24, "DRW_VX_VY_N", "DRW", 0xd000, [0x0f00, 0x00f0, 0x000f]),
	new Instruction(25, "SKP_VX", "SKP", 0xe09e, [0x0f00]),
	new Instruction(26, "SKNP_VX", "SKNP", 0xe0a1, [0x0f00]),
	new Instruction(27, "LD_VX_DT", "LD", 0xf007, [0x0f00]),
	new Instruction(28, "LD_VX_K", "LD", 0xf00a, [0x0f00]),
	new Instruction(29, "LD_DT_VX", "LD", 0xf015, [0x0f00]),
	new Instruction(30, "LD_ST_VX", "LD", 0xf018, [0x0f00]),
	new Instruction(31, "ADD_I_VX", "ADD", 0xf01e, [0x0f00]),
	new Instruction(32, "LD_F_VX", "LD", 0xf029, [0x0f00]),
	new Instruction(33, "LD_B_VX", "LD", 0xf033, [0x0f00]),
	new Instruction(34, "LD_I_VX", "LD", 0xf055, [0x0f00]),
	new Instruction(35, "LD_VX_I", "LD", 0xf065, [0x0f00]),
];

function disassemble(opcode) {
	const inst = INSTRUCTIONS.find(
		i => (opcode & i.mask) === i.pattern
	);
	console.assert(inst !== undefined, `invalid opcode ${opcode.toString(16)}`);
	const args = inst.args
		.map(a => (a.mask & opcode) >> a.shift);
	return { id: inst.id, args };
}

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Display": () => (/* binding */ Display)
/* harmony export */ });
/* harmony import */ var _displayConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);


class Display {
	constructor() {
		this.screen = document.querySelector("canvas");

		this.screen.width = _displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_WIDTH * _displayConstants__WEBPACK_IMPORTED_MODULE_0__.SCALE;
		this.screen.height = _displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_HEIGHT * _displayConstants__WEBPACK_IMPORTED_MODULE_0__.SCALE;
		this.context = this.screen.getContext("2d");
		this.clear();

		this.draw();
	}

	clear() { this.frameBuffer = blankBuffer(); }

	draw() {
		this.frameBuffer.forEach((row, y) =>
			row.forEach((pic, x) => {
				this.context.fillStyle = pic ? _displayConstants__WEBPACK_IMPORTED_MODULE_0__.COLOR : _displayConstants__WEBPACK_IMPORTED_MODULE_0__.BG_COLOR;
				this.context.fillRect(x * _displayConstants__WEBPACK_IMPORTED_MODULE_0__.SCALE, y * _displayConstants__WEBPACK_IMPORTED_MODULE_0__.SCALE, _displayConstants__WEBPACK_IMPORTED_MODULE_0__.SCALE, _displayConstants__WEBPACK_IMPORTED_MODULE_0__.SCALE);
			}));
	}

	drawSprite(sprite, x = 0, y = 0) {
		let collision = false;
		for (let row = 0; row < sprite.length; ++row) {
			for (let col = 0; col < _displayConstants__WEBPACK_IMPORTED_MODULE_0__.SPRITE_WIDTH; ++col) {
				if (this.blitz && row + y >= _displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_HEIGHT)
					return;
				const xx = (x + col) % _displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_WIDTH;
				const yy = (y + row) % _displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_HEIGHT;
				const pix = (sprite[row] & (1 << (7 - col))) ? 1 : 0;
				if (this.frameBuffer[yy][xx] && pix)
					collision = true;
				this.frameBuffer[yy][xx] ^= pix;
			}
		}
		return collision;
	}
}

const blankBuffer = () => Array(_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_HEIGHT).fill([]).map(row => Array(_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_WIDTH).fill(0));

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DISPLAY_WIDTH": () => (/* binding */ DISPLAY_WIDTH),
/* harmony export */   "DISPLAY_HEIGHT": () => (/* binding */ DISPLAY_HEIGHT),
/* harmony export */   "SCALE": () => (/* binding */ SCALE),
/* harmony export */   "SPRITE_WIDTH": () => (/* binding */ SPRITE_WIDTH),
/* harmony export */   "BG_COLOR": () => (/* binding */ BG_COLOR),
/* harmony export */   "COLOR": () => (/* binding */ COLOR)
/* harmony export */ });
const DISPLAY_WIDTH = 64;
const DISPLAY_HEIGHT = 32;
const SCALE = 10;
const SPRITE_WIDTH = 8;
const BG_COLOR = "#000";
const COLOR = "#3f6";

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Keyboard": () => (/* binding */ Keyboard)
/* harmony export */ });
const keyMap = [..."x123qweasdzc4rfv"];
const NUM_KEYS = 16;

class Keyboard {
	constructor() {
		this.keys = new Array(NUM_KEYS).fill(false);
		window.addEventListener("keydown", e => this.keydown(e));
		window.addEventListener("keyup", e => this.keyup(e));
	}

	keydown({ key }) {
		const idx = keyMap.indexOf(key);
		if (idx !== -1) this.keys[idx] = true;
	}

	keyup({ key }) {
		const idx = keyMap.indexOf(key);
		if (idx !== -1) this.keys[idx] = false;
	}

	getkey(key) { return this.keys[key] || false; }
	getPressedKey() { return this.keys.indexOf(true); }
	anydown() { return this.keys.some(down => down); }
}

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Memory": () => (/* binding */ Memory)
/* harmony export */ });
/* harmony import */ var _charSet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _memoryConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);



class Memory {
	constructor() {
		this.memory = new Uint8Array(_memoryConstants__WEBPACK_IMPORTED_MODULE_1__.MEMORY_SIZE);
		this.memory.fill(0);
	}

	setMemory(idx, val) {
		console.assert(idx < _memoryConstants__WEBPACK_IMPORTED_MODULE_1__.MEMORY_SIZE, "setMemory: RAM out of index");
		this.memory[idx] = val;
	}

	getMemory(idx) {
		console.assert(idx < _memoryConstants__WEBPACK_IMPORTED_MODULE_1__.MEMORY_SIZE, "getMemory: RAM out of index");
		return this.memory[idx];
	}

	getOpcode(idx) {
		const hb = this.getMemory(idx);
		const lb = this.getMemory(idx + 1);
		return (hb << 8) | lb;
	}

	sprite(id) {
		const offset = _memoryConstants__WEBPACK_IMPORTED_MODULE_1__.CHARSET_ADDRESS + id * _charSet__WEBPACK_IMPORTED_MODULE_0__.CHAR_HEIGHT;
		return this.memory.slice(offset, offset + _charSet__WEBPACK_IMPORTED_MODULE_0__.CHAR_HEIGHT);
	}
}

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MEMORY_SIZE": () => (/* binding */ MEMORY_SIZE),
/* harmony export */   "ENTRY_POINT": () => (/* binding */ ENTRY_POINT),
/* harmony export */   "CHARSET_ADDRESS": () => (/* binding */ CHARSET_ADDRESS)
/* harmony export */ });
const MEMORY_SIZE = 4096;
const ENTRY_POINT = 0x200;
const CHARSET_ADDRESS = 0x000;

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Registers": () => (/* binding */ Registers)
/* harmony export */ });
/* harmony import */ var _memoryConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _registersConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);



class Registers {
	constructor() {
		this.reset();
	}

	reset() {
		this.V = new Uint8Array(_registersConstants__WEBPACK_IMPORTED_MODULE_1__.NUM_REGISTERS).fill(0);
		this.I = 0;
		this.DT = 0;
		this.ST = 0;
		this.PC = _memoryConstants__WEBPACK_IMPORTED_MODULE_0__.ENTRY_POINT;
		this.SP = -1;
		this.stack = new Uint16Array(_registersConstants__WEBPACK_IMPORTED_MODULE_1__.STACK_DEPTH).fill(0);
	}

	push(val) { this.stack[++this.SP] = val; }
	pop() {
		console.assert(this.SP >= 0, "stack underflow.");
		return this.stack[this.SP--];
	}
}

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NUM_REGISTERS": () => (/* binding */ NUM_REGISTERS),
/* harmony export */   "STACK_DEPTH": () => (/* binding */ STACK_DEPTH),
/* harmony export */   "TIME_UNIT": () => (/* binding */ TIME_UNIT),
/* harmony export */   "CLOCKS_PER_TIME_UNIT": () => (/* binding */ CLOCKS_PER_TIME_UNIT)
/* harmony export */ });
const NUM_REGISTERS = 16;
const STACK_DEPTH = 16;
const TIME_UNIT = 1000 / 60;
const CLOCKS_PER_TIME_UNIT = 9;

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeSoundcard": () => (/* binding */ makeSoundcard)
/* harmony export */ });
const makeSoundcard = () => {
	const VOLUME = 0.3;
	const atx = new (window.AudioContext || window.webkitAudioContext)();
	const gain = atx.createGain();
	const osc = atx.createOscillator();
	osc.connect(gain).connect(atx.destination);

	gain.gain.setValueAtTime(0.00001, atx.currentTime);
	osc.type = "triangle";
	osc.frequency.value = 392;
	osc.start(atx.currentTime);
	let playing = false;

	return {
		start: () => {
			if (playing) return;
			playing = true;
			gain.gain.setValueAtTime(VOLUME, atx.currentTime);
		},
		stop: () => {
			if (!playing) return;
			playing = false;
			gain.gain.setValueAtTime(VOLUME, atx.currentTime);
			gain.gain.exponentialRampToValueAtTime(0.0000001, atx.currentTime + .02);
		},
	}

};


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Chip8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _registersConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _SoundCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);




let loopId;
let soundcard;

document.querySelector("#rom").addEventListener("change", onSelect);

function onSelect() {
	soundcard = soundcard || (0,_SoundCard__WEBPACK_IMPORTED_MODULE_2__.makeSoundcard)();
	run(this.value);
	this.blur();
}


async function run(romName) {
	const rom = await fetch("/roms/" + romName);
	const arrayBuffer = await rom.arrayBuffer();
	const romBuffer = new Uint8Array(arrayBuffer);
	const chip8 = new _Chip8__WEBPACK_IMPORTED_MODULE_0__.Chip8(romBuffer);
	chip8.display.blitz = (romName === "BLITZ");

	clearInterval(loopId);
	loopId = setInterval(loop, _registersConstants__WEBPACK_IMPORTED_MODULE_1__.TIME_UNIT);

	function loop() {
		for (let i = 0; i < _registersConstants__WEBPACK_IMPORTED_MODULE_1__.CLOCKS_PER_TIME_UNIT; ++i) {
			const op = chip8.memory.getOpcode(chip8.registers.PC);
			chip8.execute(op);
			chip8.display.draw();
		}

		if (chip8.registers.DT > 0) {
			--chip8.registers.DT;
		}

		if (chip8.registers.ST > 0) {
			--chip8.registers.ST;
			soundcard.start();
		} else {
			soundcard.stop();
		}
	}
}
})();

/******/ })()
;