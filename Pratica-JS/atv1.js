const botao = document.getElementById('meuBotao');
const titulo = document.getElementById('meuTitulo');

botao.addEventListener('click', function() {
    titulo.textContent = 'Olá, JavaScript!';
});