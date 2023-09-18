const DOT = 0.1;
const DASH = 3 * DOT;
const WAIT_NEXT_MARK = DOT / 2; 

const morse = {
    'e': [DOT],
    't': [DASH],
    'i': [DOT, DOT],
    'a': [DOT, DASH],
    'n': [DASH, DOT],
    'm': [DASH, DASH],
    's': [DOT, DOT, DOT],
    'u': [DOT, DOT, DASH],
    'r': [DOT, DASH, DOT],
    'w': [DOT, DASH, DASH],
    'd': [DASH, DOT, DOT],
    'k': [DASH, DOT, DASH],
    'g': [DASH, DASH, DOT],
    'o': [DASH, DASH, DASH],
    'h': [DOT, DOT, DOT, DOT],
    'v': [DOT, DOT, DOT, DASH],
    'f': [DOT, DOT, DASH, DOT],
    'l': [DOT, DASH, DOT, DOT],
    'p': [DOT, DASH, DASH, DOT],
    'j': [DOT, DASH, DASH, DASH],
    'b': [DASH, DOT, DOT, DOT],
    'x': [DASH, DOT, DOT, DASH],
    'c': [DASH, DOT, DASH, DOT],
    'y': [DASH, DOT, DASH, DASH],
    'z': [DASH, DASH, DOT, DOT],
    'q': [DASH, DASH, DOT, DASH],
}

const play = code => {
    const audioContext = new AudioContext();
    const gain = audioContext.createGain();
    const oscillator = new OscillatorNode(audioContext, {
        frequency: 800,
        type: "sine",
    });

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    for (let m = 0, k = audioContext.currentTime; m < morse[code].length; m++) {
        const duration = morse[code][m];
        gain.gain.setValueAtTime(1, k);
        gain.gain.setValueAtTime(0, k + duration);
        k += WAIT_NEXT_MARK + duration;
    }

    oscillator.start();

    return oscillator;
}

