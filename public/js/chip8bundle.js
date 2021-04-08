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
/* harmony import */ var _Display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _Keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _Memory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _Registers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);





class Chip8 {
	constructor() {
		console.log("Create a new Chip-8");
		this.display = new _Display__WEBPACK_IMPORTED_MODULE_0__.Display();
		this.memory = new _Memory__WEBPACK_IMPORTED_MODULE_2__.Memory();
		this.registers = new _Registers__WEBPACK_IMPORTED_MODULE_3__.Registers();
		this.keyboard = new _Keyboard__WEBPACK_IMPORTED_MODULE_1__.Keyboard();
	}
}

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Display": () => (/* binding */ Display)
/* harmony export */ });
/* harmony import */ var _displayConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


class Display {
	constructor() {
		console.log("Create a new Display");
		this.screen = document.querySelector("canvas");

		this.screen.width = _displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_WIDTH * _displayConstants__WEBPACK_IMPORTED_MODULE_0__.SCALE;
		this.screen.height = _displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_HEIGHT * _displayConstants__WEBPACK_IMPORTED_MODULE_0__.SCALE;
		this.context = this.screen.getContext("2d");

		this.frameBuffer = blankBuffer();
		this.draw();
	}

	draw() {
		this.context.fillStyle = _displayConstants__WEBPACK_IMPORTED_MODULE_0__.BG_COLOR;
		this.context.fillRect(0, 0, screen.width, screen.height);

		this.context.fillStyle = _displayConstants__WEBPACK_IMPORTED_MODULE_0__.COLOR;
		this.frameBuffer.forEach((row, y) =>
			row.forEach((pic, x) =>
				pic && this.context.fillRect(x * _displayConstants__WEBPACK_IMPORTED_MODULE_0__.SCALE, y * _displayConstants__WEBPACK_IMPORTED_MODULE_0__.SCALE, _displayConstants__WEBPACK_IMPORTED_MODULE_0__.SCALE, _displayConstants__WEBPACK_IMPORTED_MODULE_0__.SCALE)));
	}
}

const blankBuffer = () => Array(_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_HEIGHT).fill([]).map(row => Array(_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_WIDTH).fill(0));

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DISPLAY_WIDTH": () => (/* binding */ DISPLAY_WIDTH),
/* harmony export */   "DISPLAY_HEIGHT": () => (/* binding */ DISPLAY_HEIGHT),
/* harmony export */   "SCALE": () => (/* binding */ SCALE),
/* harmony export */   "BG_COLOR": () => (/* binding */ BG_COLOR),
/* harmony export */   "COLOR": () => (/* binding */ COLOR)
/* harmony export */ });
const DISPLAY_WIDTH = 64;
const DISPLAY_HEIGHT = 32;
const SCALE = 10;
const BG_COLOR = "#000";
const COLOR = "#3f6";

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Memory": () => (/* binding */ Memory)
/* harmony export */ });
/* harmony import */ var _memoryConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);


class Memory {
	constructor() {
		this.memory = new Uint8Array(_memoryConstants__WEBPACK_IMPORTED_MODULE_0__.MEMORY_SIZE);
		this.memory.fill(0);
	}

	setMemory(idx, val) {
		if (idx < _memoryConstants__WEBPACK_IMPORTED_MODULE_0__.MEMORY_SIZE)
			this.memory[idx] = val;
	}

	getMemory(idx) {
		if (idx < _memoryConstants__WEBPACK_IMPORTED_MODULE_0__.MEMORY_SIZE) return this.memory[idx];
	}
}

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MEMORY_SIZE": () => (/* binding */ MEMORY_SIZE),
/* harmony export */   "ENTRY_POINT": () => (/* binding */ ENTRY_POINT)
/* harmony export */ });
const MEMORY_SIZE = 4096;
const ENTRY_POINT = 0x200;

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Registers": () => (/* binding */ Registers)
/* harmony export */ });
/* harmony import */ var _memoryConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _registersConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);



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
	pop() { return this.stack[this.SP--]; }
}

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NUM_REGISTERS": () => (/* binding */ NUM_REGISTERS),
/* harmony export */   "STACK_DEPTH": () => (/* binding */ STACK_DEPTH)
/* harmony export */ });
const NUM_REGISTERS = 16;
const STACK_DEPTH = 16;

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Keyboard": () => (/* binding */ Keyboard)
/* harmony export */ });
const keyMap = [..."x123qweasdzc4rfv"];

class Keyboard {
	constructor() {
		window.addEventListener("keydown", this.keydown);
	}

	keydown({ key }) {
		const idx = keyMap.indexOf(key);
		console.log(idx);
	}
}

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
/* harmony import */ var _Registers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);



const chip8 = new _Chip8__WEBPACK_IMPORTED_MODULE_0__.Chip8();
})();

/******/ })()
;