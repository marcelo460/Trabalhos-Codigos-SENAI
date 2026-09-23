// Seleciona a imagem e o botão pelos IDs
const imagem = document.getElementById('minhaImagem');
const botao = document.getElementById('btnTrocar');

// URL da segunda imagem
const novaImagemUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiAuxbbuo5GEzRjs6-WilI1Oq731iGqYa4lfkWohYpgA&s=10";

// Adiciona o evento de clique ao botão
botao.addEventListener('click', function() {
    // Altera o atributo 'src' da imagem para o caminho/link da nova imagem
    imagem.src = novaImagemUrl;
    
    // Opcional: Atualiza também o atributo 'alt' para acessibilidade
    imagem.alt = "Nova Imagem";
});