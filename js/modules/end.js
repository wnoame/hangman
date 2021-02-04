const End = ( _ => {
    // data

    const state = {
        result: null,
        chosenWord: null
    }

    const setState = obj => {
        state.result = obj.result;
        state.chosenWord = obj.chosenWord;
        render();
    }

    const $hangman = document.querySelector(".hangman");


    const render = _ => {
        let markup = '';

        markup += `
        <h1 class="hangman__title">GAME OVER</h1>
        <p class="result">You ${state.result.toUpperCase()}! <br>
        The word is ${state.chosenWord.toUpperCase()}.</p>
        <button class="button hangman__trigger">Main Menu</button>
        `
        $hangman.innerHTML = markup;
    }

    return {
        setState
    }

})();

export default End;



