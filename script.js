    document.getElementById('formCardapio').addEventListener('submit', function (event) {
      event.preventDefault(); // Previne o comportamento padrão do formulário
      calcularLucroMaximo(); // Chama a função para calcular o lucro máximo
    });

    document.getElementById('pratos').addEventListener('input', gerarInputs); // Adiciona um evento para gerar inputs ao mudar o número de pratos

    function gerarInputs() {
      const containerPratos = document.getElementById('containerPratos'); // Obtém o contêiner de pratos
      containerPratos.innerHTML = ''; // Limpa o contêiner
      const numPratos = document.getElementById('pratos').value; // Obtém o número de pratos

      for (let i = 0; i < numPratos; i++) {
        const grupoPrato = document.createElement('div'); // Cria um div para cada prato
        grupoPrato.className = 'form-group'; // Adiciona a classe 'form-group'
        grupoPrato.innerHTML = `
          <label for="custo${i}">Custo do prato ${i + 1}:</label>
          <input type="number" class="form-control" id="custo${i}" name="custo${i}" required>
          <label for="lucro${i}">Lucro do prato ${i + 1}:</label>
          <input type="number" class="form-control" id="lucro${i}" name="lucro${i}" required>
        `; // Adiciona os inputs de custo e lucro do prato
        containerPratos.appendChild(grupoPrato); // Adiciona o div ao contêiner de pratos
      }
    }

    function calcularLucroMaximo() {
      const dias = parseInt(document.getElementById('dias').value); // Obtém o número de dias
      const numPratos = parseInt(document.getElementById('pratos').value); // Obtém o número de pratos
      const orcamento = parseInt(document.getElementById('orcamento').value); // Obtém o orçamento
      const pratos = []; // Array para armazenar os pratos

      for (let i = 0; i < numPratos; i++) {
        const custo = parseInt(document.getElementById(`custo${i}`).value); // Obtém o custo do prato
        const lucro = parseInt(document.getElementById(`lucro${i}`).value); // Obtém o lucro do prato
        pratos.push({ custo, lucro }); // Adiciona o prato ao array
      }

      const dp = Array.from({ length: dias + 1 }, () =>
        Array.from({ length: orcamento + 1 }, () => ({ lucro: -Infinity, caminho: [] }))
      ); // Inicializa a tabela de programação dinâmica

      dp[0][0] = { lucro: 0, caminho: [] }; // Configuração inicial

      for (let dia = 1; dia <= dias; dia++) {
        for (let orc = 0; orc <= orcamento; orc++) {
          for (let indicePrato = 0; indicePrato < numPratos; indicePrato++) {
            const { custo, lucro } = pratos[indicePrato]; // Obtém o custo e lucro do prato
            if (orc >= custo) {
              const lucroAnterior = dp[dia - 1][orc - custo].lucro; // Obtém o lucro anterior
              if (lucroAnterior !== -Infinity) {
                let novoLucro = lucroAnterior + lucro; // Calcula o novo lucro
                const caminhoAnterior = dp[dia - 1][orc - custo].caminho; // Obtém o caminho anterior
                if (caminhoAnterior.length > 0 && caminhoAnterior[caminhoAnterior.length - 1] === indicePrato + 1) {
                  novoLucro = lucroAnterior + lucro / 2; // Ajusta o lucro se o prato foi escolhido no dia anterior
                }
                if (novoLucro > dp[dia][orc].lucro) {
                  dp[dia][orc] = { lucro: novoLucro, caminho: [...caminhoAnterior, indicePrato + 1] }; // Atualiza a tabela com o novo lucro e caminho
                }
              }
            }
          }
        }
      }

      let lucroMaximo = -Infinity; // Inicializa o lucro máximo
      let melhorCaminho = []; // Inicializa o melhor caminho

      for (let orc = 0; orc <= orcamento; orc++) {
        if (dp[dias][orc].lucro > lucroMaximo) {
          lucroMaximo = dp[dias][orc].lucro; // Atualiza o lucro máximo
          melhorCaminho = dp[dias][orc].caminho; // Atualiza o melhor caminho
        }
      }

      if (lucroMaximo === -Infinity) {
        Swal.fire({
          title: 'Resultado',
          text: 'Lucro máximo: 0.0',
          icon: 'info'
        }); // Exibe mensagem de lucro máximo zero
      } else {
        Swal.fire({
          title: 'Resultado',
          html: `Lucro máximo: ${lucroMaximo.toFixed(1)}<br>Dias: ${melhorCaminho.join(' ')}`,
          icon: 'success'
        }); // Exibe o lucro máximo e o melhor caminho
      }
    }
