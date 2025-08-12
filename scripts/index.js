 const startButton = document.querySelector('.start-button');
 const scoreboardButton = document.querySelector('.scoreboard-button');
 const settingsButton = document.querySelector('.settings-button');

 startButton.addEventListener('click',()=>{
  window.location.href = "game.html";
 });

 scoreboardButton.addEventListener('click',()=>{
  window.location.href = "scoreboard.html";
 });

 settingsButton.addEventListener('click',()=>{
  window.location.href = "settings.html";
 });

