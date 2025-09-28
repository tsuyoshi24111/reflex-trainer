document.addEventListener('DOMContentLoaded', () => {
  const TOTAL_ROUNDS = 20;
  const MIN_DELAY = 800;
  const MAX_DELAY = 2000;

  const gridEl    = document.getElementById('grid');
  const startBtn  = document.getElementById('startBtn');
  const roundEl   = document.getElementById('round');
  const scoreEl   = document.getElementById('score');
  const avgTimeEl = document.getElementById('avgTime');
  const levelEl   = document.getElementById('level');
  const panel     = document.getElementById('panel');
  const levelUpMsg = document.getElementById('level-up-message');

  let score       = 0;
  let level       = 1;
  let round       = 0;
  let times       = [];
  let targetIndex = null;
  let startTime   = 0;

  // 5×5 セル生成
  for (let i = 0; i < 25; i++) {
    const div = document.createElement('div');
    div.className = 'cell';
    div.dataset.index = i;
    gridEl.appendChild(div);
  }

  // クリック処理
  gridEl.addEventListener('click', e => {
    if (!e.target.classList.contains('cell') || targetIndex === null) return;
    if (Number(e.target.dataset.index) === targetIndex) {
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

  function nextRound() {
    if (round >= TOTAL_ROUNDS) {
      alert(`終了！\nスコア: ${score}\n平均反応: ${avgTimeEl.textContent} ms`);
      return;
    }

    round++;
    updateInfo();

    const delay = Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY;
    const index = Math.floor(Math.random() * 25);
    targetIndex = index;

    const targetCell = gridEl.querySelector(`[data-index="${index}"]`);
    if (targetCell) {
      setTimeout(() => {
        targetCell.classList.add('active');
        startTime = Date.now();
        panel.style.display = 'block';
      }, delay);
    }

    // レベルアップ演出（例：5ラウンドごと）
    if (round % 5 === 0 && round !== 0) {
      level++;
      levelEl.textContent = level;
      showLevelUpMessage();
    }
  }

  function updateInfo() {
    roundEl.textContent   = round;
    scoreEl.textContent   = score;
    levelEl.textContent   = level;
    const avg = times.length
      ? Math.round(times.reduce((a, b) => a + b) / times.length)
      : 0;
    avgTimeEl.textContent = avg;
  }

  function clearActive() {
    const prev = gridEl.querySelector('.active');
    if (prev) prev.classList.remove('active');
    targetIndex = null;
    panel.style.display = 'none';
  }

  function resetGame() {
    score = 0;
    level = 1;
    round = 0;
    times = [];
    clearActive();
    updateInfo();
  }

  function showLevelUpMessage() {
    levelUpMsg.style.display = 'block';
    setTimeout(() => {
      levelUpMsg.style.display = 'none';
    }, 1000);
  }
});
