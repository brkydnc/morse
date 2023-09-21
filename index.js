const correctCounter = document.getElementById("correct");
const wrongCounter = document.getElementById("wrong");
const accuracyCounter = document.getElementById("accuracy");

document.getElementById("e").checked = true;

document.getElementById("train").addEventListener('click', e => {
    const trainer = new Trainer();

    document.querySelectorAll(".checkbox").forEach(node => {
        node.addEventListener('click', e => {
            const check = e.target.checked;
            const willUncheckAll = trainer.map.selected.length == 1 && !check;
            const isKeyboardClick = e.detail === 0 && !e.pointerType;

            if (willUncheckAll || isKeyboardClick)
                return e.preventDefault();

            const code = e.target.value.toLowerCase();
            trainer.map.set(code, check);
            trainer.randomize();
        });
    });

    document.addEventListener('keypress', e => {
        const code = e.key.toLowerCase()

        if (code == ' ') {
            trainer.play();
        } else {
            trainer.feed(code);

            const stats = trainer.stats();

            correctCounter.textContent = `correct: ${stats.correct}`;
            wrongCounter.textContent = `wrong: ${stats.wrong}`;
            accuracyCounter.textContent = `accuracy: ${stats.accuracy.toFixed(2).toString()}%`;
        }
    });

    document.getElementById("welcome").style.display = "none";
});

const howToPlayInfo = document.getElementById("how-to-play");
document.getElementById("how-to-play-checkbox").addEventListener('click', e => {
    howToPlayInfo.style.visibility = (e.target.checked) ? 'visible' : 'hidden';
    console.log('hi');
});
