function sortearTimes() {
  const totalJogadores = jogadores.length;

  // Verifica se a quantidade é múltipla de 5 (10, 15, 20...)
  if (totalJogadores < 10 || totalJogadores % 5 !== 0) {
    alert("O número de jogadores deve ser múltiplo de 5 (ex: 10, 15, 20)!");
    return;
  }

  // Calcula quantos times serão formados (Ex: 15 jogadores = 3 times)
  const quantidadeTimes = totalJogadores / 5;

  let ordenados = [...jogadores].sort((a, b) => b.estrelas - a.estrelas);

  // Cria o array de times dinamicamente
  let times = [];
  for (let i = 0; i < quantidadeTimes; i++) {
    times.push({ jogadores: [], total: 0 });
  }

  ordenados.forEach(jogador => {
    // Ordena os times pelo peso total (equilíbrio)
    times.sort((a, b) => a.total - b.total);

    // Adiciona o jogador ao time menos pontuado que ainda tem vaga
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


