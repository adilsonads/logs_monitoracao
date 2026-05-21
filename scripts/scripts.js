/**
 * SISTEMA DE MONITORAÇÃO - COMPORTAMENTO (JS)
 * Focado em Vanilla JS moderno (ES6+) e semântica.
 */


// ==========================================
// 1. FUNÇÃO DE CÓPIA MODERNA
// ==========================================
// ==========================================
// 1. SISTEMA DE TOAST (Notificações)
// ==========================================
function mostrarToast(mensagem, tipo = 'success') {
    // Cria o container se não existir
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    // Cria o elemento do Toast
    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.innerText = mensagem;

    container.appendChild(toast);

    // Trigger para animação de entrada
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove o toast após 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// Atualize sua função de cópia para chamar o toast
async function copiarTexto(targetId) {
    const inputElement = document.getElementById(targetId);
    if (!inputElement) return;

    try {
        await navigator.clipboard.writeText(inputElement.value);
        mostrarToast("Copiado com sucesso!"); // <-- FEEDBACK VISUAL
    } catch (err) {
        inputElement.select();
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
        mostrarToast("Copiado via fallback!");
    }
}

// ==========================================
// 2. LÓGICA DO TEMA (Dark Mode)
// ==========================================
function inicializarTema() {
    const btnTema = document.getElementById('btn-tema');
    
    // Se a página atual não tiver o botão (ex: index.html antigo), para a função aqui para não dar erro
    if (!btnTema) return; 

    const body = document.body;

    // Verifica no navegador se o usuário já tinha deixado no modo escuro na última visita
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'dark') {
        body.classList.add('dark-mode');
        btnTema.innerText = '☀️';
    }

    // Ação de clique no botão
    btnTema.addEventListener('click', () => {
        body.classList.toggle('dark-mode'); // Adiciona ou remove a classe do CSS
        
        // Verifica se ficou escuro ou claro para mudar o ícone e salvar
        const modoEscuroAtivo = body.classList.contains('dark-mode');
        btnTema.innerText = modoEscuroAtivo ? '☀️' : '🌙';
        
        // Salva a preferência no navegador
        localStorage.setItem('tema', modoEscuroAtivo ? 'dark' : 'light');
    });
}

// ==========================================
// 2. FUNÇÃO DE JANELAS (Pop-ups)
// ==========================================
function abrirJanela(url) {
    const largura = 600;
    const altura = 400;
    window.open(url, '', `width=${largura},height=${altura},resizable=no`);
}

// ==========================================
// 3. RENDERIZAÇÃO DINÂMICA
// ==========================================
function renderizarTratativasClientes() {
    const sectionClientes = document.getElementById('tratativas-clientes');
    if (!sectionClientes) return; 

    let htmlGerado = '';

    for (const [id, texto] of Object.entries(mensagensDesconsiderar)) {
        htmlGerado += `
            <div class="item-copia">
                <input id="msg-cliente-${id}" type="text" value="${texto}" readonly>
                <button type="button" class="btn-copiar" data-target="msg-cliente-${id}">Copiar</button>
            </div>
        `;
    }
    sectionClientes.innerHTML = htmlGerado;
}

function renderizarTratativasCurtas() {
    const sectionTratativasCurtas = document.getElementById('tratativas-curtas');
    if (!sectionTratativasCurtas) return; 

    let htmlGerado = '';

    for (const [id, texto] of Object.entries(tratativasCurtas)) {
        // CORREÇÃO APLICADA: IDs alterados de msg-cliente para msg-curta
        htmlGerado += `
            <div class="item-copia">
                <input id="msg-curta-${id}" type="text" value="${texto}" readonly>
                <button type="button" class="btn-copiar" data-target="msg-curta-${id}">Copiar</button>
            </div>
        `;
    }
    sectionTratativasCurtas.innerHTML = htmlGerado;
}

// ==========================================
// 4. INICIALIZAÇÃO E EVENT LISTENERS GLOBAIS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Constrói os botões na página
    inicializarTema();
    renderizarTratativasClientes();
    renderizarTratativasCurtas();

    // 2. DELEGAÇÃO DE EVENTOS PARA OS BOTÕES DE CÓPIA
    document.addEventListener('click', (evento) => {
        if (evento.target.classList.contains('btn-copiar')) {
            const targetId = evento.target.getAttribute('data-target');
            if (targetId) {
                copiarTexto(targetId);
            }
        }
    });

    // 3. EVENTOS PARA ABRIR JANELAS 
    // (Mantido caso voltes a colocar os botões de abrir tratativas no ecrã principal)
    const btnCliente = document.getElementById('btn-janela-cliente');
    if (btnCliente) {
        btnCliente.addEventListener('click', () => abrirJanela('tratativasClientes.html'));
    }

    const btnTrack = document.getElementById('btn-janela-track');
    if (btnTrack) {
        btnTrack.addEventListener('click', () => abrirJanela('tratativasTrack.html'));
    }

});