// method to replace string character based on its index
String.prototype.replaceAt = function (index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }

    return this.substring(0, index) + replacement + this.substring(index + 1);
}

/////////////////////////////////////////////////////////

// HOURGLASS CREATION

let hourglass = []
let n = 20

// function that creates the hourglass
function createHourglass(n) {

    // hourglass "template"
    for (let i = 0; i < (n - 2); i++) {
        hourglass.push(("#".repeat(n)))
    }

    // superior section
    for (let j = 0; j < ((n - 2) / 2); j++) {
        // individual line characters
        for (let k = 0; k < n / 2; k++) {
            if (
                k < j
            ) {
                hourglass[j] = hourglass[j].replaceAt(k + 1, " ")
                hourglass[j] = hourglass[j].replaceAt(n - k - 2, " ")
            }
        }
    }

    // inferior section
    for (let j = (n - 2) / 2; j < (n - 2); j++) {
        // individual line characters
        for (let k = 0; k < n / 2; k++) {
            // replace all the #s for empty spaces
            hourglass[j] = hourglass[j].replaceAt(k + 1, " ")
            hourglass[j] = hourglass[j].replaceAt(n - k - 2, " ")

            if ((j - k) % 2 == 0 && k + j == (n - 2)) {
                hourglass[j] = hourglass[j].replaceAt(k, "#")
                hourglass[j] = hourglass[j].replaceAt(n - k - 1, "#")
            }
        }
    }

    // adds the top and the bottom of the hourglass
    hourglass.push(("#".repeat(n)))
    hourglass.unshift(("#".repeat(n)))

    return hourglass
}
createHourglass(n)

console.log(hourglass.join('\r\n'), `\nn = ${n}`)

/////////////////////////////////////////////////

// HOURGLASS ANIMATION

let timeIndex = 1
//max timeIndex = n/2

// start / pause button element
const hourglassButtonAnimation = document.querySelector(".hourglass-animation-start")
hourglassButtonAnimation.addEventListener("click", startAnimation)

var timeoutID
// function that uses setInterval to call hourglassAnimation()
function startAnimation() {
    if (timeoutID) {
        clearInterval(timeoutID);
        // Clear out the ID value so we're ready to start again
        timeoutID = null;
    }
    else if(timeIndex>1){
        // this step allows the user to pause the animation
        timeoutID = setInterval(hourglassAnimation, 1000);
    }
    else {
        hourglassReset()
        timeoutID = setInterval(hourglassAnimation, 1000);
    }
}

// function that handles the hourglass animation
function hourglassAnimation() {
    [hourglass[timeIndex], hourglass[n - timeIndex - 1]] = [hourglass[n - timeIndex - 1], hourglass[timeIndex]]
    timeIndex += 1
    updateHTML()

    console.log(hourglass.join('\r\n'), `\nn = ${n}`)

    if (timeIndex == n / 2) {
        console.log("Time's out!")
        clearInterval(timeoutID);
        timeoutID = null;
        timeIndex = 1;
    }
}

// reset button
const hourglassButtonReset = document.querySelector(".hourglass-animation-reset")
hourglassButtonReset.addEventListener("click", hourglassReset)

function hourglassReset() {
    // resets the counter
    timeIndex = 1
    clearInterval(timeoutID);
    timeoutID = null;

    //resets the hourglass
    hourglass = []
    createHourglass(n)
    updateHTML()

    console.log(hourglass.join('\r\n'), `\nn = ${n}`)
}

///////////////////////////////////////////////////////

//HTML DISPLAY

// displaying the hourglass in the HTML body
const hourglassHTML = document.querySelector(".hourglass")
const hourglassHTML_nValue = document.querySelector(".hourglass-n")

function updateHTML() {
    hourglassHTML.textContent = hourglass.join('\r\n')
    hourglassHTML_nValue.textContent = `\nn = ${n}`
}
updateHTML()

// new value for n, provided by the user
const hourglassInput = document.querySelector(".hourglass-input")
// new hourglass button
const hourglassButton = document.querySelector(".hourglass-button")
hourglassButton.addEventListener("click", newHourglass)

// function that generates a hourglass with a new value of n
function newHourglass(e) {
    if(!parseInt(hourglassInput.value)){
        alert("Please enter a value")
    }
    else if ((parseInt(hourglassInput.value) < 20)) {
        alert("The value of n must be at least 20")
    }
    else if (parseInt(hourglassInput.value) % 2 == 0) {    
        n = parseInt(hourglassInput.value)       
        hourglassReset()
    }
    else if (parseInt(hourglassInput.value) % 2 != 0) {
        alert("The number must be even")
    }
}
