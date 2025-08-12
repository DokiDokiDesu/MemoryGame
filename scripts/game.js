import { cards } from "../cards.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


let cardsNew = [];
let selectedCards = [];
let buttons = [];
let matchedCards = [];
let remainingLives = 5;
const now = dayjs();
let timePassed = 0;

const backButton = document.querySelector('.back-button');
backButton.addEventListener('click',()=>{
  window.location.href = "index.html";
});

function startGame() {
  setBoard();
  setUp();
  displayRemainingLives();
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
    buttons.push(button);
  }
}
 function setUp() {
  let remainingSeconds = 10;
 let intervalId = setInterval(()=>{

    if(remainingSeconds === 0) {
    const images = document.querySelectorAll('.board button img');
    images.forEach(img => {
    img.src = "icons/back-card.png"; // Kartların arka yüzünü göster
    img.alt = "back";
    }); 
    playGame();
    displayTimePassed();
    clearInterval(intervalId);
    }

    document.querySelector('.countdown-start').innerHTML = `${remainingSeconds}`;
    remainingSeconds--;

  },1000);
 }


function playGame() {
  buttons.forEach((button)=>{
    button.addEventListener('click',()=>{

      if(matchedCards.includes(button)) {
        return;
      }
      selectedCards.push(button);

      const img = button.querySelector('img');
      img.src = cardsNew[parseInt(button.id.split('-')[1])].img;
      img.alt = `card-${button.dataset.cardId}`;

      isMatch();
    });
  });
}

function isMatch() {
  if (selectedCards.length < 2) return;

  const id1 = selectedCards[0].dataset.cardId;
  const id2 = selectedCards[1].dataset.cardId;

  if (id1 === id2) {
    
    matchedCards.push(selectedCards[0],selectedCards[1]);

    if(matchedCards.length === 20) {
      alert('game won');
      updateScoreRecord('win',matchedCards.length,timePassed,now.format('YYYY-MM-DD HH:mm'));
      window.location.href = 'index.html';
      return;
    }

    selectedCards = [];
  } 
  else if (id1 !== id2) {
    remainingLives--;
  
    if (remainingLives === 0) {
      alert('game lost');
      updateScoreRecord('lose',matchedCards.length,timePassed,now.format('YYYY-MM-DD HH:mm'));
      window.location.href = 'index.html';
      return;
    }
    
    displayRemainingLives();

    setTimeout(()=>{
      selectedCards.forEach(btn => {
        const img = btn.querySelector('img');
        img.src = "icons/back-card.png";
        img.alt = "back";
      });
      selectedCards = [];
    },1000);
  }
}
function displayTimePassed() {
  timePassed = 0;

  let intervalId = setInterval(()=>{
    timePassed++;
    const minute = Math.floor(timePassed / 60);
    const passedSeconds = timePassed % 60;
    document.querySelector('.countdown-start').innerHTML = `Time passed : ${String(minute).padStart(2, '0')}:${String(passedSeconds).padStart(2, '0')}`;
  },1000);
}

function displayRemainingLives() {
  document.querySelector('.remaining-lives').innerHTML = `remaining lives : ${remainingLives}`;
}

function updateScoreRecord(result,cardsMatched, compTime,date) {
 
  let newScoreEntry = {
    result : result,cardsMatched : cardsMatched, compTime : compTime, date : date
  }
  let scoreArray = JSON.parse(localStorage.getItem('scoreArray'));

  if(!scoreArray) {
    let scoreArray = [];
    scoreArray.push(newScoreEntry);
    localStorage.setItem('scoreArray',JSON.stringify(scoreArray));
    return;
  }
  scoreArray.push(newScoreEntry);
  localStorage.setItem('scoreArray',JSON.stringify(scoreArray));
}
startGame(); // index'e alınacak







