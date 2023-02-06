const poles = document.querySelectorAll(".pole");
const actives = new Array(poles.length);

poles.forEach((pole, index_row) => {
    const beads = pole.querySelectorAll(".bead");
    beads.forEach((bead, index_bead) => {
        bead.setAttribute("pole-num", poles.length - index_row - 1);
        bead.setAttribute("bead-num", beads.length - index_bead);
        bead.addEventListener("click", () => {
            bead_power = bead.getAttribute("pole-num");
            bead_value = bead.getAttribute("bead-num");
            if (actives[bead_power] == bead_value) {
                if (bead_value > 1) {
                    actives[bead_power] = actives[bead_power] - 1;
                } else {
                    actives[bead_power] = 0;
                }
            } else if (bead_value < actives[bead_power]) {
                actives[bead_power] = bead_value - 1;
            } else {
                actives[bead_power] = parseInt(bead_value);
            }
            addActives();
        });
    });
});

function addActives() {
    const beads = document.querySelectorAll(".bead");
    beads.forEach((bead) => {
        bead.classList.remove("active");
    });

    let total = 0;
    actives.forEach((value, pow10) => {
        total += Math.pow(10, pow10) * value;
        if (value > 0) {
            document
                .querySelector(`.bead[pole-num="${pow10}"][bead-num="${value}"]`)
                .classList.add("active");
        }
    });
    document.querySelector("#total").innerHTML = total.toLocaleString();
    // console.log(total);
}

