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

function fecharPopup(){
    document.querySelector("#fundoPopup1").style.display = "none";
    document.querySelector("#fundoPopup2").style.display = "none";
}

function abrirInta(){
    fecharPopup();
    window.location.href = 'https://www.instagram.com/setecpoli/';
}


// LÓGICA DO CARÔMETRO:
// Caso for asicionar mais carômetros, 
//      criar um novo JSON em './dados' com nome de "equipe_setec_AnoVigente.json"
//      deixar a estrutura do JSON como está se não da problema


const containerAnos = document.querySelector(".containerAnos");
const listaCoordenacoes = document.querySelector(".cardCoordenacao");
const tituloCoordenacao = document.querySelector(".parteTexto h4");
const descricaoCoordenacao = document.querySelector(".parteTexto p");
const listaCoordenadores = document.querySelector(".cardImagensCoord");
const listaAnalistas = document.querySelector(".cardImagensAnalista");
const containerAnalistas = document.querySelector(".analistas"); 

const anosPossiveis = [
    2030, 
    2029, 
    2028, 
    2027, 
    2026, 
    2025, 
    2024, 
    2023
];
let anosDisponiveis = []; 

let dadosGestao = null;
let anoSelecionado = Number(localStorage.getItem("anoSelecionado"));
let coordenacaoSelecionada = localStorage.getItem("coordenacaoSelecionada") || "geral";

const nomesCoordenacoes = {
    geral: "Gerais",
    comercial: "Comercial",
    marketing: "Marketing",
    redesECultura: "Redes",
    infraestrutura: "Infraestrutura",
    financeiro: "Financeiro"
};

const iconesCoordenacoes = {
    geral: "./assets/Icons/iconGeral.png",
    comercial: "./assets/Icons/iconComercial.png",
    marketing: "./assets/Icons/iconMarketing.png",
    redesECultura: "./assets/Icons/iconRedes.png",
    infraestrutura: "./assets/Icons/iconInfraestrutura.png",
    financeiro: "./assets/Icons/iconFinanceiro.png"
};

async function inicializarSite() {
    for (let ano of anosPossiveis) {
        try {
            const resposta = await fetch(`./dados/equipe_setec_${ano}.json`);
            if (resposta.ok) {
                anosDisponiveis.push(ano); 
            }
        } catch (erro) {
            // Se der erro 404 (arquivo não existe), simplesmente ignora e pula pro próximo
        }
    }

    if (anosDisponiveis.length === 0) {
        if(tituloCoordenacao) tituloCoordenacao.textContent = "Nenhuma gestão encontrada";
        return;
    }

    if (!anoSelecionado || !anosDisponiveis.includes(anoSelecionado)) {
        anoSelecionado = anosDisponiveis[0]; 
        localStorage.setItem("anoSelecionado", anoSelecionado);
    }

    renderizarAnos();
    await carregarGestao();
}

function renderizarAnos() {
    containerAnos.innerHTML = ``;
    
    anosDisponiveis.forEach(ano => {
        const botao = document.createElement("button");
        botao.textContent = ano;
        botao.className = ano === anoSelecionado ? "ativo" : "desativo";

        botao.addEventListener("click", async () => {
            anoSelecionado = ano;
            localStorage.setItem("anoSelecionado", ano);
            
            document.querySelectorAll(".containerAnos button").forEach(b => {
                b.className = Number(b.textContent) === anoSelecionado ? "ativo" : "desativo";
            });
            
            await carregarGestao();
        });
        containerAnos.appendChild(botao);
    });
}

async function carregarGestao() {
    try {
        const resposta = await fetch(`./dados/equipe_setec_${anoSelecionado}.json`);
        dadosGestao = await resposta.json();

        const equipesConfig = obterConfiguracaoEquipes();
        const equipes = Object.keys(equipesConfig);

        if (!equipes.includes(coordenacaoSelecionada)) {
            coordenacaoSelecionada = equipes.includes("geral") ? "geral" : equipes[0];
            localStorage.setItem("coordenacaoSelecionada", coordenacaoSelecionada);
        }

        renderizarCoordenacoes();
        renderizarEquipe();

    } catch (erro) {
        console.error("Erro ao carregar a gestão:", erro);
    }
}

function obterConfiguracaoEquipes() {
    if (!dadosGestao) return {};
    const chaveGestao = `gestao${anoSelecionado}`;
    let config = dadosGestao[chaveGestao] ? dadosGestao[chaveGestao].equipe : dadosGestao.equipe;
    if (Array.isArray(config)) config = config[0];
    return config || {};
}

function renderizarCoordenacoes() {
    listaCoordenacoes.innerHTML = "";
    const equipes = obterConfiguracaoEquipes();

    Object.keys(equipes).forEach(chave => {
        const botao = document.createElement("button");
        botao.className = chave === coordenacaoSelecionada ? "ativo" : "desativo";

        const divIcone = document.createElement("div");
        const icone = document.createElement("img");
        icone.src = iconesCoordenacoes[chave] || "./assets/Icons/iconGeral.png";
        icone.alt = "";

        const nome = document.createElement("p");
        nome.textContent = nomesCoordenacoes[chave] || chave;

        const seta = document.createElement("img");
        seta.src = "./assets/Icons/seta.png";
        seta.alt = "";
        seta.className = "setaCard";

        divIcone.append(icone);
        botao.append(divIcone, nome, seta);

        botao.addEventListener("click", () => {
            coordenacaoSelecionada = chave;
            localStorage.setItem("coordenacaoSelecionada", chave);
            renderizarCoordenacoes();
            renderizarEquipe();
        });
        listaCoordenacoes.appendChild(botao);
    });
}

function criarCardPessoa(pessoa) {
    const card = document.createElement("button");
    card.className = "card";

    const divFoto = document.createElement("div");
    divFoto.className = "fotoPessoas";

    const imagem = document.createElement("img");
    imagem.src = pessoa.img || "./assets/imagens/foto-padrao.png";
    imagem.alt = pessoa.Nome;
    imagem.onerror = function() {
        this.onerror = null;
        this.src = "./assets/imagens/foto-padrao.png";
    };

    divFoto.appendChild(imagem);

    const divInfo = document.createElement("div");
    divInfo.className = "informacoes";

    const labelNome = document.createElement("label");
    labelNome.textContent = pessoa.Nome;

    divInfo.appendChild(labelNome);
    card.append(divFoto, divInfo);

    return card;
}

function renderizarEquipe() {
    const equipesConfig = obterConfiguracaoEquipes();
    const equipe = equipesConfig[coordenacaoSelecionada];

    if (!equipe) return;

    const nomeEquipe = nomesCoordenacoes[coordenacaoSelecionada] || coordenacaoSelecionada;

    if(tituloCoordenacao) {
        tituloCoordenacao.textContent = coordenacaoSelecionada === "geral"
            ? "Coordenação Geral"
            : `Coordenação ${nomeEquipe}`;
    }
    
    if(descricaoCoordenacao) {
        descricaoCoordenacao.textContent = `Equipe responsável pela coordenação de ${nomeEquipe} da SeTEC.`;
    }

    listaCoordenadores.innerHTML = "";
    listaAnalistas.innerHTML = "";

    const coordenadores = Object.values(equipe.coordenacao || {});
    coordenadores.forEach(pessoa => {
        listaCoordenadores.appendChild(criarCardPessoa(pessoa));
    });

    const analistas = Object.values(equipe.analistas || {});
    
    if (analistas.length === 0) {
        containerAnalistas.style.display = "none";
    } else {
        containerAnalistas.style.display = "";
        
        analistas.forEach(pessoa => {
            listaAnalistas.appendChild(criarCardPessoa(pessoa));
        });
    }
}

inicializarSite();