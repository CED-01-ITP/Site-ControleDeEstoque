// Estoque armazenado como array de lotes: {quantidade, preco}
  let estoque = [];

  // Função para atualizar a tabela de lotes na tela
  function atualizarTabela() {
    const tbody = document.querySelector("#tabelaLotes tbody");
    tbody.innerHTML = "";

    estoque.forEach((lote, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${lote.quantidade}</td>
        <td>${lote.preco.toFixed(2)}</td>
        <td>${(lote.quantidade * lote.preco).toFixed(2)}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Função para calcular o custo médio atual
  function calcularCustoMedio() {
    let totalQtd = 0;
    let totalValor = 0;
    estoque.forEach(lote => {
      totalQtd += lote.quantidade;
      totalValor += lote.quantidade * lote.preco;
    });
    return totalQtd > 0 ? totalValor / totalQtd : 0;
  }

  // Função para registrar entrada
  function registrarEntrada(quantidade, preco) {
    estoque.push({ quantidade, preco });
  }

  // Função para registrar saída usando PEPS (FIFO)
  function saidaPEPS(quantidade) {
    let quantidadeRestante = quantidade;
    let custoTotal = 0;

    while (quantidadeRestante > 0 && estoque.length > 0) {
      let lote = estoque[0];
      if (lote.quantidade <= quantidadeRestante) {
        custoTotal += lote.quantidade * lote.preco;
        quantidadeRestante -= lote.quantidade;
        estoque.shift(); // remove lote
      } else {
        custoTotal += quantidadeRestante * lote.preco;
        lote.quantidade -= quantidadeRestante;
        quantidadeRestante = 0;
      }
    }

    if (quantidadeRestante > 0) {
      throw new Error("Estoque insuficiente para saída");
    }

    return custoTotal;
  }

  // Função para registrar saída usando UEPS (LIFO)
  function saidaUEPS(quantidade) {
    let quantidadeRestante = quantidade;
    let custoTotal = 0;

    while (quantidadeRestante > 0 && estoque.length > 0) {
      let lote = estoque[estoque.length - 1];
      if (lote.quantidade <= quantidadeRestante) {
        custoTotal += lote.quantidade * lote.preco;
        quantidadeRestante -= lote.quantidade;
        estoque.pop(); // remove lote do fim
      } else {
        custoTotal += quantidadeRestante * lote.preco;
        lote.quantidade -= quantidadeRestante;
        quantidadeRestante = 0;
      }
    }

    if (quantidadeRestante > 0) {
      throw new Error("Estoque insuficiente para saída");
    }

    return custoTotal;
  }

  // Função para registrar saída usando custo médio
  function saidaCustoMedio(quantidade) {
    const custoMedio = calcularCustoMedio();
    let quantidadeTotal = estoque.reduce((acc, lote) => acc + lote.quantidade, 0);

    if (quantidade > quantidadeTotal) {
      throw new Error("Estoque insuficiente para saída");
    }

    // Reduz quantidade proporcionalmente dos lotes
    let quantidadeRestante = quantidade;
    for (let i = 0; i < estoque.length; i++) {
      let lote = estoque[i];
      if (lote.quantidade <= quantidadeRestante) {
        quantidadeRestante -= lote.quantidade;
        lote.quantidade = 0;
      } else {
        lote.quantidade -= quantidadeRestante;
        quantidadeRestante = 0;
        break;
      }
    }
    estoque = estoque.filter(lote => lote.quantidade > 0);

    return quantidade * custoMedio;
  }

  // Manipulação do formulário
  document.getElementById("formEstoque").addEventListener("submit", function (e) {
    e.preventDefault();

    const metodo = document.getElementById("metodo").value;
    const operacao = document.getElementById("operacao").value;
    const precoInput = document.getElementById("preco").value;
    const quantidade = parseInt(document.getElementById("quantidade").value);

    const resultadoDiv = document.getElementById("resultado");

    try {
      if (operacao === "entrada") {
        if (!precoInput) throw new Error("Preço unitário é obrigatório para entrada");
        const preco = parseFloat(precoInput);
        if (preco <= 0) throw new Error("Preço unitário deve ser maior que zero");
        registrarEntrada(quantidade, preco);
        resultadoDiv.textContent = `Entrada registrada: ${quantidade} unidades a R$ ${preco.toFixed(2)} cada.`;
      } else {
        // saída
        let custoTotal;
        if (metodo === "peps") {
          custoTotal = saidaPEPS(quantidade);
        } else if (metodo === "ueps") {
          custoTotal = saidaUEPS(quantidade);
        } else if (metodo === "medio") {
          custoTotal = saidaCustoMedio(quantidade);
        }
        resultadoDiv.textContent = `Saída registrada: ${quantidade} unidades. Custo total: R$ ${custoTotal.toFixed(2)}.`;
      }

      atualizarTabela();
      this.reset();

    } catch (err) {
      resultadoDiv.textContent = `Erro: ${err.message}`;
    }
  });

  // Inicializa tabela vazia
  atualizarTabela();