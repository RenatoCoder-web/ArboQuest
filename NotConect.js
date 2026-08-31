var legend = document.querySelectorAll('p');

// CÓDIGO RESPONSÁVEL POR CRIAR A SEQUÊNCIA DE PERGUNTAS ALEATÓRIAS
/*
var memoryCash = [];
var cash;
while (memoryCash.length <= 9) {
  cash = Math.floor(Math.random() * 11);
  
if (cash === 10) {
    continue;
  }
  
  var existe = false;
  for (let j = 0; j < memoryCash.length; j++) {
    if (memoryCash[j] === cash) {
      existe = true;
      break;
    }
  }
  
  if (!existe) {
    memoryCash.push(cash);
  }
}
*/

// CRIAR SEQUÊNCIA DAS RESPOSTAS DE FORMA ALEATORIZADA 
var memoryCashAlternativas = []
var cashAlternativas;

while (memoryCashAlternativas.length < 4) {
  cashAlternativas = Math.floor(Math.random() * 5);
  var alternativas = false;
  if (cashAlternativas === 4) {
    continue;
  }
  for (let i = 0; i < memoryCashAlternativas.length; i++) {
    if (memoryCashAlternativas[i] === cashAlternativas) {
      alternativas = true;
      break;
    };
  };
  
  if (!alternativas) {
    memoryCashAlternativas.push(cashAlternativas);
  }
  
  legend[0].textContent = 'memoryCashAlternativas: '+memoryCashAlternativas.join(', ')
};

/*
  // VARIÁVEL PARA VERIFICAR CONDIÇÕES DE ESTADO DE MEMÓRIA
  let memoriaCashVerifiqued = false;
  
  // ALEATORIZA AS SEQUÊNCIAS DAS RESPOSTAS PARA SEMPRE VIREM EM UMA ORDEM DIFERENTE
  while (resultSequenAlter.length !== 4) {
    valorAleatorio = Math.floor(Math.random() * 4);
    if (!resultSequenAlter.includes(valorAleatorio)) {
      resultSequenAlter.push(valorAleatorio);
    }
  };
  
  // RECEBE A QUESTÃO QUE JA FOI ESCOLHIDA PARA IMPEDIR REPETIÇÃO
  for (let i = 0; i <= 3; i++) {
    if (memoryCash[i] === valorAleatorio) {
      memoriaCashVerifiqued = true;
      break;
    };
  };
  
  if (!memoriaCashVerifiqued && memoryCash.length < 10) {
    memoryCash.push(valorAleatorio);
  };
  
  console.log('memoryCash: ', memoryCash);
  
  for (let i = 0; i <= 3; i++) {
    
    // POSICIONA OS DIVS QUE TEM AS RESPOSTAS
    alterna[i].style.left = alternaPosXePosY[0][i] + 'px';
    alterna[i].style.top = alternaPosXePosY[1][i] + 'px';
    alterna[i].spawnMsg.style.opacity = 0;
    
    if (!memoriaCashVerifiqued) {
      console.log('escrveeu')
      //ESCREVE A PERGUNTA
      setTimeout(() => {
        legend.textContent = quest[valorAleatorio][0];
      }, 300 * (i + 1));
      
      // ESCREVE AS RESPOSTAS
      setTimeout(() => {
        alterna[i].spawnMsg.textContent = quest[valorAleatorio][resultSequenAlter[i] + 1][0];
        alterna[i].spawnMsg.style.opacity = 1;
      }, 700 * (i + 1));
    } else {
      
    }
    /* ESCREVE A PERGUNTA
    setTimeout(() => {
      legend.textContent = quest[valorAleatorio][0];
    }, 300 * (i + 1));
    
    // ESCREVE AS RESPOSTAS
    setTimeout(() => {
      alterna[i].spawnMsg.textContent = quest[valorAleatorio][resultSequenAlter[i] + 1][0];
      alterna[i].spawnMsg.style.opacity = 1;
    }, 700 * (i + 1));
    
    // esse código é o que funciona para colocar as respostas mas que não ficam aleatorizados 
    alterna[i].spawnMsg.textContent = quest[memoryCash[0]][i+1][0]
    
    */