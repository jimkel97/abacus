const rods = document.querySelectorAll(".rod");
const actives = new Array(rods.length);

const allbeads = document.getElementsByClassName("bead");

for (let i = 0; i < allbeads.length; i++) {
    allbeads[i].setAttribute("tabindex", "0");
}

// Loop through each "rod" element
rods.forEach((rod, index_row) => {
    // Get all the "bead" elements inside the current "rod"
    const beads = rod.querySelectorAll(".bead");
    // Loop through each "bead" element
    beads.forEach((bead, index_bead) => {
        // Set the "data-pow10" attribute of the current "bead"
        // It represents the power of 10 for the current digit
        // It is determined by the number of "rods" minus the index of the current "rod"
        bead.setAttribute("data-pow10", rods.length - index_row - 1);
        // Set the "data-value" attribute of the current "bead"
        // It represents the value of the current digit
        // It is determined by the number of "beads" in the current "rod" minus the index of the current "bead"
        bead.setAttribute("data-value", beads.length - index_bead);

        // Add event listeners for "click" and "keypress" events on the current "bead"
        ['click', 'keypress'].forEach(evt => bead.addEventListener(evt, () => {
            // Retrieve the "data-pow10" and "data-value" attributes of the current "bead"
            bead_power = bead.getAttribute("data-pow10");
            bead_value = bead.getAttribute("data-value");
            // Check if the value of the current "bead" matches the value in the "actives" array for the current digit
            if (actives[bead_power] == bead_value) {
                // If it does, decrement the value in the "actives" array if it is greater than 1, otherwise set it to 0
                if (bead_value > 1) {
                    actives[bead_power] = actives[bead_power] - 1;
                } else {
                    actives[bead_power] = 0;
                }
                // If the value of the current "bead" is less than the value in the "actives" array for the current digit
            } else if (bead_value < actives[bead_power]) {
                // Set the value in the "actives" array to the value of the current "bead" minus 1
                actives[bead_power] = bead_value - 1;
                // Otherwise, set the value in the "actives" array to the integer value of the "data-value" attribute
            } else {
                actives[bead_power] = parseInt(bead_value);
            }
            // Call the "addActives" function to update the user interface with the new values in the "actives" array
            addActives();
            // Call the "play" function to play a sound or perform some other action
            play();
        }));
    });
});


// Define a function called addActives
function addActives() {
    // Get all elements with the class "bead" and remove the "active" class from each of them
    const beads = document.querySelectorAll(".bead");
    beads.forEach((bead) => {
        bead.classList.remove("active");
    });

    // Initialize a variable called "total" to zero
    let total = 0;
    // Loop through each element of the "actives" array with the value and index being assigned to "value" and "pow10", respectively
    actives.forEach((value, pow10) => {
        // Calculate the decimal value of the beads represented by the current "value" and "pow10" combination and add it to the "total"
        total += Math.pow(10, pow10) * value;
        // If the value of the current "value" is greater than zero, add the "active" class to the corresponding bead
        if (value > 0) {
            document
                .querySelector(`.bead[data-pow10="${pow10}"][data-value="${value}"]`)
                .classList.add("active");
        }
    });
    // Update the HTML content of the element with the ID "total" to show the "total" value with a localized string representation
    document.querySelector("#total").innerHTML = total.toLocaleString();
    // Log the "total" value to the console (commented out)
    // console.log(total);
}



// Play click sound every time a bead is moved
// This function plays an audio element with an id of "audio"
function play() {
    // Get the audio element by its id
    var audio = document.getElementById("audio");
    // Play the audio element
    audio.play();
}

