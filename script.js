const panel = document.getElementById("panel");
let score = 0;
let level = 1;

function updateLevel() {
  level = Math.floor(score / 20) + 1;
}

function getPanelDisplayTime() {
  return Math.max(1000, 3000 - (level - 1) * 1000);
}

function showPanel() {
  const displayTime = getPanelDisplayTime();
  const maxX = window.innerWidth - 100;
  const maxY = window.innerHeight - 100;
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  panel.style.left = `${randomX}px`;
  panel.style.top = `${randomY}px`;
  panel.style.display = "block";

setTimeout(() => {
  try {
    panel.style.display = "none";
  } catch (e) {
    console.error("非同期処理中のエラー:", e);
  }
}, displayTime);


function updateUI() {
  document.getElementById("score").textContent = score;
  document.getElementById("level").textContent = level;
}

function showLevelUpMessage() {
  const message = document.getElementById("level-up-message");
  message.classList.add("show");
  setTimeout(() => message.classList.remove("show"), 1500);
}

function updateScore() {
  score++;
  const previousLevel = level;
  updateLevel();
  updateUI();
  if (level > previousLevel) showLevelUpMessage();
}

panel.addEventListener("click", () => {
  updateScore();
  showPanel();
});

document.getElementById("startBtn").addEventListener("click", showPanel);

// スクリプト末尾に追加
updateUI();
