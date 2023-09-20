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
        });
    });

    document.addEventListener('keypress', e => {
        const code = e.key.toLowerCase()

        if (code == ' ') {
            trainer.playCurrentCode();
        } else {
            trainer.feed(code);

            const stats = trainer.stats();

            correctCounter.textContent = stats.correct;
            wrongCounter.textContent = stats.wrong;
            accuracyCounter.textContent = `${stats.accuracy.toFixed(2).toString()}%`;
        }
    });

    document.getElementById("welcome").style.display = "none";
});

