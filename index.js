let series; 

const check = {
    'e': false, 't': false, 'i': false, 'a': false, 'n': false, 'm': false,
    's': false, 'u': false, 'r': false, 'w': false, 'd': false, 'k': false,
    'g': false, 'o': false, 'h': false, 'v': false, 'f': false, 'l': false,
    'p': false, 'j': false, 'b': false, 'x': false, 'c': false, 'y': false,
    'z': false, 'q': false,
}

function* shuffle(check) {
    const selected = Object.entries(check)
        .filter(([c, s]) => s)
        .map(([c, s]) => c);

    while (true) {
        const index = Math.floor(Math.random() * selected.length);
        yield selected[index];
    }
}

const nodes = document.querySelectorAll(".node");

nodes.forEach(node => {
    node.addEventListener('change', e => {
        const code = e.target.value;
        check[code] = e.target.checked;
        series = shuffle(check);
    });
});
