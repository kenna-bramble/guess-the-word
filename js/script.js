const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingGuesses = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia"; // <-- this is a STRING, which represents and manipulates a SEQUENCE of characters. If "magnolia" were wrapped in an array like ["magnolia"], then there weould only be ONE item instead of EIGHT!

// Display our symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
    const placeholderLetters = []; // empty array that will populate with as many circles as there are letters in our word
    for (const letter of word) { // loops through each letter of the word (which is an array) until we end up with this: ["●", "●', "●", "●", "●", "●", "●", "●"] for "magnolia"
        console.log(letter); // logs out each letter to the console (not sure why this is important, it just logs the letters in the console)
        placeholderLetters.push("●"); // adds each placeholder circle to the end of the empty array(placeholderLetters)
    }
wordInProgress.innerText = placeholderLetters.join(""); // makes the word-in-progress class in the html doc show the circles... the .join("") removes the commas in between the circles
};

placeholder(word); // runs the function


// Add Event Listener for the button
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = letter.value; // captures the value of the 'letter' form 
    console.log(guess); // logs out guess (input) entered into the letter form
    letter.value = ""; //empties out the letter form where you enter the letter so it disappears after you hit guess button
});