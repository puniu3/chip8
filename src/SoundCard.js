export const soundcard = (() => {
	const VOLUME = 0.3;
	const atx = new (window.AudioContext || window.webkitAudioContext)();
	const gain = atx.createGain();
	const osc = atx.createOscillator();
	osc.connect(gain).connect(atx.destination);

	gain.gain.setValueAtTime(VOLUME, atx.currentTime);
	osc.type = "triangle";
	osc.frequency.value = 392;

	let playing = false;

	return {
		start: () => {
			if (playing) return;
			playing = true;
			osc.start(atx.currentTime)
		},
		stop: () => {
			if (!playing) return;
			playing = false;
			gain.gain.setValueAtTime(VOLUME, atx.currentTime);
			gain.gain.exponentialRampToValueAtTime(0.0000001, atx.currentTime + .02);
			osc.stop(atx.currentTime + .02);
		},
	}

})();
