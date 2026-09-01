let carrinho = [];

let pedido = {
  dia: '',
  turno: '',
  horario: '',
  pagamento: '',
  total: 0
};

const mapaPassos = {
  'tela-cardapio': 'passo-cardapio',
  'tela-carrinho': 'passo-carrinho',
  'tela-agendamento': 'passo-agendamento',
  'tela-pagamento': 'passo-pagamento',
  'tela-sucesso': 'passo-sucesso'
};

function mudarTela(idTela) {
  document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
  document.getElementById(idTela).classList.add('ativa');

  // Atualiza barra de progresso no topo
  document.querySelectorAll('.passo').forEach(p => p.classList.remove('ativo'));
  const passoAtual = mapaPassos[idTela];
  if (passoAtual) {
    document.getElementById(passoAtual).classList.add('ativo');
  }
}

function adicionarItem(nome, preco) {
  carrinho.push({ nome, preco });
  renderizarCarrinho();
  alert(`${nome} foi adicionado ao carrinho!`);
}

function renderizarCarrinho() {
  const container = document.getElementById('itens-carrinho');
  container.innerHTML = '';
  
  let total = 0;
  if (carrinho.length === 0) {
    container.innerHTML = '<p>Seu carrinho está vazio.</p>';
  } else {
    carrinho.forEach((item, index) => {
      total += item.preco;
      container.innerHTML += `
        <div style="display:flex; justify-content:space-between; margin-bottom:10px; padding:10px; border-bottom:1px solid #eee;">
          <span>${item.nome}</span>
          <span>R$ ${item.preco},00</span>
        </div>`;
    });
  }

  pedido.total = total;
  document.getElementById('total-carrinho').innerText = `R$ ${total},00`;
}

function selecionarDia(dia, elemento) {
  document.querySelectorAll('.btn-dia').forEach(btn => btn.classList.remove('selecionado'));
  elemento.classList.add('selecionado');
  pedido.dia = dia;
}

function finalizarPedido() {
  document.getElementById('resumo-entrega').innerText = `${pedido.dia || 'Qua 16'}, ${pedido.horario || '15h-16h'} (${pedido.turno || 'Tarde'})`;
  document.getElementById('resumo-pagamento').innerText = pedido.pagamento || 'Pix';
  document.getElementById('resumo-valor').innerText = `R$ ${pedido.total},00`;
  
  mudarTela('tela-sucesso');
}

function reiniciar() {
  carrinho = [];
  pedido = { dia: '', turno: '', horario: '', pagamento: '', total: 0 };
  renderizarCarrinho();
  mudarTela('tela-cardapio');
}