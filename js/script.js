const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = ""; // word being guessed
let guessedLetters = []; 
let remainingGuesses = 8;

// Async function to to fetch data file that contains words to be guessed
const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomWord = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomWord].trim(); // prevents empty characters
    placeholder(word);
};
getWord();


// Display symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
    const placeholderLetters = []; 
    for (const letter of word) { 
        console.log(letter); 
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join(""); // .join("") removes the commas in between the circles
};


// Add event listener for the button
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = ""; 
    const guess = letterInput.value; 
    const goodGuess = validateInput(guess); 
    if (goodGuess) { 
        makeGuess(guess);
    }
    letterInput.value = ""; // clears guessed letter
});


// Check player's input
const validateInput = function (input) { 
    const acceptedLetter = /[a-zA-Z]/; // Ensures the player inputs a letter
    if (input.length === 0) { // Is the input empty?
        message.innerText = "Please enter a letter."
    } else if (input.length > 1) { // Did player enter more than one letter?
        message.innerText = "Please enter a single letter."
    } else if (!input.match(acceptedLetter)) { // Did player enter something other than a letter (e.g. symbol or number)?
        message.innerText = "Please enter a letter from A to Z."
    } else {
        return input;
    }
};


// Capture player's input 
const makeGuess = function (guess) { 
    guess = guess.toUpperCase(); 
    if (guessedLetters.includes(guess)) { 
        message.innerText = "You have already guessed that letter! Try again.";
    } else { 
        guessedLetters.push(guess); // Adds the guess to the array of guessedLetters
        updateGuessesRemaining(guess);
        showGuessedLetters(); // Runs the function when the letter has not yet been guessed 
        updateWordInProgress(guessedLetters); 
    }
    
};


// Display the guessed letters
const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) { 
        const li = document.createElement("li"); 
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};


// Replace the circle symbols with correct letters guessed
const updateWordInProgress = function (guessedLetters) {  
    const wordUpper = word.toUpperCase(); 
    const wordArray = wordUpper.split(""); 
    const revealWord = [];
    for (const letter of wordArray) { 
        if (guessedLetters.includes(letter)) { 
            revealWord.push(letter.toUpperCase()); 
        } else {
            revealWord.push("●"); 
        } 
    }
    wordInProgress.innerText = revealWord.join("");
    checkIfWon();
};


// Count guesses remaining
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


// Check if player won
const checkIfWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) { 
        message.classList.add("win"); 
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;         
        startOver();
    }
    
};


// Hide & show elements
const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};


// Click event for the Play Again Button
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