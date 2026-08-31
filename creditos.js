// QUANDO O BOTÃO DE VOLTAR É CLICADO
buttonBack.addEventListener('pointerup', () => {
  buttonBack.remove();
  
  document.body.appendChild(buttonCredits);
  document.body.appendChild(start);
  document.body.appendChild(nameGame);
  document.body.appendChild(dificult);
  
  animationNameGame();
});