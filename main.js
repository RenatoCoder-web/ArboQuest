// ORIGEM DOS BOTÕES
// START
window.start = document.createElement('div');
start.className = 'start';
start.textContent = 'PLAY';

// BOTÃO DE VOLTAR
window.buttonBack = document.createElement('div');
buttonBack.className = 'buttonBack';
buttonBack.textContent = 'BACK';

// BOTÃO DE CRÉDITOS
window.buttonCredits = document.createElement('div');
buttonCredits.className = 'buttonCredits';
buttonCredits.textContent = 'CREDITS';

// CRIA O NOME DO JOGO
window.nameGame = document.createElement('img');
nameGame.src = 'NameGame.png';
nameGame.className = 'nameGame';

// TIMER PRA A ANIMAÇÃO DO NOME DO JOGO
var timeGameNameAnimation;

// CRIA A ANIMAÇÃO DO NOME
function animationNameGame() {
  elementPosX = [5, 5.5, 6, 5.5, 5];
  let movePosX = 0;
  
  timeGameNameAnimation = setInterval(() => {
    movePosX += 1;
    nameGame.style.top = elementPosX[movePosX] + '%';
    
    if (movePosX === 4) {
      movePosX = -1;
    };
    
  }, 150);
};

// TORNA GLOBAL A FUNÇÃO DA ANIMAÇÃO DO NOME
window.animationNameGame = animationNameGame;
animationNameGame();

// CRIA O BOTÃO DE DIFICULDADE
window.dificult = document.createElement('div');
dificult.className = 'dificult';

// SELETOR DE MODO DE JOGO (V7)
window.gameMode = 'individual';
window.modeSelect = document.createElement('div');
modeSelect.className = 'modeSelect';
modeSelect.textContent = 'MODO: INDIVIDUAL';

// CRIA O ELEMENTO PLAYER
window.player = document.createElement('div');
player.className = 'player';
window.imgPlayer = document.createElement('img');
player.imgPlayer = imgPlayer;
player.imgPlayer.className = 'imgPlayer';
player.imgPlayer.src = 'player.gif';

// CRIA O ELEMENTO INIMIGO
window.inimigo = document.createElement('div');
inimigo.className = 'inimigo';
window.imgEnemy = document.createElement('img');
inimigo.imgEnemy = imgEnemy;
inimigo.imgEnemy.className = 'imgEnemy';
inimigo.imgEnemy.src = 'boss3.gif';

// ARRAY DOS DIVS
window.alterna = [];

// Estrutura responsiva da tela de batalha.
window.battleStage = document.createElement('section');
battleStage.className = 'battleStage';

window.gameUI = document.createElement('main');
gameUI.className = 'gameUI';

window.actionBar = document.createElement('div');
actionBar.className = 'actionBar';

window.questionArea = document.createElement('section');
questionArea.className = 'questionArea';

window.answersGrid = document.createElement('div');
answersGrid.className = 'answersGrid';

// CRIA A PERGUNTA
window.legend = document.createElement('div');
legend.className = 'legend';

//EFEITO DOS BOTÕES ATK DEF
window.effect = document.createElement('img');
effect.className = 'effect';
effect.src = 'effect.gif';


// EFEITO RESPONSIVO DOS BOTÕES ATK/DEF
// O GIF é criado a cada clique para reiniciar a animação e é anexado
// ao próprio botão, evitando deslocamentos em telas de tamanhos diferentes.
window.showButtonEffect = function(button, type) {
  if (!button) return;

  var oldEffect = button.querySelector('.buttonEffect');
  if (oldEffect) oldEffect.remove();

  var fx = document.createElement('img');
  fx.className = 'effect buttonEffect';
  // parâmetro variável força o navegador a reiniciar o GIF a cada clique
  fx.src = 'effect.gif?play=' + Date.now();
  fx.alt = '';
  fx.setAttribute('aria-hidden', 'true');

  if (type === 'atk') {
    fx.classList.add('effectAtk');
  } else if (type === 'def') {
    fx.classList.add('effectDef');
  }

  button.appendChild(fx);
};

// Remove os efeitos ATK/DEF somente quando a resposta já foi processada.
window.clearButtonEffects = function() {
  document.querySelectorAll('.buttonEffect').forEach(function(fx) {
    fx.remove();
  });
};

window.background = document.createElement('img');
background.className = 'background'
background.src = 'background.png'

window.background2 = document.createElement('img');
background2.className = 'background2'
background2.src = 'background2.png'

som = [];
for (let i = 0; i <= 2; i++) {
  let audio = document.createElement('audio');
  som.push(audio);
  som[i].volume = 0.1;
};
som[0].src = 'certo.wav';
som[1].src = 'errado.wav';
som[2].src = 'power.wav';