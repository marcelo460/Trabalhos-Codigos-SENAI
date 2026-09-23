const campoNome = document.getElementById('campoNome');
const botaoMostrar = document.getElementById('btnMostrar');
const resultado = document.getElementById('resultado');

botaoMostrar.addEventListener('click', function() {
    const nome = campoNome.value;

    resultado.textContent = nome;
});