let numero = 0;
const elementoContador = document.getElementById('contador');
const botaoAdicionar = document.getElementById('btnAdicionar');

botaoAdicionar.addEventListener('click', function() {
    numero++;
    
    elementoContador.textContent = numero;
});