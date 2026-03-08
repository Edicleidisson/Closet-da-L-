// ============ CONFIGURAÇÃO DO CARRINHO ============
const WHATSAPP_NUMBER = "5521967109123"; // DDI + DDD + Numero
// Configurar seu endpoint Formspree: substitua YOUR_FORM_ID pelo seu ID do Formspree
const FORMSPREE_ENDPOINT = '5521967109123';
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Salvar carrinho no localStorage
function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarContadorCarrinho();
}

// Adicionar produto ao carrinho
function adicionarAoCarrinho(produto) {
    const itemExistente = carrinho.find(item => item.id === produto.id);
    
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: parseFloat(produto.preco.replace('R$ ', '').replace(',', '.')),
            imagem: produto.imagem || '',
            quantidade: 1
        });
    }
    
    salvarCarrinho();
    mostrarNotificacao('Produto adicionado ao carrinho! ✓');
}

// Comprar direto - adiciona ao carrinho e vai pro checkout
function comprarDireto(produto) {
    adicionarAoCarrinho(produto);
    setTimeout(() => {
        abrirCheckout();
        window.scrollTo(0, 0);
    }, 300);
}

// Remover produto do carrinho
function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    salvarCarrinho();
    renderizarCarrinho();
}

// Atualizar quantidade
function atualizarQuantidade(id, quantidade) {
    const item = carrinho.find(item => item.id === id);
    if (item) {
        item.quantidade = Math.max(1, quantidade);
        salvarCarrinho();
        renderizarCarrinho();
    }
}

// Atualizar contador do carrinho
function atualizarContadorCarrinho() {
    const contador = document.getElementById('carrinho-contador');
    if (contador) {
        const total = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
        contador.textContent = total;
        contador.style.display = total > 0 ? 'flex' : 'none';
    }
}

// Calcular total
function calcularTotal() {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
}

// Renderizar carrinho
function renderizarCarrinho() {
    const modal = document.getElementById('modalCarrinho');
    const container = document.getElementById('carrinho-itens');
    const totalElement = document.getElementById('carrinho-total');
    
    if (!container) return;
    
    if (carrinho.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">Seu carrinho está vazio</p>';
        if (totalElement) totalElement.textContent = 'R$ 0,00';
        return;
    }
    
    container.innerHTML = carrinho.map(item => `
        <div class="carrinho-item">
            <div class="item-info">
                <h4>${item.nome}</h4>
                <p class="item-preco">R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
            </div>
            <div class="item-controles">
                <button onclick="atualizarQuantidade(${item.id}, ${item.quantidade - 1})" class="btn-quantidade">-</button>
                <input type="number" value="${item.quantidade}" onchange="atualizarQuantidade(${item.id}, this.value)" min="1" class="input-quantidade">
                <button onclick="atualizarQuantidade(${item.id}, ${item.quantidade + 1})" class="btn-quantidade">+</button>
                <span class="item-subtotal">R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
                <button onclick="removerDoCarrinho(${item.id})" class="btn-remover">✕</button>
            </div>
        </div>
    `).join('');
    
    const total = calcularTotal();
    if (totalElement) {
        totalElement.innerHTML = `
            <div class="total-info">
                <p><strong>Subtotal:</strong> R$ ${total.toFixed(2).replace('.', ',')}</p>
                <p class="frete-info">+ Frete (a calcular)</p>
                <p class="total-final"><strong>Total:</strong> R$ ${total.toFixed(2).replace('.', ',')}</p>
            </div>
        `;
    }
}

// Abrir/fechar carrinho
function abrirCarrinho() {
    const modal = document.getElementById('modalCarrinho');
    if (modal) {
        modal.style.display = 'block';
        renderizarCarrinho();
    }
}

function fecharCarrinho() {
    const modal = document.getElementById('modalCarrinho');
    if (modal) modal.style.display = 'none';
}

// Abrir checkout
function abrirCheckout() {
    const modal = document.getElementById('modalCheckout');
    if (modal) {
        modal.style.display = 'block';
    }
}

function fecharCheckout() {
    const modal = document.getElementById('modalCheckout');
    if (modal) modal.style.display = 'none';
}

// Finalizar compra
function finalizarCompra(metodoPagamento, dadosCliente = {}) {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    const total = calcularTotal();
    const resumoProdutos = carrinho.map(item => 
        `• ${item.nome} (${item.quantidade}x) = R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}`
    ).join('%0A');
    
    let mensagem = `Olá! Gostaria de finalizar minha compra!%0A%0A`;
    
    // Adicionar dados do cliente se fornecidos
    if (dadosCliente.nome || dadosCliente.whatsapp || dadosCliente.endereco) {
        mensagem += `*DADOS DO CLIENTE*%0A`;
        if (dadosCliente.nome) mensagem += `📝 Nome: ${dadosCliente.nome}%0A`;
        if (dadosCliente.whatsapp) mensagem += `📱 WhatsApp: ${dadosCliente.whatsapp}%0A`;
        if (dadosCliente.endereco) mensagem += `📍 Endereço: ${dadosCliente.endereco}%0A`;
        mensagem += `%0A`;
    }
    
    mensagem += `*RESUMO DO PEDIDO*%0A${resumoProdutos}%0A%0A`;
    mensagem += `*TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*%0A`;
    mensagem += `*Forma de Pagamento: ${metodoPagamento}*%0A%0A`;
    mensagem += `Por favor, confirme meu pedido!`;
    
    const linkZap = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensagem}`;
    window.open(linkZap, '_blank');
    
    // Limpar carrinho após enviar
    setTimeout(() => {
        carrinho = [];
        salvarCarrinho();
        fecharCheckout();
        fecharCarrinho();
        mostrarNotificacao('Sua solicitação foi enviada! 🎉');
    }, 500);
}

// Mostrar notificação
function mostrarNotificacao(mensagem) {
    const notif = document.createElement('div');
    notif.className = 'notificacao';
    notif.textContent = mensagem;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notif.classList.remove('show');
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

function obterElementosImagemProduto(container) {
    if (!container) return null;

    const img = container.querySelector('img');
    if (!img) return null;

    const imagemFrente = img.dataset.frente || '';
    const imagemVerso = img.dataset.verso || '';

    if (!imagemFrente || !imagemVerso) return null;

    const indicador = container.querySelector('.produto-img-indicator');
    const botaoToggle = container.querySelector('.produto-img-toggle');

    return { img, imagemFrente, imagemVerso, indicador, botaoToggle };
}

function estaMostrandoVerso(img, imagemVerso) {
    if (!img || !imagemVerso) return false;
    return img.src.includes(imagemVerso);
}

function definirVisualImagem(container, mostrarVerso) {
    const elementos = obterElementosImagemProduto(container);
    if (!elementos) return;

    const { img, imagemFrente, imagemVerso, indicador, botaoToggle } = elementos;

    img.src = mostrarVerso ? `img/${imagemVerso}` : `img/${imagemFrente}`;

    if (indicador) {
        indicador.textContent = mostrarVerso ? 'Verso' : 'Frente';
    }

    if (botaoToggle) {
        botaoToggle.textContent = mostrarVerso ? '👁️ Ver Frente' : '👁️ Ver Verso';
    }
}

// Alternar entre imagem da frente e verso do produto (botão)
function alternarImagemProduto(elemento) {
    const container = elemento.closest('.produto-img-container');
    const elementos = obterElementosImagemProduto(container);
    if (!elementos) return;

    const { img, imagemVerso } = elementos;
    const mostrarVerso = !estaMostrandoVerso(img, imagemVerso);
    definirVisualImagem(container, mostrarVerso);
}

// Mostrar verso ao passar o mouse (preview)
function mostrarVersoHover(container) {
    const elementos = obterElementosImagemProduto(container);
    if (!elementos) return;

    const { img, imagemVerso } = elementos;
    container.dataset.estadoAntesHover = estaMostrandoVerso(img, imagemVerso) ? 'verso' : 'frente';
    definirVisualImagem(container, true);
}

// Restaurar estado anterior ao tirar o mouse
function restaurarFrenteHover(container) {
    const elementos = obterElementosImagemProduto(container);
    if (!elementos) return;

    const estadoAntesHover = container.dataset.estadoAntesHover || 'frente';
    definirVisualImagem(container, estadoAntesHover === 'verso');
    delete container.dataset.estadoAntesHover;
}

// Enviar dados do cliente para o Formspree (retorna uma Promise)
function enviarDadosFormspree(dados) {
    const formData = new FormData();
    formData.append('nome', dados.nome || '');
    formData.append('whatsapp', dados.whatsapp || '');
    formData.append('endereco', dados.endereco || '');
    formData.append('pedido', dados.pedido || '');
    formData.append('total', dados.total || '');

    return fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    }).then(response => {
        if (response.ok) return response.json();
        return response.json().then(err => Promise.reject(err));
    });
}

// Função original (mantida para compatibilidade)
function comprar(produto) {
    const mensagem = `Olá! Vi no site o produto *${produto}* e gostaria de encomendar.`;
    const linkZap = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
    window.open(linkZap, '_blank');
}

// Animação de revelação ao rolar a página
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            reveals[i].classList.add("active");
        }
    }
}

// Fechar modais ao clicar fora
window.onclick = function(event) {
    const modalCarrinho = document.getElementById('modalCarrinho');
    const modalCheckout = document.getElementById('modalCheckout');
    
    if (event.target == modalCarrinho) {
        fecharCarrinho();
    }
    if (event.target == modalCheckout) {
        fecharCheckout();
    }
}

// Inicializar
window.addEventListener("scroll", reveal);
window.addEventListener("load", function() {
    reveal();
    atualizarContadorCarrinho();
});