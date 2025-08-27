// 定数
const TOTAL_ROUNDS = 20;
const MIN_DELAY = 800;
const MAX_DELAY = 2000;

// DOM要素
const gridEl = document.getElementById('grid');
const startBtn = document.getElementById('startBtn');
const roundEl = document.getElementById('round');
const scoreEl = document.getElementById('score');
const avgTimeEl = document.getElementById('avgTime');

// ゲーム状態
let round = 0;
let score = 0;
let times = [];
let targetIndex = null;
let startTime = 0;

// セルを生成（25個）
for (let i = 0; i < 25; i++) {
  const div = document.createElement('div');
  div.classList.add('cell');
  div.dataset.index = i;
  gridEl.appendChild(div);
}

// セルクリックイベント
gridEl.addEventListener('click', e => {
  if (!e.target.classList.contains('cell') || targetIndex === null) return;
  const idx = Number(e.target.dataset.index);
  if (idx === targetIndex) {
    const reaction = Date.now() - startTime;
    times.push(reaction);
    score++;
    updateInfo();
    clearActive();
    nextRound();
  }
});

// スタートボタン
startBtn.addEventListener('click', () => {
  resetGame();
  nextRound();
});

// 次のラウンドへ
function nextRound() {
  if (round >= TOTAL_ROUNDS) {
    showResult();
    return;
  }
  round++;
  updateInfo();
  const delay = Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY;
  setTimeout(() => {
    targetIndex = Math.floor(Math.random() * 25); // ← 25個対応
    const cell = gridEl.querySelector(`.cell[data-index="${targetIndex}"]`);
    cell.classList.add('active');
    startTime = Date.now();
  }, delay);
}

// 情報更新
function updateInfo() {
  roundEl.textContent = round;
  scoreEl.textContent = score;
  const avg = times.length
    ? Math.round(times.reduce((a, b) => a + b) / times.length)
    : 0;
  avgTimeEl.textContent = avg;
}

// アクティブ解除
function clearActive() {
  const prev = gridEl.querySelector('.active');
  if (prev) prev.classList.remove('active');
  targetIndex = null;
}

// リセット
function resetGame() {
  round = 0;
  score = 0;
  times = [];
  clearActive();
  updateInfo();
}

// 結果表示
function showResult() {
  alert("終了！\nスコア: " + score + "\n平均反応: " + avgTimeEl.textContent + " ms");
}
