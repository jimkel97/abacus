/*This code is for a bead game. It sets up an HTML page to control the behavior of a bead game by adding a number of event listeners to each bead element on the page.

The code first selects all elements with the class "pole" and creates an array "actives" with the length of the number of poles. Then, it iterates over each pole, selecting all elements with the class "bead". For each bead, it sets two attributes: "pole-num" and "bead-num" using the index of the pole and bead in their respective arrays.

A click event listener is then added to each bead element. When a bead is clicked, its "pole-num" and "bead-num" attributes are used to update the "actives" array. The "actives" array stores the values of the active beads.

The "addActives" function is then called to update the display of the game based on the values in the "actives" array. This function first removes the "active" class from all bead elements, then calculates the total by adding up the values in the "actives" array. For each active bead, the function finds the bead with the corresponding "pole-num" and "bead-num" attributes and adds the "active" class to it. Finally, the function updates the innerHTML of the element with an id of "total" with the calculated total value.*/

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

