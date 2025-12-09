import { shuffle } from "./helpers.js";

let data = null;
let index = 0;

const loadData = async () => {
  const response = await fetch("data/flashcards.json");
  return await response.json();
};

const displayWord = () => {
  const currentWord = data[index];

  const cardFront = document.getElementById("card-front");
  const cardBackAnswer = document.getElementById("card-back-answer");
  const cardBackExample = document.getElementById("card-back-example");
  const card = document.getElementById("card");

  if (currentWord) {
    cardFront.innerHTML = `<h3>${currentWord.translation}</h3>`;
    cardBackAnswer.textContent = currentWord.answer;
    cardBackExample.textContent = `Example: ${currentWord.example}`;
  }
  
  card.classList.remove('is-flipped');
};

const restart = () => {
  index = 0;
  shuffle(data);
  displayWord();
};

const nextWord = () => {
  index++;

  if (index >= data.length) {
    alert("Всі слова завершено! Натисніть 'Restart' щоб почати знову.");
    index = data.length - 1;
    return;
  }
  
  displayWord();
};

window.onload = async () => {
  data = await loadData();
  
  if (!data || data.length === 0) {
		console.error("Failed to load data or data is empty.");
		return;
  }
  
  shuffle(data);
  displayWord();

  const card = document.getElementById("card");
  card.onclick = () => card.classList.toggle('is-flipped');
  
  document.getElementById("next").onclick = nextWord;
  document.getElementById("restart").onclick = restart;
}