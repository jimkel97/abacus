/*
Listens to the "click" event on elements with class "bead". The code initializes two variables:

- poles is an array of all elements with class "pole" in the HTML document.
- actives is an array with poles.length zeros.

For each element in poles, it selects all elements with class "bead" and sets two data attributes on each bead, data-pole-num and data-bead-num. It also sets a click event listener on each bead that updates the corresponding value in the actives array and calls the addActives function.

The addActives function removes the "active" class from all beads with class "bead active". Then, it updates the value of the element with id "total" by computing a number based on the actives array and adding the "active" class to the beads that are associated with the non-zero values in actives.
*/

// Select all elements with class "pole" and store them in the "poles" constant
const poles = document.querySelectorAll(".pole");

// Create an array of length equal to the number of "pole" elements, filled with 0's, and store it in the "actives" constant
const actives = Array(poles.length).fill(0);

// Loop through each "pole" element
poles.forEach((pole, poleIndex) => {
    // Select all elements with class "bead" inside the current "pole" element
    const beads = pole.querySelectorAll(".bead");

    // Loop through each "bead" element
    beads.forEach((bead, beadIndex) => {
        // Set the "data-pole-num" attribute of the current "bead" element to the inverted index of its parent "pole" element
        bead.setAttribute("data-pole-num", poles.length - poleIndex - 1);

        // Set the "data-bead-num" attribute of the current "bead" element to the inverted index of itself within the "beads" array
        bead.setAttribute("data-bead-num", beads.length - beadIndex);

        // Add a click event listener to the current "bead" element
        bead.addEventListener("click", () => {
            // Retrieve the values of the "data-pole-num" and "data-bead-num" attributes of the clicked "bead" element
            const polePos = +bead.getAttribute("data-pole-num");
            const beadPos = +bead.getAttribute("data-bead-num");

            // Update the value in the "actives" array at the position specified by "polePos"
            actives[polePos] = Math.min(beadPos, actives[polePos] === beadPos ? (beadPos > 1 ? beadPos - 1 : 0) : beadPos);

            // Call the "addActives" function
            addActives();
        });
    });
});

// Define the "addActives" function
function addActives() {
    // Remove the "active" class from all elements with class "bead" and class "active"
    document.querySelectorAll(".bead.active").forEach(bead => bead.classList.remove("active"));

    // Initialize a "total" variable
    let total = 0;

    // Loop through the "actives" array
    actives.forEach((value, pow10) => {
        // Update the "total" variable by adding 10 raised to the power of "pow10" multiplied by "value"
        total += 10 ** pow10 * value;

        // If the current "value" is greater than 0
        if (value > 0) {
            // Find the element with class "bead" and matching "data-pole-num" and "data-bead-num" attributes, and add the "active" class to it
            document
                .querySelector(`.bead[data-pole-num="${pow10}"][data-bead-num="${value}"]`)
                .classList.add("active");
        }
    });

    // Update the inner HTML of the element with ID "total" to the value of "
    document.querySelector("#total").innerHTML = total.toLocaleString();
}
