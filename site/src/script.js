let estoque = []
let listaProdutos = document.getElementById('tabelaEstoque')
let produtoInForm = document.getElementById('entradaForm')
let produtoOutForm = document.getElementById('saidaForm')

function adicionarProduto(nome, quantidade, preco) {
  //Adiciona ao estoque
}

function removerProduto(nome, quantidade, metodo) {
  // Aplica PEPS, UEPS ou Média
}

function atualizarTabela() {
  // Atualiza a interface
}


/*
FLUXO DE FUNCIONAMENTO:
1. Entrada de produto:
- capturar dados do form: nome, quantidade e preco;
- armazenar em um array como objeto: ex -> {nome:"nome aqui", quantidade: 999, preco: 0.1}

2. Saída de  produto:
- Capturar nome e quantidade.
- Verificar se há estoque suficiente.
- Aplicar o método selecionado (PEPS, UEPS ou Média).
- Atualizar o array de estoque removendo os itens corretos.

3. Atualização da Tabela
- Limpar a `<tbody>` da tabela.
- Percorrer o array de estoque e criar linhas com os dados.

MÉTODOS DE CÁLCULO
> PEPS (FIFO)
- Remover produtos mais antigos primeiro.
- Percorrer o array do início ao fim.
> UEPS (LIFO)
- Remover produtos mais recentes primeiro.
- Percorrer o array do fim ao início.
> Custo Médio
- Calcular o custo médio ponderado:
  precoMedio = totalValor / totalQuantidade;
*/