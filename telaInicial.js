function removerMenuInicial() {
  [background, start, buttonCredits, nameGame, dificult, modeSelect].forEach(function(el) {
    if (el && el.parentNode) el.remove();
  });
  clearInterval(timeGameNameAnimation);
}

function criarModalBase(classeExtra) {
  var overlay = document.createElement('div');
  overlay.className = 'gameModalOverlay ' + (classeExtra || '');
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');

  var card = document.createElement('section');
  card.className = 'gameModalCard';
  overlay.appendChild(card);
  document.body.appendChild(overlay);
  return { overlay: overlay, card: card };
}

function iniciarBatalha() {
  document.body.classList.add('game-active');

  document.body.appendChild(battleStage);
  battleStage.appendChild(background2);
  battleStage.appendChild(player);
  battleStage.appendChild(inimigo);

  player.appendChild(imgPlayer);
  inimigo.appendChild(imgEnemy);

  player.appendChild(lifePlayerRed);
  lifePlayerRed.appendChild(lifePlayer);
  if (window.gameMode === 'multiplayer') {
    player.appendChild(lifePlayer2Red);
    lifePlayer2Red.appendChild(lifePlayer2);
    lifePlayerRed.classList.add('multiplayerLife', 'j1Life', 'activeLife');
    lifePlayer2Red.classList.add('multiplayerLife', 'j2Life');
    player.classList.add('playerJ1');
  } else {
    lifePlayerRed.classList.remove('multiplayerLife', 'j1Life', 'activeLife');
  }
  inimigo.appendChild(lifeEnemyRed);
  lifeEnemyRed.appendChild(lifeEnemy);

  document.body.appendChild(gameUI);

  var nomesNivel = { f: 'FÁCIL', m: 'MÉDIO', d: 'DIFÍCIL' };
  var levelIndicator = document.createElement('div');
  levelIndicator.className = 'levelIndicator';
  levelIndicator.textContent = 'NÍVEL: ' + (nomesNivel[dificuldadeSelection] || 'FÁCIL');
  gameUI.appendChild(levelIndicator);

  if (window.gameMode === 'multiplayer') {
    window.turnIndicator = document.createElement('div');
    turnIndicator.className = 'turnIndicator';
    turnIndicator.textContent = 'JOGADOR 1 • SUA VEZ';
    turnIndicator.classList.add('turnJ1');
    gameUI.appendChild(turnIndicator);
  }

  gameUI.appendChild(actionBar);
  gameUI.appendChild(questionArea);

  actionBar.appendChild(buttonAtk);
  actionBar.appendChild(buttonDef);
  actionBar.appendChild(buttonStar);

  questionArea.appendChild(legend);
  questionArea.appendChild(answersGrid);

  alterna.length = 0;
  answersGrid.innerHTML = '';
  for (let i = 0; i <= 3; i++) {
    let alter = document.createElement('div');
    let spawnMsg = document.createElement('span');
    alter.className = 'opcao';
    spawnMsg.className = 'spawnMsg';
    alter.spawnMsg = spawnMsg;
    alterna.push(alter);
    answersGrid.appendChild(alter);
    alter.appendChild(spawnMsg);
  }

  if (typeof correcaoBox !== 'undefined') {
    questionArea.appendChild(correcaoBox);
  }

  telaDeJogo();
}

function mostrarComoJogar() {
  var modal = criarModalBase('howToPlayModal');
  var card = modal.card;

  var titulo = document.createElement('h2');
  titulo.textContent = 'COMO JOGAR';

  var nivel = document.createElement('p');
  var nomes = { f: 'FÁCIL', m: 'MÉDIO', d: 'DIFÍCIL' };
  nivel.className = 'modalLevel';
  nivel.textContent = 'Nível selecionado: ' + (nomes[dificuldadeSelection] || 'FÁCIL');

  var intro = document.createElement('p');
  intro.textContent = window.gameMode === 'multiplayer'
    ? 'No modo multiplayer, Jogador 1 e Jogador 2 alternam as questões e enfrentam o mesmo inimigo. Cada participante recebe 10 questões do nível escolhido. As questões são organizadas em pares equivalentes de conteúdo e dificuldade. O vencedor é quem obtiver mais acertos; em caso de empate, o jogo abre rodadas extras de desempate.'
    : 'Em cada rodada, escolha uma ação e depois responda à questão. O resultado depende da resposta e da ação selecionada.';

  var lista = document.createElement('div');
  lista.className = 'instructionList';
  lista.innerHTML = `
    <div class="instructionItem"><img src="atk.png" alt="Ícone de ataque"><div><strong>ATAQUE</strong><span>Selecione antes de responder. Ao acertar, você causa dano ao mosquito.</span></div></div>
    <div class="instructionItem"><img src="def.png" alt="Ícone de defesa"><div><strong>DEFESA</strong><span>Selecione antes de responder. A defesa protege o jogador quando a rodada não sai como esperado.</span></div></div>
    <div class="instructionItem"><img src="star.png" alt="Ícone de poder especial"><div><strong>ESPECIAL</strong><span>É liberado após uma sequência de acertos e concede uma vantagem especial na batalha.</span></div></div>
  `;

  var dica = document.createElement('p');
  dica.className = 'modalTip';
  dica.textContent = window.gameMode === 'multiplayer'
    ? 'Após cada resposta, leiam e discutam o feedback. O turno só muda quando alguém clicar em “PRÓXIMA PERGUNTA”. Cada jogador possui sua própria barra de vida. O mosquito possui resistência equivalente às 20 jogadas da partida. O ranking final continua sendo definido pelos acertos de cada jogador.'
    : 'Após cada resposta, leia o feedback. O jogo só avança quando você clicar em “PRÓXIMA PERGUNTA”.';

  var botao = document.createElement('button');
  botao.type = 'button';
  botao.className = 'modalPrimaryButton';
  botao.textContent = 'COMEÇAR';
  botao.addEventListener('pointerup', function() {
    modal.overlay.remove();
    iniciarBatalha();
  });

  card.append(titulo, nivel, intro, lista, dica, botao);
}

function mostrarCreditos() {
  var modal = criarModalBase('creditsModal');
  var card = modal.card;

  var titulo = document.createElement('h2');
  titulo.textContent = 'CRÉDITOS';

  var subtitulo = document.createElement('p');
  subtitulo.className = 'creditsProduct';
  subtitulo.textContent = 'ArboQuest: Missão Arboviroses';

  var autores = document.createElement('div');
  autores.className = 'creditsAuthors';
  autores.innerHTML = `
    <p><strong>Autores</strong></p>
    <p>Renato Francisco Batista</p>
    <p>Telma Temoteo dos Santos</p>
    <p class="creditsInstitution">Universidade de Pernambuco (UPE)</p>
  `;

  var botao = document.createElement('button');
  botao.type = 'button';
  botao.className = 'modalPrimaryButton';
  botao.textContent = 'VOLTAR';
  botao.addEventListener('pointerup', function() {
    modal.overlay.remove();
  });

  card.append(titulo, subtitulo, autores, botao);
}

document.body.appendChild(background);
document.body.appendChild(buttonCredits);
document.body.appendChild(start);
document.body.appendChild(nameGame);
document.body.appendChild(dificult);
document.body.appendChild(modeSelect);
dificult.textContent = 'dificuldade: FACIL';
modeSelect.textContent = 'MODO: INDIVIDUAL';
dificuldadeSelection = 'f';

start.addEventListener('pointerup', function() {
  removerMenuInicial();
  mostrarComoJogar();
});

buttonCredits.addEventListener('pointerup', function() {
  mostrarCreditos();
});

window.dificuldadeSelection;
var dificuldade = [
  ['dificuldade: FACIL', 'dificuldade: MEDIO', 'dificuldade: DIFICIL'],
  ['#83CB81', '#D5E177', '#D25F59']
];

var algoritmoDificuldade = 0;
dificult.addEventListener('pointerup', function() {
  algoritmoDificuldade += 1;
  if (algoritmoDificuldade >= 3) algoritmoDificuldade = 0;
  dificult.style.backgroundColor = dificuldade[1][algoritmoDificuldade];
  dificult.textContent = dificuldade[0][algoritmoDificuldade];
  if (algoritmoDificuldade === 0) dificuldadeSelection = 'f';
  if (algoritmoDificuldade === 1) dificuldadeSelection = 'm';
  if (algoritmoDificuldade === 2) dificuldadeSelection = 'd';
});

modeSelect.addEventListener('pointerup', function() {
  if (window.gameMode === 'individual') {
    window.gameMode = 'multiplayer';
    modeSelect.textContent = 'MODO: MULTIPLAYER';
    modeSelect.classList.add('multiplayerSelected');
  } else {
    window.gameMode = 'individual';
    modeSelect.textContent = 'MODO: INDIVIDUAL';
    modeSelect.classList.remove('multiplayerSelected');
  }
});

window.ta = document.querySelectorAll('p');
