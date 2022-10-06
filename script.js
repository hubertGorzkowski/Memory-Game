document.onselectstart = function () {
  return false;
};
const elements = [...document.querySelectorAll("div")];
const result = document.querySelector("h1.pairs");
const rounds = document.querySelector("h1.rounds");
const images = [
  "photos/car.jpeg",
  "photos/car.jpeg",
  "photos/abstraction.jpg",
  "photos/abstraction.jpg",
  "photos/build.jpeg",
  "photos/build.jpeg",
  "photos/city.jpg",
  "photos/city.jpg",
  "photos/leaf.jpeg",
  "photos/leaf.jpeg",
  "photos/heaven.jpeg",
  "photos/heaven.jpeg",
  "photos/rose.jpeg",
  "photos/rose.jpeg",
  "photos/train.jpeg",
  "photos/train.jpeg",
  "photos/coffe.jpeg",
  "photos/coffe.jpeg",
  "photos/cosmos.jpg",
  "photos/cosmos.jpg",
];
//zmienna przechowuje informacje o ilości odkrytych kart
let visibleItems = 0;
//tablica z elementami które mają klase Show
let elementsShowClass = [];
let score = 0;
let round = 0;
//tablica w której zapisywane są losowo liczby od 0-19, wykorzystywana do rozmieszczania obrazków
let randomNumbers = [];

//funkcja która losuje 20 losowych liczb do tablicy randomNumbers
const randomOrder = function () {
  if (randomNumbers.length === 20) return;

  const index = Math.floor(Math.random() * 20);

  for (let i = 0; i < randomNumbers.length; i++) {
    if (index === randomNumbers[i]) {
      return randomOrder();
    }
  }

  randomNumbers.push(index);
  if (randomNumbers.length < 20) return randomOrder();
};

//funkcja ktora rozmieszcza losowo zdjecia do divów
const addPhotoToDiv = function () {
  const imagesOrder = [];
  for (let i = 0; i < randomNumbers.length; i++) {
    elements[i].style.backgroundImage = `url(${images[randomNumbers[i]]})`;
    elements[i].textContent = `url(${images[randomNumbers[i]]})`;
    imagesOrder.push(`url(${images[randomNumbers[i]]})`);
    elements[i].style.backgroundImage = `url(/photos/question-mark.jpg)`;
  }
};

//funkcja ktora sprawdza czy uzytkownik odkrył dwa te same elementy i je usuwa lub zasłania
const handleElements = function () {
  if (elementsShowClass[0].textContent === elementsShowClass[1].textContent) {
    elementsShowClass.forEach((element) => {
      element.classList.add("delete");
    });
    score++;
    result.textContent = `Pary: ${score}`;
    checkGameEnd();
  }

  elements.forEach((element) => {
    element.style.backgroundImage = `url(/photos/question-mark.jpg)`;
    element.classList.remove("show");
    visibleItems = 0;
    elementsShowClass = [];
  });
  round++;
  rounds.textContent = `Ruch: ${round}`;
};

//funckja ktora odkrywa elementy
const ShowElements = function () {
  if (visibleItems === 1) {
    if (elementsShowClass[0].classList == this.classList) {
      return;
    }
  }
  if (visibleItems <= 1) {
    this.style.backgroundImage = `${this.textContent}`;
    this.classList.add("show");
    elementsShowClass.push(this);
    const checkClass = this.classList;
    visibleItems++;
    if (visibleItems === 2) {
      window.setTimeout(handleElements, 800);
    }
  }
};

//funkcja resetuje grę do początkowych ustawień, mozna zagrac ponownie
const reset = function () {
  window.location.reload();
};

//funckja ktora sprawdza czy gra zostala zakonczona
const checkGameEnd = function () {
  if (score === 10) {
    const p = document.createElement("p");
    p.classList.add("winGame");
    p.innerText = `Brawo! Wygrałeś w ${round + 1} ruchach!`;
    document.body.appendChild(p);
    const btn = document.createElement("button");
    btn.classList.add("playAgain");
    document.body.appendChild(btn);
    btn.textContent = "Zagraj ponownie!";
    btn.addEventListener("click", reset);
  }
};

randomOrder();
addPhotoToDiv();

elements.forEach((element) => element.addEventListener("click", ShowElements));
