// Rename the variable to avoid conflict with function name
textoFilmeSorteado = document.getElementById("filme-sorteado");
removerAoSortear = false;  // Renamed from removerFilme
mostrado = false;
let lastSortedIndex = -1; // Add this at the top with other variables

function adicionarFilme() {
    inputFilme = document.querySelector("#input-filme").value;
    filmes.push(inputFilme);
    if (inputFilme.trim() === "") {
        alert("Por favor, insira um nome de filme válido.");
        return;
    }else{
    // Salva o array atualizado no localStorage
    localStorage.setItem('filmes', JSON.stringify(filmes));
    filmLists[currentListName] = filmes;
    localStorage.setItem('filmLists', JSON.stringify(filmLists));
    alert("Filme adicionado com sucesso!");
    atualizarListaFilmes(); // Atualiza a lista
    }
}



function sortearFilme() {
    // Check if list is empty
    if (filmes.length === 0) {
        alert("A lista está vazia! Adicione alguns filmes primeiro.");
        return;
    }

    const animationDuration = 2000; // 2 seconds
    const intervalTime = 100; // Time between each shuffle
    let startTime = Date.now();
    
    // Disable the button during animation
    const botaoSortear = document.querySelector("button:nth-of-type(2)");
    botaoSortear.disabled = true;
    
    // Start the shuffle animation
    const shuffleInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        
        // Random temporary selection
        const tempIndex = Math.floor(Math.random() * filmes.length);
        textoFilmeSorteado.innerHTML = "Filme sorteado: " + filmes[tempIndex];
        
        // Check if animation should end
        if (elapsedTime >= animationDuration) {
            clearInterval(shuffleInterval);
            
            // Select the final film
            index = Math.floor(Math.random() * filmes.length);
            lastSortedIndex = index; // Store the index of sorted film
            filmeSorteado = filmes[index];
            textoFilmeSorteado.innerHTML = "Filme sorteado: " + filmeSorteado;
            
            // Re-enable the button
            botaoSortear.disabled = false;
            
            // Remove film if option is enabled
        }
    }, intervalTime);
}

function removerFilme() {
    if (lastSortedIndex === -1) {
        alert("Nenhum filme foi sorteado ainda!");
        return;
    }
    
    filmes.splice(lastSortedIndex, 1);
    localStorage.setItem('filmes', JSON.stringify(filmes));
    filmLists[currentListName] = filmes;
    localStorage.setItem('filmLists', JSON.stringify(filmLists));
    alert("Último filme sorteado foi removido!");
    atualizarListaFilmes();
    
    lastSortedIndex = -1; // Reset the index
}
function atualizarListaFilmes() {
    const listaHTML = document.getElementById("lista-filmes");
    listaHTML.innerHTML = ""; // Limpa a lista atual
    
    filmes.forEach(filme => {
        const li = document.createElement("li");
        li.textContent = filme;
        listaHTML.appendChild(li);
    });
}

const defaultFilmes = [
    "1922",
    "Gerald's Game",
    "Influência",
    "The Blair Witch Project",
    "A classic horror story",
    "A mãe que balança o berço",
    "Cisne Negro",
    "This house has people in it",
    "Abraço de mãe",
    "Doce vingança",
    "Doce vingança 3",
    "Pânico na escola",
    "Mama Agnes",
    "Bad boy, Oliver",
    "The man with no mouth",
    "Teletubies - Anticonstanza",
    "O Animal Cordial",
    "Good boy",
    "Skinamarink",
    "A Serbian Film",
    "Centopéria Humana 2",
    "Pisque duas vezes",
    "August Underground",
    "Bunny Game",
    "Não fale o mal (Dinamarquês)",
    "Megan is missing",
    "O Lobo atrás da porta",
    "Menendez",
    "Gein",
    "Fale comigo",
    "Premonição 6",
    "Miss Violence",
    "O Iluminado",
    "Guerra Mundial Z",
    "Rua do medo 1978",
    "The Silence of the Lambs",
    "Until Dawns",
    "Boa noite, mamãe!",
    "Um Lugar Silencioso Dia 1",
    "Não! Não olhe!",
    "A Visita",
    "A Casa de cera"
];

function resetarLista() {
    const confirmacao = confirm(`Isso irá restaurar a lista "${currentListName}" para o padrão. Deseja continuar?`);
    if (!confirmacao) return;
    
    if (currentListName === 'default') {
        filmes = [...defaultFilmes];
    } else {
        filmes = [];
    }
    
    filmLists[currentListName] = filmes;
    localStorage.setItem('filmLists', JSON.stringify(filmLists));
    atualizarListaFilmes();
    
    alert("Lista restaurada com sucesso!");
}
function mostrarLista() {
    const listaFilmes = document.getElementById("lista-filmes");
    const botao = document.querySelector("#mostrar"); // Get the last button (Show List)
    
    if (mostrado) {
        listaFilmes.style.opacity = "0";
        botao.textContent = "Mostrar lista de filmes";
    } else {
        listaFilmes.style.opacity = "1";
        botao.textContent = "Esconder lista de filmes";
    }
    mostrado = !mostrado; // Toggle the state
}
function retirarFilmeEspecifico(){
    inputFilme = document.querySelector("#input-filme");
    if (filmes.includes(inputFilme.value)) {
        console.log(filmes.indexOf(inputFilme.value))
        filmes.splice(filmes.indexOf(inputFilme.value), 1);
        localStorage.setItem('filmes', JSON.stringify(filmes));
        alert("Filme removido com sucesso!");
        atualizarListaFilmes(); // Atualiza a lista
    } else {
        alert("Filme não encontrado na lista")
    }
}
function listaNova(){
    const confirmacao = confirm(`Isso irá apagar a lista "${currentListName}". Deseja continuar?`);
    if (!confirmacao) return;
    
    filmes = [];
    filmLists[currentListName] = filmes;
    localStorage.setItem('filmLists', JSON.stringify(filmLists));
    atualizarListaFilmes();
}
function apagarLista() {
    // Don't allow deleting the default list
    if (currentListName === 'default') {
        alert("Não é possível apagar a lista padrão!");
        return;
    }

    const confirmacao = confirm(`Tem certeza que deseja apagar a lista "${currentListName}"?`);
    if (!confirmacao) return;

    // Delete the list
    delete filmLists[currentListName];
    
    // Switch to default list
    currentListName = 'default';
    filmes = filmLists[currentListName];
    
    // Update localStorage
    localStorage.setItem('filmLists', JSON.stringify(filmLists));
    localStorage.setItem('currentList', currentListName);
    
    // Update UI
    atualizarSeletorListas();
    atualizarListaFilmes();
    
    alert("Lista apagada com sucesso!");
}
// Inicialização do array filmes
let currentListName = localStorage.getItem('currentList') || 'default';
let filmLists = JSON.parse(localStorage.getItem('filmLists')) || {
    'default': [
        "1922",
        "Gerald's Game",
        "Influência",
        "The Blair Witch Project",
        "A classic horror story",
        "A mãe que balança o berço",
        "Cisne Negro",
        "This house has people in it",
        "Abraço de mãe",
        "Doce vingança",
        "Doce vingança 3",
        "Pânico na escola",
        "Mama Agnes",
        "Bad boy, Oliver",
        "The man with no mouth",
        "Teletubies - Anticonstanza",
        "O Animal Cordial",
        "Good boy",
        "Skinamarink",
        "A Serbian Film",
        "Centopéria Humana 2",
        "Pisque duas vezes",
        "August Underground",
        "Bunny Game",
        "Não fale o mal (Dinamarquês)",
        "Megan is missing",
        "O Lobo atrás da porta",
        "Menendez",
        "Gein",
        "Fale comigo",
        "Premonição 6",
        "Miss Violence",
        "O Iluminado",
        "Guerra Mundial Z",
        "Rua do medo 1978",
        "The Silence of the Lambs",
        "Until Dawns",
        "Boa noite, mamãe!",
        "Um Lugar Silencioso Dia 1",
        "Não! Não olhe!",
        "A Visita",
        "A Casa de cera"
    ]
};
let filmes = filmLists[currentListName];

atualizarListaFilmes(); // Atualiza a lista quando a página carrega

function criarNovaLista() {
    const listName = prompt("Digite o nome da nova lista:");
    if (!listName) return;
    
    if (filmLists[listName]) {
        alert("Já existe uma lista com este nome!");
        return;
    }
    
    filmLists[listName] = [];
    currentListName = listName;
    localStorage.setItem('filmLists', JSON.stringify(filmLists));
    localStorage.setItem('currentList', currentListName);
    
    filmes = filmLists[currentListName];
    atualizarListaFilmes();
    atualizarSeletorListas();
}

function trocarLista() {
    const listName = document.getElementById('list-selector').value;
    currentListName = listName;
    filmes = filmLists[currentListName];
    localStorage.setItem('currentList', currentListName);
    atualizarListaFilmes();
}

function atualizarSeletorListas() {
    const selector = document.getElementById('list-selector');
    selector.innerHTML = '';
    
    Object.keys(filmLists).forEach(listName => {
        const option = document.createElement('option');
        option.value = listName;
        option.textContent = listName;
        option.selected = listName === currentListName;
        selector.appendChild(option);
    });
}