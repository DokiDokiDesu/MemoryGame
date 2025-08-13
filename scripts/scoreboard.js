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

  const resultColor = score.result === "win" ? "green" : "red";

  entry.innerHTML = `
    <div class="result-div">
      <p>result</p>
      <p style="color:${resultColor}; font-weight:bold;">${score.result}</p>
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
  const passedMins = Math.floor(seconds / 60);
  const passedSeconds = Math.floor(seconds % 60);
  return `${passedMins} mins ${passedSeconds} seconds`;
}