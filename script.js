const container = document.querySelector(".container");
const searchInput = document.querySelector("input");
const synonyms = document.querySelector(".synonyms .list");
const infoText = document.querySelector(".info-text");
const removeicon = document.querySelector(".search span")

function data(result, word) {
    if (result.title) {
        infoText.innerHTML = `Meaning of <span>"${word}"</span> is not available, search another word`;
    }
    else {
        console.log(result)
        container.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0],
            phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}/`;

        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phonetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        document.querySelector(".example span").innerText = definitions.example;
        if (definitions.synonyms[0] == undefined) {
            synonyms.parentElement.style.display = "none";
        }
        else {
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";
            for (let i = 0; i < 5; i++) {
                let tag = `<span onclick = search('${definitions.synonyms[i]}')>${definitions.synonyms[i]},</span>`;
                synonyms.insertAdjacentHTML("beforeend", tag);
            }

        }

    }
}

function search(word){
    searchInput.value = word;
    fetchApi(word);
    container.classList.remove("active");
}
function fetchApi(word) {
    container.classList.remove("active");
    infoText.style.color = '#000';
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(res => res.json()).then(result => data(result, word));
}

searchInput.addEventListener("keyup", e => {
    if (e.key === "Enter" && e.target.value) {
        fetchApi(e.target.value);
    }
});

removeicon.addEventListener("click",()=>{
    searchInput.value = "";
    searchInput.focus();
    container.classList.remove("active");
    infoText.innerHTML = "Type a word and press enter to get meaning,example,pronunciation,and synonyms of that typed word."
})