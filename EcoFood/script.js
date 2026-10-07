const produtos = [
  { id: 1,  nome: 'Tomate Orgânico',     preco: 12, unidade: 'kg',      categoria: 'Frutas e Verduras', foto: 'tomate.jpg', cor: '#fde2dc', desc: 'Maduro, doce e colhido no pé.'},
  { id: 2,  nome: 'Bananas Orgânicas',   preco: 8,  unidade: 'dúzia',   categoria: 'Frutas e Verduras', foto: 'banana.jpg', cor: '#fdf1c4', desc: 'Prata, sem agrotóxicos.'},
  { id: 3,  nome: 'Alface Crespa',       preco: 5,  unidade: 'unid.',   categoria: 'Frutas e Verduras', foto: 'alface.jpg', cor: '#dff2d4', desc: 'Folhas crocantes hidropônicas.'},
  { id: 4,  nome: 'Cenoura Orgânica',    preco: 7,  unidade: 'kg',      categoria: 'Frutas e Verduras', foto: 'cenoura.jpg', cor: '#fde4cc', desc: 'Firme e adocicada.'},
  { id: 5,  nome: 'Abacate',             preco: 10, unidade: 'kg',      categoria: 'Frutas e Verduras', foto: 'abacate.jpg', cor: '#e2efc9', desc: 'Cremoso, no ponto de comer.'},
  { id: 6,  nome: 'Morangos',            preco: 15, unidade: 'bandeja', categoria: 'Frutas e Verduras', foto: 'morango.jpg', cor: '#fbd9de', desc: 'Doces e sem conservantes.'},
  { id: 7,  nome: 'Ovos Caipiras',       preco: 16, unidade: 'dúzia',   categoria: 'Proteínas',         foto: 'ovos.jpg', cor: '#f6ecda', desc: 'De galinhas criadas soltas.'},
  { id: 8,  nome: 'Filé de Tilápia',     preco: 32, unidade: 'kg',      categoria: 'Proteínas',         foto: 'file_de_tilapia.jpg', cor: '#d9ecf5', desc: 'Pesca sustentável, sem espinhas.'},
  { id: 9,  nome: 'Peito de Frango Caipira', preco: 28, unidade: 'kg',  categoria: 'Proteínas',         foto: 'peito_de_frango.jpg', cor: '#f8e2cf', desc: 'Criação livre e alimentação natural.'},
  { id: 10, nome: 'Pão Integral',        preco: 14, unidade: 'unid.',   categoria: 'Padaria',           foto: 'pao.jpg', cor: '#f0e0c8', desc: 'Fermentação natural, 100% integral.'},
  { id: 11, nome: 'Granola Artesanal',   preco: 18, unidade: '500 g',   categoria: 'Padaria',           foto: 'granola.jpg', cor: '#efe3cf', desc: 'Aveia, castanhas e mel.'},
  { id: 12, nome: 'Suco Verde Prensado', preco: 11, unidade: '300 ml',  categoria: 'Bebidas',           foto: 'suco.jpg', cor: '#d8f0d2', desc: 'Couve, maçã, limão e gengibre.'},
  { id: 13, nome: 'Água de Coco',        preco: 6,  unidade: '330 ml',  categoria: 'Bebidas',           foto: 'agua_de_coco.jpg', cor: '#e6f1ee', desc: 'Natural, direto do coco.'},
  { id: 14, nome: 'Mel Puro',            preco: 25, unidade: '300 g',   categoria: 'Despensa',          foto: 'mel.jpg', cor: '#fbe7b0', desc: 'De apiários locais.'}
];

let carrinho = [];           // { id, nome, preco, qtd }
let categoriaAtiva = 'Todos';

let pedido = { dia: '', turno: '', horario: '', pagamento: '', total: 0 };

const mapaPassos = {
  'tela-cardapio': 'passo-cardapio',
  'tela-carrinho': 'passo-carrinho',
  'tela-agendamento': 'passo-agendamento',
  'tela-pagamento': 'passo-pagamento',
  'tela-sucesso': 'passo-sucesso'
};

const moeda = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

/* ---------- Navegação ---------- */
function mudarTela(idTela) {
  document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
  document.getElementById(idTela).classList.add('ativa');

  document.querySelectorAll('.passo').forEach(p => p.classList.remove('ativo'));
  const passoAtual = mapaPassos[idTela];
  if (passoAtual) document.getElementById(passoAtual).classList.add('ativo');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('visivel');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => el.classList.remove('visivel'), 2200);
}

/* ---------- Cardápio ---------- */
function renderizarFiltros() {
  const cats = ['Todos', ...new Set(produtos.map(p => p.categoria))];
  document.getElementById('filtros').innerHTML = cats.map(c =>
    `<button class="chip ${c === categoriaAtiva ? 'ativo' : ''}" onclick="filtrar('${c}')">${c}</button>`
  ).join('');
}

function filtrar(cat) {
  categoriaAtiva = cat;
  renderizarFiltros();
  renderizarProdutos();
}

function renderizarProdutos() {
  const lista = categoriaAtiva === 'Todos' ? produtos : produtos.filter(p => p.categoria === categoriaAtiva);
  document.getElementById('grid-produtos').innerHTML = lista.map(p => `
    <article class="card-produto">
      <div class="card-imagem" style="background:${p.cor}">
        ${p.foto
          ? `<img src="${p.foto}" alt="${p.nome}" loading="lazy" onerror="this.replaceWith(document.createTextNode('${p.emoji}'))">`
          : `<span role="img" aria-label="${p.nome}">${p.emoji}</span>`}
      </div>
      <div class="card-corpo">
        <h3>${p.nome}</h3>
        <p class="descricao">${p.desc}</p>
        <p class="preco">${moeda(p.preco)} <small>/ ${p.unidade}</small></p>
        <button class="btn-adicionar" onclick="adicionarItem(${p.id})">Adicionar ao Carrinho</button>
      </div>
    </article>`).join('');
}

/* ---------- Carrinho ---------- */
function adicionarItem(id) {
  const prod = produtos.find(p => p.id === id);
  const existente = carrinho.find(i => i.id === id);
  if (existente) existente.qtd++;
  else carrinho.push({ id, nome: prod.nome, preco: prod.preco, emoji: prod.emoji, cor: prod.cor, qtd: 1 });
  renderizarCarrinho();
  toast(`${prod.nome} foi adicionado ao carrinho`);
}

function alterarQtd(id, delta) {
  const item = carrinho.find(i => i.id === id);
  if (!item) return;
  item.qtd += delta;
  if (item.qtd <= 0) carrinho = carrinho.filter(i => i.id !== id);
  renderizarCarrinho();
}

function renderizarCarrinho() {
  const container = document.getElementById('itens-carrinho');
  let total = 0, qtdTotal = 0;

  if (carrinho.length === 0) {
    container.innerHTML = `<div class="vazio"><span>🧺</span><p>Seu carrinho está vazio. Escolha algo no cardápio.</p></div>`;
  } else {
    container.innerHTML = carrinho.map(item => {
      total += item.preco * item.qtd;
      qtdTotal += item.qtd;
      return `
        <div class="item-carrinho">
          <div class="mini-imagem" style="background:${item.cor}">${item.emoji}</div>
          <div class="item-info">
            <strong>${item.nome}</strong>
            <span>${moeda(item.preco)} cada</span>
          </div>
          <div class="qtd">
            <button onclick="alterarQtd(${item.id}, -1)" aria-label="Diminuir">−</button>
            <span>${item.qtd}</span>
            <button onclick="alterarQtd(${item.id}, 1)" aria-label="Aumentar">+</button>
          </div>
          <strong class="subtotal">${moeda(item.preco * item.qtd)}</strong>
        </div>`;
    }).join('');
  }

  pedido.total = total;
  document.getElementById('total-carrinho').innerText = moeda(total);
  document.getElementById('contador-carrinho').innerText = qtdTotal;
}

/* ---------- Agendamento ---------- */
function irParaAgendamento() {
  if (carrinho.length === 0) return toast('Adicione ao menos um produto ao carrinho.');
  mudarTela('tela-agendamento');
}

function selecionarDia(dia, elemento) {
  document.querySelectorAll('.btn-dia').forEach(btn => btn.classList.remove('selecionado'));
  elemento.classList.add('selecionado');
  pedido.dia = dia;
}

function confirmarAgendamento() {
  if (!pedido.dia || !pedido.turno || !pedido.horario) {
    return toast('Escolha o dia, o turno e o horário da entrega.');
  }
  mudarTela('tela-pagamento');
}

/* ---------- Pagamento ---------- */
function escolherPagamento(valor) {
  pedido.pagamento = valor;
  document.getElementById('dados-cartao').hidden = valor !== 'Cartão';
}

function finalizarPedido() {
  if (!pedido.pagamento) return toast('Escolha a forma de pagamento.');

  document.getElementById('resumo-entrega').innerText = `${pedido.dia}, ${pedido.horario} (${pedido.turno})`;
  document.getElementById('resumo-pagamento').innerText = pedido.pagamento;
  document.getElementById('resumo-valor').innerText = moeda(pedido.total);
  mudarTela('tela-sucesso');
}

function reiniciar() {
  carrinho = [];
  pedido = { dia: '', turno: '', horario: '', pagamento: '', total: 0 };
  document.querySelectorAll('input[type=radio]').forEach(r => r.checked = false);
  document.querySelectorAll('.btn-dia').forEach(b => b.classList.remove('selecionado'));
  document.getElementById('dados-cartao').hidden = true;
  renderizarCarrinho();
  mudarTela('tela-cardapio');
}

/* ---------- Início ---------- */
renderizarFiltros();
renderizarProdutos();
renderizarCarrinho();