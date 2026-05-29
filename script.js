// Aguarda o carregamento completo da página
document.addEventListener("DOMContentLoaded", function() {
    
    // Configura o evento do botão de calcular
    const botaoCalcular = document.getElementById("btn-calcular");
    if (botaoCalcular) {
        botaoCalcular.addEventListener("click", calcularEconomia);
    }
});

function calcularEconomia() {
    // Captura o valor digitado pelo usuário
    const horasDigitadas = document.getElementById("horas-trabalho").value;
    const resultadoDiv = document.getElementById("resultado-calculo");

    // Validação simples para garantir que o usuário digitou um número válido
    if (horasDigitadas === "" || horasDigitadas <= 0) {
        resultadoDiv.style.display = "block";
        resultadoDiv.innerHTML = "<p style='color: #d32f2f;'>Por favor, insira um número válido de horas maior que zero.</p>";
        return;
    }

    const horas = parseFloat(horasDigitadas);

    /* MÉTRICAS BASEADAS EM DADOS DA AGRICULTURA DE PRECISÃO:
       - Um trator médio desregulado gasta cerca de 2 litros a mais de diesel por hora.
       - Preço estimado do Diesel B10: R$ 6,00 por litro.
       - Cada litro de diesel queimado emite aproximadamente 2,6 kg de CO2.
    */
    const litrosEconomizados = horas * 2;
    const dinheiroEconomizado = litrosEconomizados * 6;
    const co2Evitado = litrosEconomizados * 2.6;

    // Exibe os resultados na tela de forma bonita e formatada
    resultadoDiv.style.display = "block";
    resultadoDiv.innerHTML = `
        <h3>📊 Resultado da Otimização:</h3>
        <p>Ao manter o maquinário regulado e usando rotas inteligentes por <strong>${horas} horas</strong>, estimamos que sua propriedade irá:</p>
        
        <ul style="list-style: none; padding: 10px 0; text-align: left; max-width: 4