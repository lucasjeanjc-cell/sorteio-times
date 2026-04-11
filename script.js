function carregarJogadores() {
  const dados = localStorage.getItem("jogadores");
  return dados ? JSON.parse(dados) : [];
}

let jogadores = carregarJogadores();

// botão adicionar
document.getElementById("btnAdicionar")
  .addEventListener("click", adicionarJogador);

// salvar no localStorage
function salvarJogadores() {
  localStorage.setItem("jogadores", JSON.stringify(jogadores));
}

// adicionar jogador
function adicionarJogador() {
  const nome = document.getElementById("nome").value;
  const estrelas = parseInt(document.getElementById("estrelas").value);

  if (!nome.trim()) return alert("Digite um nome!");

  jogadores.push({ nome, estrelas });

  document.getElementById("nome").value = "";

  salvarJogadores();
  atualizarLista();
}

// remover jogador
function removerJogador(index) {
  jogadores.splice(index, 1);
  salvarJogadores();
  atualizarLista();
}

// atualizar lista
function atualizarLista() {
  const lista = document.getElementById("listaJogadores");
  lista.innerHTML = "";

  jogadores.forEach((j, index) => {
    const estrelas = "⭐".repeat(j.estrelas);

    const li = document.createElement("li");

    li.innerHTML = `
      ${index + 1} - ${j.nome.charAt(0).toUpperCase() + j.nome.slice(1)} ${estrelas} (${j.estrelas})
      <button class="remover" onclick="removerJogador(${index})">X</button>
    `;

    lista.appendChild(li);
  });
}

// sortear times
function sortearTimes() {
  if (jogadores.length < 20) {
    alert("Precisa de pelo menos 20 jogadores!");
    return;
  }

  let ordenados = [...jogadores].sort((a, b) => b.estrelas - a.estrelas);

  let times = [
    { jogadores: [], total: 0 },
    { jogadores: [], total: 0 },
    { jogadores: [], total: 0 },
    { jogadores: [], total: 0 }
  ];

  ordenados.forEach(jogador => {
    times.sort((a, b) => a.total - b.total);

    for (let i = 0; i < times.length; i++) {
      if (times[i].jogadores.length < 5) {
        times[i].jogadores.push(jogador);
        times[i].total += jogador.estrelas;
        break;
      }
    }
  });

  mostrarTimes(times);
}

// mostrar times
function mostrarTimes(times) {
  const div = document.getElementById("times");
  div.innerHTML = "";

  times.forEach((time, i) => {
    let html = `
      <div class="time-card time-${i}">
        <div class="time-name">⚽ Time ${i + 1}</div>
        <ul>
    `;

    time.jogadores.forEach((j, index) => {
      const nomeFormatado =
        j.nome.charAt(0).toUpperCase() + j.nome.slice(1);

      html += `<li>${index + 1} - ${nomeFormatado} ${"⭐".repeat(j.estrelas)} (${j.estrelas})</li>`;
    });

    html += "</ul></div>";

    div.innerHTML += html;
  });
}
document.getElementById("nome").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    adicionarJogador();
  }
});

// carregar lista ao abrir
atualizarLista();

