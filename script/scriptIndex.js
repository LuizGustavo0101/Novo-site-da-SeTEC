document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".checkbox-toggle");
    document.querySelectorAll("#hamburguerMenu .menu a").forEach((link) => {
        link.addEventListener("click", () => {
            if (menuToggle) menuToggle.checked = false;
        });
    });

    const empresas = [
        { nome: "Andrade Guitierres", area: "Infraestrutura e constução", logo: "../assets/imagens/Logo_AG.png" },
        { nome: "Concremat", area: "Todas as áreas", logo: "../assets/imagens/concremat_logo.png" },
        { nome: "Tesis", area: "Construção Civil", logo: "../assets/imagens/intertek_tesis_logo_on-wht-rgb.png" },
        { nome: "MMF", area: "Infraestrutura e construção", logo: "../assets/imagens/MMF_logo.png"},
        { nome: "TETO", area: "Voluntariado em construção de moradias", logo: "../assets/imagens/TETO_logo.png"},
        { nome: "FCTH", area: "Engenharia Hidráulica", logo: "../assets/imagens/FCTH_logo.jpg"},
        { nome: "IEME", area: "Estruturas e Desenvolvimento Urbano", logo: "../assets/imagens/IEME_logo.jpg"},
        { nome: "O.L.G", area: "Estruturas e Infraestrutura Viária", logo: "../assets/imagens/OLG_logo.jpg"},
    ];

    const container = document.getElementById('listaEmpresas');

    if (container) {
        let todosOsCartoes = "";

        empresas.forEach(empresa => {
            todosOsCartoes += `
                <div class="cartao-empresa">
                    <div class="logo-container">
                        <img src="${empresa.logo}" alt="Logo da ${empresa.nome}">
                    </div>

                    <div class="infos">
                        <h3>${empresa.nome}</h3>
                        <p>${empresa.area}</p>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = todosOsCartoes;
    } else {
        console.error("Atenção: A div com ID 'listaEmpresas' não foi encontrada no HTML.");
    }
})

function AbrirPopup(){    
    const checkbox = hamburguerMenu.querySelector('.checkbox-toggle');
    checkbox.checked = false;

    const telaPreta = document.querySelector("#fundoPopup")
    const containerPopup = document.querySelector(".popupInscricao")
    const dataInicial = new Date("2026/08/24 00:00:00");
    const dataFinal   = new Date("2026/08/28 23:59:59");
    const agora = new Date;

    const estaNoIntervalo = agora >= dataInicial && agora <= dataFinal;
    if (estaNoIntervalo) {
        document.querySelector("#fundoPopup1").style.display = "flex";
    } else {
        document.querySelector("#fundoPopup2").style.display = "flex";
    }
}

function fecharPopup(popup){
    document.querySelector("#fundoPopup1").style.display = "none";
    document.querySelector("#fundoPopup2").style.display = "none";
}

function abrirInta(){
    document.querySelector("#fundoPopup1").style.display = "none";
    document.querySelector("#fundoPopup2").style.display = "none";
    window.location.href = 'https://www.instagram.com/setecpoli/';
}

function abrirFotosSetecXVI(cards){
    switch(cards){
        case 'card1':
            window.location.href = "https://drive.google.com/drive/folders/1KDG2h0eKxchP-Qu--3k8ojBE4VBxrdnh?usp=drive_link"
            break
        case 'card2':
            window.location.href = "https://drive.google.com/drive/folders/1jtgPMGV7dEYnMLSh-DFulTURWlrGcmh5?usp=drive_link"
            break
        case 'card3':
            window.location.href = "https://drive.google.com/drive/folders/1fTTHiDZs9dxBryUeOoevJ-fvAuERd1Kh?usp=drive_link"
            break
        default:
            console.log("Erro ao abrir o google drive")
    }
}