/* ===== Elements ===== */
const gameBox = document.querySelector('.game-box');
const ghost = document.getElementById('ghost');
const spike = document.getElementById('spike');
const shuriken = document.getElementById('shuriken');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highscore');
const gameOverCard = document.getElementById('game-over-card');
const finalScore = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');

/* ===== Game State ===== */
let score = 0;
let highScore = parseInt(localStorage.getItem('highscore')) || 0;
let baseSpeed = 5;
let speedIncrement = 0.005;
let currentSpeed = baseSpeed;
let obstaclePos = 0;
let activeObstacleEl = null;
let gameLoop = null;
let scoreInterval = null;
let isGameOver = false;
const TICK_MS = 20;
const JUMP_MS = 800;

scoreDisplay.textContent = padScore(score);
highScoreDisplay.textContent = padScore(highScore);

/* ===== Helpers ===== */
function padScore(num) { return num.toString().padStart(3,'0'); }

/* ===== Start Game ===== */
function startGame() {
  isGameOver = false;
  score = 0;
  scoreDisplay.textContent = padScore(score);
  gameOverCard.classList.add('hidden');
  spike.style.display = 'none';
  shuriken.style.display = 'none';
  currentSpeed = baseSpeed;

  if (gameLoop) clearInterval(gameLoop);
  setTimeout(()=>{ spawnObstacle(); gameLoop = setInterval(gameTick, TICK_MS); },400);

  ghost.classList.add('ghost-floating');
  startScore();
}

/* ===== Game Over ===== */
function gameOver() {
  isGameOver = true;
  if(gameLoop) clearInterval(gameLoop);
  if(scoreInterval) clearInterval(scoreInterval);
  spike.style.display = 'none';
  shuriken.style.display = 'none';
  activeObstacleEl = null;
  finalScore.textContent = "Score: " + padScore(score);
  gameOverCard.classList.remove('hidden');
}

/* ===== Jump Logic ===== */
function jump() {
  if (isGameOver || ghost.classList.contains('ghost-jump')) return;
  ghost.classList.remove('ghost-floating');
  ghost.classList.add('ghost-jump');
  setTimeout(()=>{ ghost.classList.remove('ghost-jump'); if(!isGameOver) ghost.classList.add('ghost-floating'); }, JUMP_MS);
}

/* ===== Controls ===== */
document.addEventListener('keydown', e=>{ if(!isGameOver&&(e.code==='Enter'||e.code==='Space')) jump(); });
document.addEventListener('mousedown', e=>{ if(!isGameOver) jump(); });
document.addEventListener('touchstart', e=>{ if(!isGameOver){ e.preventDefault(); jump(); }},{passive:false});
restartBtn.addEventListener('click', startGame);

/* ===== Scoring ===== */
function startScore() {
  if(scoreInterval) clearInterval(scoreInterval);
  scoreInterval = setInterval(()=>{
    if(!isGameOver){
      score++;
      scoreDisplay.textContent = padScore(score);
      if(score>highScore){ 
        highScore=score; 
        localStorage.setItem('highscore',highScore); 
        highScoreDisplay.textContent=padScore(highScore);
      }
    }
  },100);
}

/* ===== Obstacles & Collision ===== */
function spawnObstacle() {
  const pick = Math.random()<0.55?'spike':'shuriken';
  activeObstacleEl = pick==='spike'?spike:shuriken;
  const gbRect = gameBox.getBoundingClientRect();
  obstaclePos = gbRect.width+20;
  activeObstacleEl.style.left = obstaclePos+'px';
  activeObstacleEl.style.display = 'block';
  if(pick==='shuriken'){ 
    const t=Math.floor(Math.random()*(gbRect.height-80-50+1))+50; 
    activeObstacleEl.style.top=t+'px'; 
  } else activeObstacleEl.style.bottom='25px';
}

function gameTick(){
  if(!activeObstacleEl) spawnObstacle();
  currentSpeed = baseSpeed + score*speedIncrement;
  obstaclePos -= currentSpeed;
  if(activeObstacleEl) activeObstacleEl.style.left = obstaclePos+'px';
  const gr = ghost.getBoundingClientRect();
  if(activeObstacleEl){ 
    const or = activeObstacleEl.getBoundingClientRect();
    if(gr.left<or.right && gr.right>or.left && gr.top<or.bottom && gr.bottom>or.top){ 
      gameOver(); 
      return; 
    } 
  }
  if(obstaclePos<-120 && activeObstacleEl){ 
    activeObstacleEl.style.display='none'; 
    activeObstacleEl=null; 
  }
}

window.addEventListener('load', ()=>{
  ghost.classList.add('ghost-floating');
  startGame();
});

/* ===== Fruits Background ===== */
const fruitsContainer = document.querySelector('.fruits-container');
const fruitColors = ['red','yellow','pink','orange'];

function spawnFruit() {
  const fruit = document.createElement('div');
  fruit.classList.add('fruit');
  fruit.classList.add(fruitColors[Math.floor(Math.random() * fruitColors.length)]);
  
  // Random horizontal position
  fruit.style.left = Math.random() * (gameBox.offsetWidth - 12) + 'px';
  // Random animation duration (2s to 5s)
  const duration = Math.random()*3 + 2;
  fruit.style.animationDuration = duration + 's';
  
  // Random horizontal drift using transformX inside keyframes
  fruit.style.setProperty('--drift', Math.random() * 100 - 50 + 'px');

  fruitsContainer.appendChild(fruit);
  
  setTimeout(() => { fruit.remove(); }, duration * 1000);
}

// Spawn fruits every 300ms
setInterval(spawnFruit, 300);
