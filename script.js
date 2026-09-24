// ===== CONTADOR =====
// Atenção: em JavaScript os meses começam em 0, então fevereiro = 1
const inicio = new Date(2026, 1, 22, 0, 0, 0);

function atualizarContador() {
  const agora = new Date();
  const diferenca = agora - inicio; // milissegundos

  const segundosTotais = Math.floor(diferenca / 1000);

  const dias = Math.floor(segundosTotais / 86400);
  const horas = Math.floor((segundosTotais % 86400) / 3600);
  const minutos = Math.floor((segundosTotais % 3600) / 60);
  const segundos = segundosTotais % 60;

  document.getElementById("dias").textContent = dias;
  document.getElementById("horas").textContent = horas;
  document.getElementById("minutos").textContent = minutos;
  document.getElementById("segundos").textContent = segundos;
}

atualizarContador();
setInterval(atualizarContador, 1000);

// ===== CARROSSEL DE FOTOS =====
const totalFotos = 19;
const fotos = [];

for (let i = 1; i <= totalFotos; i++) {
  fotos.push("img/foto" + i + ".jpg");
}

// pré-carrega todas as fotos para a troca não engasgar
fotos.forEach((caminho) => {
  const img = new Image();
  img.onerror = () => console.warn("Foto não encontrada: " + caminho);
  img.src = caminho;
});

let indice = 0;
const fotoAtual = document.getElementById("fotoAtual");

function mostrarFoto(novoIndice) {
  // o % faz voltar para a primeira depois da última (e vice-versa)
  indice = (novoIndice + fotos.length) % fotos.length;

  fotoAtual.style.opacity = 0;
  setTimeout(() => {
    fotoAtual.src = fotos[indice];
    fotoAtual.style.opacity = 1;
  }, 300);
}

let timer = setInterval(() => mostrarFoto(indice + 1), 4000);

// reinicia a contagem de 4s quando ela clica numa seta
function reiniciarTimer() {
  clearInterval(timer);
  timer = setInterval(() => mostrarFoto(indice + 1), 4000);
}

document.getElementById("btnAnterior").addEventListener("click", () => {
  mostrarFoto(indice - 1);
  reiniciarTimer();
});

document.getElementById("btnProximo").addEventListener("click", () => {
  mostrarFoto(indice + 1);
  reiniciarTimer();
});

// ===== MOTIVOS =====
const motivos = [
  "meus dias ficam mais coloridos com vc",
  "Porque com você tudo fica mais leve",
  "seu sorriso sempre me encanta junto com seu olhar",
  "você é minha determinação ❤️"
];

const botao = document.getElementById("btnMotivo");
const texto = document.getElementById("motivo");

botao.addEventListener("click", () => {
  const posicao = Math.floor(Math.random() * motivos.length);
  texto.textContent = motivos[posicao];
});

// ===== MÚSICA =====
const musica = document.getElementById("musica");
const btnMusica = document.getElementById("btnMusica");
musica.volume = 0.6;

btnMusica.addEventListener("click", () => {
  if (musica.paused) {
    musica.play()
      .then(() => {
        btnMusica.textContent = "⏸️ Pausar música";
      })
      .catch((erro) => {
        alert("Não consegui tocar a música: " + erro.message);
      });
  } else {
    musica.pause();
    btnMusica.textContent = "🎵 Tocar nossa música";
  }
});

// Se o arquivo não for encontrado, avisa
musica.addEventListener("error", () => {
  alert("O arquivo audio/musica.mp3 não foi encontrado. Confira o nome e a pasta.");
});

// ===== CORAÇÕES NO CLIQUE =====
document.addEventListener("click", (e) => {
  const coracao = document.createElement("span");
  coracao.textContent = "❤️";
  coracao.className = "coracao";
  coracao.style.left = e.clientX + "px";
  coracao.style.top = e.clientY + "px";
  document.body.appendChild(coracao);

  setTimeout(() => coracao.remove(), 1000);
});