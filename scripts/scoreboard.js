const backButton = document.querySelector('.back-button');
const resetButton = document.querySelector('.reset-button');

let scoreArray = JSON.parse(localStorage.getItem('scoreArray')) || [];

backButton.addEventListener('click',()=>{
  window.location.href = "index.html";
});

resetButton.addEventListener('click',()=>{
  if (confirm("Tüm skorları silmek istediğinize emin misiniz?")) {
    localStorage.clear();
    location.reload(); // Sayfayı yenile, skorlar temizlensin
  }
});

const scoreScreen = document.querySelector('.score-screen');
scoreScreen.innerHTML = '';

if(scoreArray.length === 0) {
  scoreScreen.innerHTML = "<p>Kayıt bulunamadı</p>";
} else {
  scoreArray.reverse().forEach(score => {
      const entry = document.createElement('div');
  entry.className = "score-entry";
  entry.innerHTML = `
     <div class="result-div">
            <p>result</p>
            <p>${score.result}</p>
          </div>

          <div class="cards-matched-div">
            <p>cards matched</p>
            <p>${score.cardsMatched}</p>
          </div>
          
          <div class="comp-time-div">
            <p>compilation time</p>
            <p>${calculateTimeResult(score.compTime)}</p>
          </div>

          <div class="date-div">
            <p>date</p>
            <p>${score.date}</p>
          </div>
  `;
    scoreScreen.appendChild(entry);
  });
}
function calculateTimeResult(seconds) {
  let passedMins;
  let passedSeconds;

  passedMins = seconds / 60;
  passedSeconds = seconds % 60;

  if(passedMins < 1) {
    passedMins = 0;
  }

  return `${passedMins} mins ${passedSeconds} seconds`;
}