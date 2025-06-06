// Declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

const IDS_VALIDOS = ["0", "1", "2", "3", "4", "5"];

// Captura os botões pelos IDs
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Reinicia o jogo
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente(); // já chama removerTrofeu()
  atualizaPlacar(0, 0);
  btnJogarNovamente.className = 'visivel';
  btnReiniciar.className = 'invisivel';
}

// Função jogar novamente
function jogarNovamente() {
  jogar = true;

  IDS_VALIDOS.forEach(id => {
    const carta = document.getElementById(id);
    if (carta) {
      carta.className = "inicial";
      const erroSpan = carta.querySelector(".mensagem-erro");
      if (erroSpan) erroSpan.remove();
    }
  });

  const imagem = document.getElementById("imagem");
  if (imagem) imagem.remove();

  removerTrofeu();
}

// Atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  document.getElementById("resposta").innerHTML =
    `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${Math.round(desempenho)}%`;

  if (desempenho === 0 && tentativas > 0) {
    IDS_VALIDOS.forEach(id => {
      const carta = document.getElementById(id);
      if (carta) {
        carta.classList.add("tremer");
        setTimeout(() => carta.classList.remove("tremer"), 500);
      }
    });
  }

  if (acertos === 6 && tentativas === 6) {
    mostrarTrofeu();
  } else {
    removerTrofeu();
  }
}

// Mostra o Smile (sem confetes)
function mostrarSmile(obj) {
  obj.className = "acertou";
  const img = new Image(100);
  img.id = "imagem";
  img.src = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";
  obj.appendChild(img);
}

// Jogador acertou
function acertou(obj) {
  mostrarSmile(obj);
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// Mostra mensagem de erro
function mostrarErro(obj) {
  const erroSpan = document.createElement("span");
  erroSpan.textContent = "ERROU";
  erroSpan.className = "mensagem-erro";
  obj.appendChild(erroSpan);
}

// Verifica o acerto
function verifica(obj) {
  if (!jogar) {
    alert('Clique em "Jogar novamente"');
    return;
  }

  jogar = false;
  tentativas++;

  if (tentativas === 6) {
    btnJogarNovamente.className = 'invisivel';
    btnReiniciar.className = 'visivel';
  }

  const sorteado = Math.floor(Math.random() * 6);
  if (obj.id == sorteado) {
    acertou(obj);
    acertos++;
  } else {
    obj.className = "errou";
    mostrarSmile(document.getElementById(sorteado));
    mostrarErro(obj);
  }

  atualizaPlacar(acertos, tentativas);
}

// Mostra troféu
function mostrarTrofeu() {
  if (!document.getElementById("trofeu")) {
    const img = new Image(100);
    img.id = "trofeu";
    img.src = "https://cdn-icons-png.flaticon.com/512/2278/2278992.png";
    document.getElementById("resposta").appendChild(img);
  }
}

// Remove troféu
function removerTrofeu() {
  const trofeu = document.getElementById("trofeu");
  if (trofeu) trofeu.remove();
}

// Eventos dos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);

