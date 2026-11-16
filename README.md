# Hangman Project

A browser-based Hangman game made with HTML, CSS, and JavaScript.

## How to run

Open `index.html` in a web browser. In VS Code, you can also right-click `index.html` and select **Open with Live Server** if the Live Server extension is installed.

## Features required for class

- **Winning/losing dialog:** `finishGame(won)` opens a dialog and also updates the message in the guesses area.
- **No guesses after finishing:** `gameFinished` is checked in `handleGuess()` and the input/button are disabled.
- **Clear input:** `input.value = ""` at the beginning of `handleGuess()`.
- **No guessing before choosing a word:** input and button start disabled; `handleGuess()` also checks for `!secretWord`.
- **No repeated guesses:** a JavaScript `Set` tracks guesses; `.has(letter)` catches duplicates before counting wrong guesses.

## Functions to explain in your video

1. `startGame()` chooses a random word, resets variables, enables guessing.
2. `renderGame()` creates the blanks, reveals correctly guessed letters, updates the guess list and body drawing.
3. `handleGuess(event)` validates the input, stops duplicate guesses, checks the secret word and tests for win/loss.
4. `finishGame(won)` ends the game, disables the guess controls, and displays a win/loss dialog.

## Video walkthrough outline

1. Show `index.html`, `style.css`, and `script.js` in VS Code.
2. Launch `index.html`; show that Guess is disabled before choosing a word.
3. Click **Choose a word / New game**. Show the blanks and the enabled input.
4. Type a letter, submit, and point out that the input clears automatically.
5. Submit the same letter again; show the duplicate warning and that it doesn't increase mistakes.
6. Explain the `Set`, `gameFinished` flag, and how `finishGame` opens the dialog.
7. To reliably demonstrate a win, temporarily replace the random word line in `startGame()` with `secretWord = "apple";`, start a game and guess A, P, L, E. Show the win dialog. Restore the original random-word line afterward.
8. To demonstrate a loss, temporarily use `secretWord = "apple";`, start a new game and guess B, C, D, F, G, H. Show the lose dialog and disabled inputs. Restore the random word line afterward.
9. Show the final code and mention how you tested each requirement. Upload the project to GitHub, then put your GitHub repository link in the assignment comments.

**Note:** Record your own screen and voice; the included outline is a guide, not a recording.
