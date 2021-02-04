import Home from "./home.js";
import End from "./end.js";
import Board from "./board.js";
import {sound} from '/hangman/js/data/sound.js';


const Game = (_ => {

    const letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    const words = ['apple', 'banana', 'orange', 'grapes', 'pineapple'];
    let chosenWord;
    let guessingWord;
    let lives;
    let guesses;

    // cache the DOM

    const $hangman = document.querySelector(".hangman");

    const init = _ => {
        // 1. choose a word
        chosenWord = chooseWord();
        // 2. build out guessing word to render
        guessingWord = Array(chosenWord.length).fill("-");
        guesses = [];
        lives = 7;
        // show initial screen
        showInitPage();
        listeners();
        Board.init();
    }

    const listeners = _ => {
        $hangman.addEventListener('click', e => {
            if(e.target.matches('.hangman__letter')) {
                sound.click.play();
                check(e.target.innerHTML);
            }
            if(e.target.matches('.hangman__trigger')) {
                sound.click.play();
                Home.init();
            }
        })
    }

    const isAlreadyTaken = letter => {
        return guesses.includes(letter);
    }

    const check = guess => {
        // if letter already guessed
        if(isAlreadyTaken(guess)) return;
        guesses.push(guess);

        // check if the guessed letter exists in chosenWord
        if (chosenWord.includes(guess)) {
            // update the guessingWord
            updateGuessingWord(guess);
        } else {
            lives--;
            // render board
            Board.setLives(lives);
        }
        render();
        // check if game is over
        isGameOver();
    }

    const hasWon = _ => guessingWord.join("") === chosenWord;

    const hasLost = _ => lives <= 0;

    const isGameOver = _ => {
        if(hasWon()) {
            End.setState({
                result: "win",
                chosenWord
            });
            sound.win.play();
        }

        if (hasLost()) {
            End.setState({
                result: "lose",
                chosenWord
            });
            sound.lose.play();
        }
    }

    const render = _ => {
        setValue(document.querySelector(".hangman__lives"), lives);
        setValue(document.querySelector(".hangman__word"), guessingWord.join(""));
        setValue(document.querySelector(".hangman__letters"), createLetters());
    }

    const updateGuessingWord = letter => {
        chosenWord.split("").forEach((elem, index) => {
            if(elem === letter) {
                guessingWord[index] = elem;
            }
        })
    }


    const setValue = (elem, value) => {
        elem.innerHTML = value;
    }

    const showInitPage = _ => {
        let markup = `<p class="hangman__stats">Lives:
        <span class="hangman__lives">${lives}</span>
        </p>
        <h1 class="hangman__title">Hangman</h1>
        <canvas class="hangman__board">
        </canvas>
        <div class="hangman__word">
        ${guessingWord.join("")}
        </div>
        <p class="hangman__instructions">Pick an alphabet below to guess the whole word.</p>
        <ul class="hangman__letters">
        ${createLetters()}
        </ul>
        <button class="button hangman__trigger">Main Menu</button>
        `
        setValue($hangman, markup);
    }

    const createLetters = _ => {
        let markup = '';
        letters.forEach(letter => {
            const isActive = isAlreadyTaken(letter) ? 'hangman__letter--active' : '';
            markup+=`
            <li class="hangman__letter ${isActive}">${letter}</li>
            `
        });
        return markup;
    }

    const chooseWord = _ => {
        let randNum = Math.floor(Math.random() * words.length);
        return words[randNum];
    }




    return {
        init
    }
})();

export default Game;