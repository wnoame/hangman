import Home from "./home.js";
import {sound} from '/hangman/js/data/sound.js';

const How = (_ => {

    const $hangman = document.querySelector(".hangman");

    const init = _ => {
        render();
        listeners();
    }

    const listeners = _ => {
        document.querySelector(".hangman__trigger").addEventListener("click", _ => {
            Home.init();
            sound.click.play();
        })
    }


    const render = _ => {
        let markup = `
        <h1 class="hangman__title">Instructions</h1>
        <ul class="how">
        <li class="hangman__instructions">Enjoy the game</li>
        </ul>
        <button class="button hangman__trigger">Main Menu</button>
        `
        $hangman.innerHTML = markup;
    }

    return {
        init
    }
})();

export default How;