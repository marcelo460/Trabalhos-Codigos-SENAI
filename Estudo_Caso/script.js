function calcularMedia() {
    let campo1 = document.getElementById('nota1');
    let campo2 = document.getElementById('nota2');

    let n1 = parseFloat(campo1.value);
    let n2 = parseFloat(campo2.value);

    if (isNaN(n1) || isNaN(n2)) {
        alert("Por favor, digite as duas notas!");
        return;
    }

    let mediaFinal = (n1 + n2) / 2;

    document.getElementById('n1').innerText = n1;
    document.getElementById('n2').innerText = n2;
    document.getElementById('media').innerText = mediaFinal.toFixed(1);

    if (mediaFinal >= 7) {
        document.getElementById('status').innerText = "APROVADO!";
        document.getElementById('status').style.color = "green";
    } else {
        document.getElementById('status').innerText = "REPROVADO!";
        document.getElementById('status').style.color = "red";
    }
}