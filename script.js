let jogadores = [];

// ADICIONAR JOGADOR
document.getElementById("btnAdicionar").addEventListener("click", () => {
  const nome = document.getElementById("nome").value.trim();
  const estrelas = parseInt(document.getElementById("estrelas").value);

  if (!nome) {
    alert("Digite um nome!");
    return;
  }

  jogadores.push({ nome, estrelas });

  document.getElementById("nome").value = "";

  atualizarLista();
});

// ATUALIZAR LISTA
function atualizarLista() {
  const lista = document.getElementById("listaJogadores");
  lista.innerHTML = "";

  jogadores.forEach((j, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${j.nome} (${j.estrelas}⭐)
      <button class="remover" onclick="removerJogador(${index})">X</button>
    `;
    lista.appendChild(li);
  });
}

// REMOVER
function removerJogador(index) {
  jogadores.splice(index, 1);
  atualizarLista();
}

// SORTEAR TIMES
function sortearTimes() {
  const total = jogadores.length;

  if (total < 10 || total % 5 !== 0) {
    alert("Precisa de 10, 15, 20 jogadores...");
    return;
  }

  const qtdTimes = total / 5;

  let ordenados = [...jogadores].sort((a, b) => b.estrelas - a.estrelas);

  let times = [];
  for (let i = 0; i < qtdTimes; i++) {
    times.push({ jogadores: [], total: 0 });
  }

  ordenados.forEach(jogador => {
    times.sort((a, b) => a.total - b.total);

    for (let time of times) {
      if (time.jogadores.length < 5) {
        time.jogadores.push(jogador);
        time.total += jogador.estrelas;
        break;
      }
    }
  });

  mostrarTimes(times);
}

// MOSTRAR TIMES
function mostrarTimes(times) {
  const container = document.getElementById("times");
  container.innerHTML = "";

  times.forEach((time, i) => {
    const div = document.createElement("div");
    div.className = "time-card";

    let html = `<div class="time-name">Time ${i + 1}</div>`;

    time.jogadores.forEach(j => {
      html += `<p>${j.nome} (${j.estrelas}⭐)</p>`;
    });

    div.innerHTML = html;
    container.appendChild(div);
  });
}
