const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia"; // <-- this is a STRING, which represents and manipulates a SEQUENCE of characters. If "magnolia" were wrapped in an array like ["magnolia"], then there weould only be ONE item instead of EIGHT!
let guessedLetters = []; //this empty array will contain all the letters that the player has guessed
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n"); //transforms fetched data into an array (split("\n") is a delimiter)
    const randomWord = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomWord].trim();
    placeholder(word);
    
    //console.log(wordArray);
};

getWord();


// Display our symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
    const placeholderLetters = []; // empty array that will populate with as many circles as there are letters in our word
    for (const letter of word) { // loops through each letter of the word (which is an array) until we end up with this: ["●", "●', "●", "●", "●", "●", "●", "●"] for "magnolia"
        //console.log(letter); // logs out each letter to the console (not sure why this is important, it just logs the letters in the console)
        placeholderLetters.push("●"); // adds each placeholder circle to the end of the empty array(placeholderLetters)
    }
    wordInProgress.innerText = placeholderLetters.join(""); // makes the word-in-progress class in the html doc show the circles... the .join("") removes the commas in between the circles
};


// Add Event Listener for the button
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = ""; //empty message paragraph
    const guess = letterInput.value; // captures the value of the 'letter' form 
    const goodGuess = validateInput(guess); //takes the 'guess' aka input and runs it through the validateInput function
    if (goodGuess) { //runs the makeGuess function if the validateInput function says that the player's input matches the criteria
        makeGuess(guess);
    }
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
const makeGuess = function (guess) { //accepts the guess(input) as parameter
    guess = guess.toUpperCase(); //convert all input letters to one case (uppercase!)
    if (guessedLetters.includes(guess)) { //check to see if your guessedLetters array already has that letter
        message.innerText = "You have already guessed that letter! Try again.";
    } else { //if user has not guessed the letter yet, it is added to the guessedLetters array! 
        guessedLetters.push(guess); //adds the guess to the array of guessedLetters
        console.log(guessedLetters);
        updateGuessesRemaining(guess);
        showGuessedLetters(); //runs the function when the letter has not yet been guessed 
        updateWordInProgress(guessedLetters); //
    }
    
};


//Create a Function to Show the Guessed Letters
const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = ""; //empties the ul element where the player's guessed letters with display
    for (const letter of guessedLetters) { // loops through each letter in the guessedLetters array --->
        const li = document.createElement("li"); //then creates a new list item --->
        li.innerText = letter; // then fills it in with each letter from the guessedLetters array --->
        guessedLettersElement.append(li); // then adds it to the unordered list!
    }
};


//Create a Function to Update the Word in Progress
const updateWordInProgress = function (guessedLetters) { //this function will replace the circle symbols with correct letters guessed
    const wordUpper = word.toUpperCase(); //changes word variable to uppercase
    const wordArray = wordUpper.split(""); //splits the word string into an array
    const revealWord = []; //empty array that will update with the correct guesses
    for (const letter of wordArray) { //for each letter in the wordArray(which is the word the player is trying to guess) -->
        if (guessedLetters.includes(letter)) { //if the guessedLetters array includes a letter from the wordArray(the special word!) --->
            revealWord.push(letter.toUpperCase()); //push said letter to the revealWord array (and make it uppercase!)
        } else {
            revealWord.push("●"); //otherwise, push the circle
        } 
    }
    wordInProgress.innerText = revealWord.join("");
    checkIfWon(); //runs the function to check if the user has won once all correct letters have been guessed
    //console.log(wordArray); 
};


//Create a Function to Count Guesses Remaining
const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1; // subtracts 1 from the value of the remainingGuesses variable and overwrites the remainingGuesses with the new result
    } else {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
    }
    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        remainingGuessesSpan.innerText = "no guesses";
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};


//Create a Function to Check If the Player Won
const checkIfWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) { //verifies that the player's word in progress is equal to the secret word
        message.classList.add("win"); //adds the .win class (located in style.css) to the message paragraph if the player's guessed letters equal the secret word
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`; //adds HTML if the condition is met
        
        startOver();
    }
    
};


//Create a Function to Hide & Show Elements
const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};


//Add a Click Event to the Play Again Button
playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersElement.innerHTML = "";
    remainingGuesses = 8;
    guessedLetters = [];
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessButton.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");
    getWord();
});