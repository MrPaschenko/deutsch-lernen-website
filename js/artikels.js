import { shuffle } from "./helpers.js";

let data = [];
let index = 0;
let score = 0;

const artikels = ["Das", "Die", "Der"];

const loadData = async () => {
  const response = await fetch("data/artikels.json");
  return await response.json();
};

const renderWord = () => {
  const wordDiv = document.getElementById("word");
  wordDiv.innerHTML = data[index].word;
};

const renderScore = () => {
	const scoreDiv = document.getElementById("score");
	scoreDiv.innerHTML = `${score}/${data.length}`;
}

const clearButtons = () => {
  const btnsDiv = document.getElementById("buttons");
  btnsDiv.innerHTML = "";
};

const createArtikelButtons = () => {
  clearButtons();
  const btnsDiv = document.getElementById("buttons");
  const rightArtikel = data[index].artikel;

  for (const artikel of artikels) {
    const button = document.createElement("button");
    button.innerHTML = artikel;

    button.onclick = () => {
      if (artikel === rightArtikel) {
				score += 1;
        alert("Все правильно, молодець!");
				renderScore();
				nextWord();
      } else {
        alert("На жаль, неправильний артикль. Спробуй ще!");
      }
    };

    btnsDiv.appendChild(button);
  }
};

const nextWord = () => {
  index++;

  if (index >= data.length) {
    alert("Всі слова завершено!");
    return;
  }

  renderWord();
  createArtikelButtons();
};

const restart = () => {
  index = 0;
	score = 0;
  shuffle(data);
  renderWord();
	renderScore();
  createArtikelButtons();
};

window.onload = async () => {
  data = await loadData();
  shuffle(data);

  renderWord();
	renderScore();
  createArtikelButtons();

  document.getElementById("next").onclick = nextWord;
  document.getElementById("restart").onclick = restart;
};
