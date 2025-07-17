# Recomendações Futuras:

## Banco de Dados:

- SQLite ou PostgreSQL para persistência local ou web.
- MongoDB também é uma opção.
- Estudar a melhor opção.
- Firebase para uma solução rápida e online.

## Backend:

- Node.js + Express para criar uma API REST.
- Python (Flask ou Django) se quiser explorar outra linguagem.

## Autenticação de Usuário

- Login para diferentes usuários controlarem seus próprios estoques.

## Dashboard com Gráficos

- Usar Chart.js para mostrar evolução de estoque ou custos.

## Exportação de Dados

- CSV ou PDF para relatórios.

---

# 🧱 Estrutura do Projeto

```bash
Site-ControleDeEstoque/
├── index.html
├── README.md
├── site/
│    ├── assets/
│    │   ├── img/
│    │   └── vid/
│    ├── src/
│    │   ├── script.js
│    │   └── style.css
```

## 🧠 Dica Extra para Estrutura do Projeto
Se quiser deixar o projeto ainda mais modular no futuro, você pode adicionar:
- components/ → para trechos HTML reutilizáveis
- data/ → para arquivos JSON simulando um banco de dados
- tests/ → para testes automatizados
- docs/ → para documentação técnica

---

# 🧠 Guia para Criar o JavaScript (script.js)

Aqui estão os passos que você pode seguir para desenvolver a lógica:

- Criar estrutura de dados para armazenar o estoque.
**Use arrays ou objetos para guardar entradas e saídas.**

- Capturar eventos dos formulários
**Use addEventListener para interceptar os submit.**

- Implementar os métodos PEPS, UEPS e Custo Médio

- PEPS: usa os primeiros itens comprados.

- UEPS: usa os últimos itens comprados.

- Média: calcula o custo médio ponderado.

- Atualizar a tabela de estoque dinamicamente
**Use innerHTML para preencher a ```<tbody>``` com os dados.**

- Validar entradas e saídas
**Evite remover mais do que há em estoque.**


## 🧠 Visão Geral da Lógica

O sistema vai funcionar com base em três pilares:

1. **Armazenamento de dados em memória**  
   Usaremos arrays para guardar as entradas de produtos.

2. **Manipulação de dados conforme o método escolhido**  
   PEPS, UEPS e Média vão usar a mesma base de dados, mas com regras diferentes para calcular o custo da saída.

3. **Atualização da interface**  
   Toda vez que algo muda, atualizamos a tabela de estoque na tela.

---