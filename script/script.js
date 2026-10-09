document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".checkbox-toggle");
    document.querySelectorAll("#hamburguerMenu .menu a").forEach((link) => {
        link.addEventListener("click", () => {
            if (menuToggle) menuToggle.checked = false;
        });
    });

    const empresas = [
        { nome: "Empresa 1", area: "Engenharia Estrutural", logo: "./assets/imagens/tpf_logo.jpg" },
        { nome: "Empresa 2", area: "Construção Civil", logo: "./assets/imagens/tpf_logo.jpg" },
        { nome: "Empresa 3", area: "Saneamento", logo: "./assets/imagens/tpf_logo.jpg" },
        { nome: "Empresa 4", area: "Geotecnia", logo: "./assets/imagens/tpf_logo.jpg" },
        { nome: "Empresa 5", area: "Materiais", logo: "./assets/imagens/tpf_logo.jpg" },
        { nome: "Empresa 6", area: "Gestão de Obras", logo: "./assets/imagens/tpf_logo.jpg" },
        { nome: "Empresa 7", area: "Infraestrutura", logo: "./assets/imagens/tpf_logo.jpg" },
        { nome: "Empresa 8", area: "Tecnologia", logo: "./assets/imagens/tpf_logo.jpg" }
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