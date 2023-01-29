
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const input = document.getElementById("word-input");
const form = document.querySelector("form");
const result = document.querySelector(".result")
const containerWords = document.querySelector(".result-word");
const soundButton = document.querySelector(".result-sound");
const resultList = document.querySelector(".result-list");
const icon = document.getElementById('icon');
const resList = document.querySelector('.result-list');
const resDesc = document.querySelector('.result-desc');
const example = document.querySelector('.example');
const formBtn = document.getElementById('search');
const example2 = document.querySelector('.example2');
const resExample = document.querySelector('.result-example')
const resExample2 = document.querySelector('.result-example2')



let state = {
    word: '',
    meanings: [],
    phonetics: []
};
const submitSount = () => {
    if (state.phonetics.length) {
        const sound = state.phonetics[0];
        console.log(sound);

        if (sound.audio) {
            new Audio(sound.audio).play();
        }
    }
}
const insertWord = () => {

    containerWords.innerText = state.word;
    resList.innerText = state.phonetics[0].text;
    resDesc.innerText = state.meanings[0].definitions[0].definition;
    example.innerText = state.meanings[0].definitions[0].example;
    resExample.innerText = state.meanings[0].definitions[1].definition
    example2.innerText = state.meanings[0].definitions[1].example;
    resExample2.innerText = state.meanings[0].definitions[2].definition

}

const submitForm = async (e) => {
    e.preventDefault();
    if (!state.word.trim()) return;
    try {
        const response = await fetch(`${url}${state.word}`);
        const data = await response.json();
        if (response.ok && data.length) {
            const item = data[0];
            console.log(item);
            state = {
                ...state,
                meanings: item.meanings,
                phonetics: item.phonetics,
            }
            insertWord();
            // listen();
        }
    } catch (err) {
        console.log(err);
    };
    input.value = '';
};
icon.addEventListener('click', (e)=> {
    if(input.value.length){
        input.value = ''
    }
    console.log(e);
})

const KeyUp = (e) => {
    const value = e.target.value;
    state.word = value;
    console.log(state.word);
}

    input.addEventListener('keyup', KeyUp),
    form.addEventListener("submit", submitForm);
    soundButton.addEventListener('click', submitSount);
    
