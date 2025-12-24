function gerar() {
    //Pegar o valor digitado no input
    var textoDigitado = document.getElementById('texto').value;

    //Transformar pra maiúscula, minúscula e capitalize
    var upper = textoDigitado.toUpperCase();
    var lower = textoDigitado.toLowerCase();

    var capitalize = textoDigitado
        .toLowerCase()
        .split(' ')
        .map(function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');

    
    // Se clicar no botão Gerar mais de uma vez não vai gerar várias divResultado, vai servir pra não ficar acumulando.
    document.querySelectorAll('.boxes.segundo').forEach(function (el) { el.remove(); });

    //criar a div pro resultado
    var divResultado = document.createElement('div');
    divResultado.className = 'boxes segundo'

    //Inserir a transformação dos resultados da transformação de minúscula, maiúscula e capitalize
    divResultado.innerHTML = `
            <ul>
                <li>
                    <b>Maiúsculas:</b><br>
                    <span class="resultado" id="copia_Maiuscula">${upper}</span>
                    <button class="botao_copiar" type="button" onclick="CopyText('copia_Maiuscula')">Copiar</button>
                </li>
                <li>
                    <b>Minúsculas:</b><br>
                    <span class="resultado" id="copia_minuscula">${lower}</span>
                    <button class="botao_copiar" type="button" onclick="CopyText('copia_minuscula')">Copiar</button>
                </li>
                <li>
                    <b>Maiúsculas e minúsculas:</b><br>
                    <span class="resultado" id="copia_Capitalize">${capitalize}</span>
                    <button class="botao_copiar" type="button" onclick="CopyText('copia_Capitalize')">Copiar</button>
                </li>
            </ul>

    `
    // Inserir a div imediatamente após #principal
    var principal = document.getElementById('principal');
    principal.insertAdjacentElement('afterend', divResultado);

}


async function CopyText(id) {
    const el = document.getElementById(id);
    if (!el) {
        console.error('Elemento não encontrado:', id);
        return;
    }
    const texto = el.textContent || el.innerText || '';
    try {
        await navigator.clipboard.writeText(texto);
        console.log('Texto copiado com sucesso.');
    } catch (err) {
        console.error('Não foi possível copiar!', err);
        // Fallback simples (execCommand) caso necessário:
        try {
            const r = document.createRange();
            r.selectNode(el);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(r);
            document.execCommand('copy');
            sel.removeAllRanges();
            console.log('Texto copiado (fallback).');
        } catch (e2) {
            console.error('Fallback também falhou.', e2);
        }
    }
}
