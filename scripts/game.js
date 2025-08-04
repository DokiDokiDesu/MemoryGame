import { cards } from "../cards.js";

let cardsNew = [];

function startGame() {
  setBoard();
  setUp();
}

function setBoard() {
 cards.forEach(card => {
  cardsNew.push({ ...card });
  cardsNew.push({ ...card });
  });
  cardsNew = cardsNew.sort(() => Math.random() - 0.5);

  const board = document.querySelector('.board');
  board.innerHTML = ""; 
  

  for(let i = 0; i < cardsNew.length;i++) {
    const button = document.createElement('button');
    button.id = `card-${i}`;
    // button'a istersen data attribute ile kart id'sini de ekleyebilirsin:
    button.dataset.cardId = cardsNew[i].id;

     const img = document.createElement('img');
      img.src = cardsNew[i].img;
      img.alt = `card-${cardsNew[i].id}`;
      button.appendChild(img);

    board.appendChild(button);

  }
}
startGame();

function setUp() {
   setTimeout(() => {
    // Tüm kart resimlerini seç
    const images = document.querySelectorAll('.board button img');
    images.forEach(img => {
      img.src = "icons/back-card.png"; // Kartların arka yüzünü göster
      img.alt = "back";
    }); playGame();
  }, 5000);
}

function playGame() {

}







