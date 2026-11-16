// Hangman: choose a word, reveal correct letters, and draw one body part per mistake.
const WORDS = ["apple", "banana", "planet", "school", "computer", "garden", "pencil", "sunshine"];
const MAX_WRONG_GUESSES = 6;

const startButton = document.getElementById("start-button");
const form = document.getElementById("guess-form");
const input = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const wordDisplay = document.getElementById("word-display");
const guessedLettersDisplay = document.getElementById("guessed-letters");
const wrongCountDisplay = document.getElementById("wrong-count");
const message = document.getElementById("message");
const bodyParts = document.querySelectorAll("[data-part]");
const resultDialog = document.getElementById("result-dialog");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");

let secretWord = "";
let guessedLetters = new Set();
let wrongGuesses = 0;
let gameFinished = false;

function startGame() {
  secretWord = WORDS[Math.floor(Math.random() * WORDS.length)];
  guessedLetters = new Set();
  wrongGuesses = 0;
  gameFinished = false;
  input.disabled = false;
  guessButton.disabled = false;
  input.value = "";
  message.textContent = "Game started! Enter your first letter.";
  if (resultDialog.open) resultDialog.close();
  renderGame();
  input.focus();
}

function renderGame() {
  // Show each guessed letter; use an underscore for an unguessed letter.
  wordDisplay.textContent = [...secretWord]
    .map(letter => guessedLetters.has(letter) ? letter.toUpperCase() : "_")
    .join(" ");
  guessedLettersDisplay.textContent = guessedLetters.size
    ? [...guessedLetters].map(letter => letter.toUpperCase()).join(", ")
    : "None";
  wrongCountDisplay.textContent = wrongGuesses;
  bodyParts.forEach((part, index) => {
    part.classList.toggle("visible", index < wrongGuesses);
  });
}

function finishGame(won) {
  gameFinished = true;
  input.disabled = true;
  guessButton.disabled = true;
  resultTitle.textContent = won ? "You won! 🎉" : "You lost!";
  resultMessage.textContent = won
    ? `Great job! You guessed ${secretWord.toUpperCase()}.`
    : `The word was ${secretWord.toUpperCase()}. Try again!`;
  message.textContent = won ? "You won! The game is finished." : "You lost! The game is finished.";
  resultDialog.showModal();
}

function handleGuess(event) {
  event.preventDefault(); // Stop the form from reloading the page.
  const letter = input.value.trim().toLowerCase();
  input.value = ""; // Clear input after every attempted guess.

  if (!secretWord) {
    message.textContent = "Choose a word before guessing!";
    return;
  }
  if (gameFinished) {
    message.textContent = "This game is finished. Start a new game!";
    return;
  }
  if (!/^[a-z]$/.test(letter)) {
    message.textContent = "Please enter exactly one letter from A to Z.";
    return;
  }
  if (guessedLetters.has(letter)) {
    message.textContent = `You already guessed ${letter.toUpperCase()}. Try another letter!`;
    return;
  }

  guessedLetters.add(letter);
  if (secretWord.includes(letter)) {
    message.textContent = `Correct! ${letter.toUpperCase()} is in the word.`;
  } else {
    wrongGuesses += 1;
    message.textContent = `Sorry, ${letter.toUpperCase()} is not in the word.`;
  }
  renderGame();

  const won = [...secretWord].every(character => guessedLetters.has(character));
  if (won) finishGame(true);
  else if (wrongGuesses >= MAX_WRONG_GUESSES) finishGame(false);
  else input.focus();
}

startButton.addEventListener("click", startGame);
form.addEventListener("submit", handleGuess);
document.getElementById("dialog-new-game").addEventListener("click", startGame);
document.getElementById("dialog-close").addEventListener("click", () => resultDialog.close());
