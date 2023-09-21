const DOT = 0.1
const DASH = 3 * DOT;
const SPACE_BETWEEN_PARTS = DOT;
const SPACE_BETWEEN_LETTERS = 3 * DOT;

const BREAKDOWN = {
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

class Player {
    constructor() {
        // Initialize WebAudio elements.
        this.context = new AudioContext();
        this.gain = new GainNode(this.context, { gain: 0, });
        this.oscillator = new OscillatorNode(this.context, {
            frequency: 800,
            type: "sine",
        });

        // Make the connections, Oscillator -> Gain -> Destination 
        this.oscillator.connect(this.gain);
        this.gain.connect(this.context.destination);

        // Start the oscillator.
        this.oscillator.start();

        // After when, the player can play a new code.
        this.availableAfter = this.context.currentTime;
    }

    // Play the audio of a morse code.
    play(code) {
        const t = this.context.currentTime;

        if (t <= this.availableAfter) return;

        // Cancel future values so that the only playing code is the current one.
        this.gain.gain.cancelScheduledValues(t);

        // Create morse audio.
        let k = t;
        for (let i = 0, k = t; i < BREAKDOWN[code].length; i++) {
            const duration = BREAKDOWN[code][i];
            this.gain.gain.setValueAtTime(1, k);
            this.gain.gain.setValueAtTime(0, k + duration);
            k += SPACE_BETWEEN_PARTS + duration;
        }

        this.availableAfter = k + SPACE_BETWEEN_LETTERS - SPACE_BETWEEN_PARTS;
    }

    volume(value) {
        this.gain.gain.value = value;
    }
}

class ToggleMap {
    constructor() {
        // The list of selected codes.
        this.selected = [];

        // The code toggle map.
        this.map = {
            'e': false, 't': false, 'i': false, 'a': false, 'n': false,
            'm': false, 's': false, 'u': false, 'r': false, 'w': false,
            'd': false, 'k': false, 'g': false, 'o': false, 'h': false,
            'v': false, 'f': false, 'l': false, 'p': false, 'j': false,
            'b': false, 'x': false, 'c': false, 'y': false, 'z': false,
            'q': false,
        }
    }

    // Select or unselect a morse code.
    set(code, value) {
        this.map[code] = value;
        this.selected = Object.entries(this.map)
            .filter(([_, selected]) => selected)
            .map(([code, _]) => code);
    }
}

class Trainer {
    constructor() {
        this.code = 'e';
        this.correct = 0;
        this.wrong = 0;

        this.player = new Player();
        this.map = new ToggleMap();

        this.map.set('e', true);
    }

    play() {
        this.player.play(this.code);
    }

    randomize() {
        const index = Math.floor(Math.random() * this.map.selected.length);
        this.code = this.map.selected[index];
    }

    feed(code) {
        if (code == this.code) {
            this.correct++;
            this.randomize();
            this.play();
        } else {
            this.wrong++;
        }
    }

    stats() {
        return {
            correct: this.correct,
            wrong: this.wrong,
            accuracy: 100 * this.correct / (this.correct + this.wrong),
        }
    }
}
