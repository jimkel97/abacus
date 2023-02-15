const rods = document.querySelectorAll(".rod");
const actives = new Array(rods.length);

const allbeads = document.getElementsByClassName("bead");
for (let i=0; i<allbeads.length; i++) {
    allbeads[i].setAttribute("tabindex", "0");
}

rods.forEach((rod, index_row) => {
    const beads = rod.querySelectorAll(".bead");
    beads.forEach((bead, index_bead) => {
        bead.setAttribute("data-pow10", rods.length - index_row - 1);
        bead.setAttribute("data-value", beads.length - index_bead);

        ['click', 'keypress'].forEach(evt => bead.addEventListener(evt, () => {
            bead_power = bead.getAttribute("data-pow10");
            bead_value = bead.getAttribute("data-value");
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
            play();
        }));
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
                .querySelector(`.bead[data-pow10="${pow10}"][data-value="${value}"]`)
                .classList.add("active");
        }
    });
    document.querySelector("#total").innerHTML = total.toLocaleString();
    // console.log(total);
}


// Play click sound every time a bead is moved
function play() {
    var audio = document.getElementById("audio");
    audio.play();
}
