// Aguarda o carregamento completo da página
document.addEventListener("DOMContentLoaded", function() {
    const botaoCalcular = document.getElementById("btn-calcular");
    if (botaoCalcular) {
        botaoCalcular.addEventListener("click", calcularEconomia);
    }

    const botaoIniciarJogo = document.getElementById("btn-iniciar-jogo");
    if (botaoIniciarJogo) {
        botaoIniciarJogo.addEventListener("click", iniciarJogoAmbiental);
    }

    const botaoSimularFazendeiro = document.getElementById("btn-simular-fazendeiro");
    if (botaoSimularFazendeiro) {
        botaoSimularFazendeiro.addEventListener("click", simularFazendeiro);
    }
});

const perguntasJogo = [
    {
        texto: "Qual prática reduz mais a emissão de CO₂ na lavoura?",
        opcoes: [
            "A) Aumentar a velocidade da colheita",
            "B) Usar fertilizantes sem critério",
            "C) Manter o maquinário regulado e fazer manutenção preventiva"
        ],
        certa: 2
    },
    {
        texto: "Qual ação ajuda a preservar solos e evitar erosão?",
        opcoes: [
            "A) Rodar o trator sempre na mesma faixa",
            "B) Fazer plantio direto e rotação de culturas",
            "C) Usar mais adubo químico"
        ],
        certa: 1
    },
    {
        texto: "Na agricultura de precisão, qual é o maior benefício?",
        opcoes: [
            "A) Aplicar insumos somente onde o solo precisa",
            "B) Aumentar o consumo de combustível",
            "C) Plantar em maiores quantidades sem análise"
        ],
        certa: 0
    }
];

let indiceAtual = 0;
let acertou = 0;

function iniciarJogoAmbiental() {
    indiceAtual = 0;
    acertou = 0;
    atualizarPergunta();
    document.getElementById("jogo-resultados").innerText = "";
}

function atualizarPergunta() {
    const perguntaElemento = document.getElementById("jogo-pergunta");
    const opcoesContainer = document.getElementById("jogo-opcoes");

    if (!perguntaElemento || !opcoesContainer) {
        return;
    }

    const perguntaAtual = perguntasJogo[indiceAtual];
    perguntaElemento.innerText = perguntaAtual.texto;
    opcoesContainer.innerHTML = "";

    perguntaAtual.opcoes.forEach((textoOpcao, index) => {
        const botaoOpcao = document.createElement("button");
        botaoOpcao.type = "button";
        botaoOpcao.innerText = textoOpcao;
        botaoOpcao.style.cssText = "flex: 1 1 100%; padding: 12px 14px; border-radius: 10px; border: 1px solid #cfd8dc; background: #fff; color: #1e4620; cursor: pointer; text-align: left;";
        botaoOpcao.addEventListener("click", function() {
            verificarResposta(index);
        });
        opcoesContainer.appendChild(botaoOpcao);
    });
}

function verificarResposta(indiceEscolhido) {
    const resultadoElemento = document.getElementById("jogo-resultados");
    const perguntaAtual = perguntasJogo[indiceAtual];
    if (!resultadoElemento || !perguntaAtual) {
        return;
    }

    if (indiceEscolhido === perguntaAtual.certa) {
        acertou += 1;
        resultadoElemento.innerText = "Resposta correta!";
        resultadoElemento.style.color = "#2e7d32";
    } else {
        resultadoElemento.innerText = "Resposta incorreta. Tente a próxima!";
        resultadoElemento.style.color = "#d32f2f";
    }

    indiceAtual += 1;
    if (indiceAtual < perguntasJogo.length) {
        setTimeout(atualizarPergunta, 900);
    } else {
        setTimeout(finalizarJogo, 900);
    }
}

function finalizarJogo() {
    const resultadoElemento = document.getElementById("jogo-resultados");
    if (!resultadoElemento) {
        return;
    }
    resultadoElemento.style.color = "#1e4620";
    resultadoElemento.innerText = `Jogo finalizado! Você acertou ${acertou} de ${perguntasJogo.length}. Parabéns por aprender mais sobre sustentabilidade.`;
}

function simularFazendeiro() {
    const escolha = document.querySelector('input[name="fazendeiro-acao"]:checked');
    const resultadoSimulacao = document.getElementById("resultado-simulacao");

    if (!escolha || !resultadoSimulacao) {
        return;
    }

    const opcoes = {
        tecnologia: {
            titulo: "Decisão sustentável",
            texto: "O fazendeiro adotou tecnologias de precisão e manutenção correta. Isso reduz emissões, economiza diesel e protege o solo.",
            cor: "#2e7d32"
        },
        conservador: {
            titulo: "Decisão com risco ambiental",
            texto: "O uso excessivo de irrigação e insumos sem análise aumenta custos, contamina o solo e eleva a emissão de CO₂.",
            cor: "#d32f2f"
        },
        balanceado: {
            titulo: "Decisão equilibrada",
            texto: "A gestão moderada traz estabilidade: menor desperdício do que a opção conservadora, mas ainda há espaço para melhorias técnicas.",
            cor: "#f57c00"
        }
    };

    const resultado = opcoes[escolha.value];
    resultadoSimulacao.style.display = "block";
    resultadoSimulacao.style.color = resultado.cor;
    resultadoSimulacao.style.background = "#fff";
    resultadoSimulacao.style.padding = "18px";
    resultadoSimulacao.style.borderRadius = "12px";
    resultadoSimulacao.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.08)";
    resultadoSimulacao.innerHTML = `
        <h3 style="margin-top: 0; color: ${resultado.cor};">${resultado.titulo}</h3>
        <p style="margin: 0; color: #333;">${resultado.texto}</p>
    `;
}

function calcularEconomia() {
    const horasInput = document.getElementById("horas-trabalho");
    const resultadoDiv = document.getElementById("resultado-calculo");

    if (!horasInput || !resultadoDiv) {
        return;
    }

    const horasDigitadas = horasInput.value.trim().replace(",", ".");
    const horas = parseFloat(horasDigitadas);

    if (isNaN(horas) || horas <= 0) {
        resultadoDiv.style.display = "block";
        resultadoDiv.innerHTML = "<p style='color: #d32f2f;'>Por favor, insira um número válido de horas maior que zero.</p>";
        return;
    }

    /* MÉTRICAS BASEADAS EM DADOS DA AGRICULTURA DE PRECISÃO:
       - Um trator médio desregulado gasta cerca de 2 litros a mais de diesel por hora.
       - Preço estimado do Diesel B10: R$ 6,00 por litro.
       - Cada litro de diesel queimado emite aproximadamente 2,6 kg de CO2.
    */
    const litrosEconomizados = horas * 2;
    const dinheiroEconomizado = litrosEconomizados * 6;
    const co2Evitado = litrosEconomizados * 2.6;

    resultadoDiv.style.display = "block";
    resultadoDiv.style.minHeight = "120px";
    resultadoDiv.innerHTML = `
        <div style="background: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);">
            <h3 style="margin-top: 0; color: #1e4620;">📊 Resultado da Otimização</h3>
            <p>Com <strong>${horas.toFixed(1)} horas</strong> de operação em maquinário regulado, sua fazenda pode alcançar:</p>
            <ul style="list-style: none; padding: 0; margin: 16px 0; color: #333;">
                <li style="margin-bottom: 10px;">• <strong>${litrosEconomizados.toFixed(1)} litros</strong> de diesel economizados</li>
                <li style="margin-bottom: 10px;">• Cerca de <strong>R$ ${dinheiroEconomizado.toFixed(2)}</strong> de redução de custos</li>
                <li style="margin-bottom: 10px;">• Aproximadamente <strong>${co2Evitado.toFixed(1)} kg</strong> de CO₂ evitados</li>
            </ul>
            <p style="margin: 0; color: #2e7d32; font-weight: 600;">Impacto ambiental menor e mais eficiência para a produção.</p>
        </div>
    `;
}
