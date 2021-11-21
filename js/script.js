const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingGuesses = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia"; // <-- this is a STRING, which represents and manipulates a SEQUENCE of characters. If "magnolia" were wrapped in an array like ["magnolia"], then there weould only be ONE item instead of EIGHT!
const guessedLetters = []; //this empty array will contain all the letters that the player has guessed

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
    message.innerText = ""; //empty message paragraph
    const guess = letterInput.value; // captures the value of the 'letter' form 
    const goodGuess = validateInput(guess); //takes the 'guess' aka input and runs it through the validateInput function
    if (goodGuess) {
        makeGuess(guess);
    }
    //console.log(guess); // logs out guess (input) entered into the letter form
    letterInput.value = ""; //empties out the letter form where you enter the letter so it disappears after you hit guess button

});


// Create a Function to Check Player's input
const validateInput = function (input) { //this function's purpose is to validate the player's input
    const acceptedLetter = /[a-zA-Z]/; //<-- a REGULAR EXPRESSION that ensures the player inputs only a letter (and not a number for example)
    if (input.length === 0) { //is the input empty?
        message.innerText = "Please enter a letter."
    } else if (input.length > 1) { //Did user enter more than one letter?
        message.innerText = "Please enter a single letter."
    } else if (!input.match(acceptedLetter)) { //did user enter something other than a letter (e.g. symbol or number)?
        message.innerText = "Please enter a letter from A to Z."
    } else { // if it is not any of the above, then it is a letter and we can return the input!
        return input;
    }
};


//Create a Function to Capture Input
const makeGuess = function (guess) {
    guess = guess.toUppercase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You have already guessed that letter! Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
    
};