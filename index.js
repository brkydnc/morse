document.getElementById("e").checked = true;

document.getElementById("train").addEventListener('click', e => {
    const trainer = new Trainer();

    document.querySelectorAll(".node").forEach(node => {
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
        } else if (code == trainer.code) {
            console.log("helal");
            trainer.next();
            trainer.playCurrentCode();
        }
    });

    document.getElementById("welcome").style.display = "none";
});

