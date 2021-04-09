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

export function disassemble(opcode) {
	const inst = INSTRUCTIONS.find(
		i => (opcode & i.mask) === i.pattern
	);
	console.assert(inst !== undefined, "invalid opcode");
	const args = inst.args
		.map(a => (a.mask & opcode) >> a.shift);
	return { id: inst.id, args };
}