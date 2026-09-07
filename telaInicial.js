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
    lifePlayerRed.setAttribute('aria-hidden', 'false');
    lifePlayer2Red.setAttribute('aria-hidden', 'true');
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
  levelIndicator.textContent = window.customMode ? 'MODO PERSONALIZADO' : ('NÍVEL: ' + (nomesNivel[dificuldadeSelection] || 'FÁCIL'));
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
  nivel.textContent = window.customMode ? 'Partida com questões criadas pelo(a) professor(a)' : ('Nível selecionado: ' + (nomes[dificuldadeSelection] || 'FÁCIL'));

  var intro = document.createElement('p');
  intro.textContent = window.customMode
    ? 'No Modo Personalizado, Jogador 1 e Jogador 2 alternam questões criadas pelo(a) professor(a). Cada participante recebe metade das questões, distribuídas em pares equivalentes. O vencedor é definido pelo número de acertos.'
    : (window.gameMode === 'multiplayer'
      ? 'No modo multiplayer, Jogador 1 e Jogador 2 alternam as questões e enfrentam o mesmo inimigo. Cada participante recebe 10 questões do nível escolhido. As questões são organizadas em pares equivalentes de conteúdo e dificuldade. O vencedor é quem obtiver mais acertos; em caso de empate, o jogo abre rodadas extras de desempate.'
      : 'Em cada rodada, escolha uma ação e depois responda à questão. O resultado depende da resposta e da ação selecionada.');

  var lista = document.createElement('div');
  lista.className = 'instructionList';
  lista.innerHTML = `
    <div class="instructionItem"><img src="atk.png" alt="Ícone de ataque"><div><strong>ATAQUE</strong><span>Selecione antes de responder. Ao acertar, você causa dano ao mosquito.</span></div></div>
    <div class="instructionItem"><img src="def.png" alt="Ícone de defesa"><div><strong>DEFESA</strong><span>Selecione antes de responder. A defesa protege o jogador quando a rodada não sai como esperado.</span></div></div>
    <div class="instructionItem"><img src="star.png" alt="Ícone de poder especial"><div><strong>ESPECIAL</strong><span>É liberado após uma sequência de acertos e concede uma vantagem especial na batalha.</span></div></div>
  `;

  var dica = document.createElement('p');
  dica.className = 'modalTip';
  dica.textContent = window.customMode
    ? 'Depois de cada resposta, o jogo mostrará a alternativa correta e abrirá um Momento de discussão. Professor(a), converse com a turma e avance apenas quando desejar.'
    : (window.gameMode === 'multiplayer'
      ? 'Após cada resposta, leiam e discutam o feedback. O turno só muda quando alguém clicar em “PRÓXIMA PERGUNTA”. Cada jogador possui sua própria barra de vida. O mosquito possui resistência equivalente às 20 jogadas da partida. O ranking final continua sendo definido pelos acertos de cada jogador.'
      : 'Após cada resposta, leia o feedback. O jogo só avança quando você clicar em “PRÓXIMA PERGUNTA”.');

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

// ============================================================
// ================== MODO PERSONALIZADO (V9) =================
// ============================================================
window.customMode = false;
window.customQuestionBank = [];

function parseQuestoesPersonalizadas(texto) {
  var limpo = String(texto || '').replace(/\r/g, '').trim();
  if (!limpo) throw new Error('Cole pelo menos duas questões para continuar.');
  var blocos = limpo.split(/(?=^\s*QUEST(?:ÃO|AO)\s*\d+\s*[:\-]?)/gmi).map(function(b){return b.trim();}).filter(Boolean);
  if (!blocos.length) throw new Error('Use blocos iniciados por “QUESTÃO 1”, “QUESTÃO 2” etc.');
  var saida = [];
  blocos.forEach(function(bloco, indice) {
    var linhas = bloco.split(/\n/).map(function(l){return l.trim();}).filter(Boolean);
    var cabecalho = linhas.shift() || '';
    if (!/^QUEST(?:ÃO|AO)\s*\d+/i.test(cabecalho)) throw new Error('Revise o cabeçalho da questão ' + (indice + 1) + '.');
    var dados = {pergunta:'',A:'',B:'',C:'',D:'',correta:''};
    linhas.forEach(function(linha){
      var m;
      if ((m=linha.match(/^PERGUNTA\s*:\s*(.+)$/i))) dados.pergunta=m[1].trim();
      else if ((m=linha.match(/^A\s*[\)\:\-]\s*(.+)$/i))) dados.A=m[1].trim();
      else if ((m=linha.match(/^B\s*[\)\:\-]\s*(.+)$/i))) dados.B=m[1].trim();
      else if ((m=linha.match(/^C\s*[\)\:\-]\s*(.+)$/i))) dados.C=m[1].trim();
      else if ((m=linha.match(/^D\s*[\)\:\-]\s*(.+)$/i))) dados.D=m[1].trim();
      else if ((m=linha.match(/^CORRETA\s*:\s*([ABCD])\s*$/i))) dados.correta=m[1].toUpperCase();
      else if (!dados.pergunta && linha) dados.pergunta=linha;
    });
    if (!dados.pergunta) throw new Error('A questão ' + (indice + 1) + ' está sem enunciado.');
    ['A','B','C','D'].forEach(function(letra){if(!dados[letra]) throw new Error('A questão ' + (indice + 1) + ' está sem a alternativa ' + letra + '.');});
    if (!dados.correta) throw new Error('Informe “Correta: A”, “Correta: B”, “Correta: C” ou “Correta: D” na questão ' + (indice + 1) + '.');
    var parId='CUSTOM_'+String(Math.floor(indice/2)+1).padStart(2,'0');
    saida.push([dados.pergunta.toUpperCase(),[dados.A.toUpperCase(),dados.correta==='A'],[dados.B.toUpperCase(),dados.correta==='B'],[dados.C.toUpperCase(),dados.correta==='C'],[dados.D.toUpperCase(),dados.correta==='D'],'p','', 'Questões personalizadas', parId, 'custom']);
  });
  if (saida.length < 2) throw new Error('O Modo Personalizado precisa de pelo menos 2 questões.');
  if (saida.length % 2 !== 0) throw new Error('Foram inseridas ' + saida.length + ' questões. Use um número par para que J1 e J2 recebam a mesma quantidade.');
  if (saida.length > 60) throw new Error('Nesta versão, utilize no máximo 60 questões por sessão.');
  return saida;
}

function mostrarConfiguradorPersonalizado() {
  var modal=criarModalBase('customModeModal'); var card=modal.card; card.classList.add('customModeCard');
  var titulo=document.createElement('h2'); titulo.textContent='MODO PERSONALIZADO';
  var intro=document.createElement('p'); intro.className='customIntro'; intro.textContent='Crie uma partida multiplayer com suas próprias questões. Você não precisa conhecer programação.';
  var passos=document.createElement('ol'); passos.className='customSteps'; passos.innerHTML='<li>Use sempre um número <strong>par</strong> de questões.</li><li>Organize-as em pares equivalentes: <strong>1–2, 3–4, 5–6...</strong>.</li><li>Cada questão deve ter quatro alternativas e indicar a correta.</li><li>O jogo sorteia qual questão do par vai para J1/J2 e embaralha as alternativas.</li><li>As questões existem apenas nesta sessão e não alteram o banco oficial.</li>';
  var modelo=document.createElement('pre'); modelo.className='customExample'; modelo.textContent='QUESTÃO 1\nPergunta: Qual é a capital de Pernambuco?\nA) Recife\nB) Petrolina\nC) Caruaru\nD) Olinda\nCorreta: A\n\nQUESTÃO 2\nPergunta: Qual destes municípios fica no Sertão de Pernambuco?\nA) Olinda\nB) Petrolina\nC) Paulista\nD) Igarassu\nCorreta: B';
  var label=document.createElement('label'); label.className='customInputLabel'; label.textContent='Cole suas questões abaixo:';
  var textarea=document.createElement('textarea'); textarea.className='customQuestionsInput'; textarea.setAttribute('aria-label','Questões personalizadas'); textarea.placeholder=modelo.textContent; textarea.spellcheck=true;
  var status=document.createElement('div'); status.className='customValidation'; status.setAttribute('role','status'); status.setAttribute('aria-live','polite');
  var actions=document.createElement('div'); actions.className='customActions';
  var voltar=document.createElement('button'); voltar.type='button'; voltar.className='modalSecondaryButton'; voltar.textContent='VOLTAR';
  var iniciar=document.createElement('button'); iniciar.type='button'; iniciar.className='modalPrimaryButton'; iniciar.textContent='VALIDAR E JOGAR';
  voltar.addEventListener('pointerup',function(){window.location.reload();});
  iniciar.addEventListener('pointerup',function(){
    try {
      var banco=parseQuestoesPersonalizadas(textarea.value); window.customQuestionBank=banco; window.customMode=true; window.gameMode='multiplayer';
      status.className='customValidation customOk'; status.textContent=banco.length+' questões validadas • '+(banco.length/2)+' para cada jogador.'; iniciar.disabled=true;
      setTimeout(function(){modal.overlay.remove(); mostrarComoJogar();},450);
    } catch(erro){status.className='customValidation customError'; status.textContent=erro.message||'Revise o formato das questões.';}
  });
  actions.append(voltar,iniciar); card.append(titulo,intro,passos,modelo,label,textarea,status,actions); setTimeout(function(){textarea.focus();},50);
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
  if (window.gameMode === 'custom') mostrarConfiguradorPersonalizado();
  else { window.customMode = false; mostrarComoJogar(); }
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
    window.gameMode = 'multiplayer'; window.customMode = false;
    modeSelect.textContent = 'MODO: MULTIPLAYER';
    modeSelect.classList.add('multiplayerSelected'); modeSelect.classList.remove('customSelected');
    dificult.style.opacity = '1'; dificult.style.pointerEvents = ''; dificult.removeAttribute('aria-hidden');
  } else if (window.gameMode === 'multiplayer') {
    window.gameMode = 'custom'; window.customMode = false;
    modeSelect.textContent = 'MODO: PERSONALIZADO';
    modeSelect.classList.remove('multiplayerSelected'); modeSelect.classList.add('customSelected');
    dificult.style.opacity = '0.45'; dificult.style.pointerEvents = 'none'; dificult.setAttribute('aria-hidden','true');
  } else {
    window.gameMode = 'individual'; window.customMode = false;
    modeSelect.textContent = 'MODO: INDIVIDUAL';
    modeSelect.classList.remove('multiplayerSelected', 'customSelected');
    dificult.style.opacity = '1'; dificult.style.pointerEvents = ''; dificult.removeAttribute('aria-hidden');
  }
});

window.ta = document.querySelectorAll('p');
