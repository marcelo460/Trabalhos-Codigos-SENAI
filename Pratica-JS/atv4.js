const mensagem = document.getElementById('mensagem');
const botao = document.getElementById('btnToggle');

botao.addEventListener('click', function() {
    if (mensagem.style.display === 'none') {
        mensagem.style.display = 'block';
    } else {
        mensagem.style.display = 'none';
    }
});