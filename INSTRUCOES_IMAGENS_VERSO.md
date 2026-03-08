# Como Adicionar Imagens de Frente e Verso aos Produtos

## 📸 Nova Funcionalidade: Visualização de Frente e Verso

A loja passou a suportar a visualização de duas imagens para cada produto - uma da **frente** e outra do **verso**. Quando um produto tem duas imagens, um botão "👁️ Ver Verso" aparece automaticamente, permitindo que o cliente alternar entre as duas visualizações.

---

## 🔧 Como Configurar

### Para adicionar imagem verso a um produto, você precisa:

1. **Ter ambas as imagens salvas na pasta `/img`**
   - Imagem da frente: ex. `blusa-social.jpg`
   - Imagem do verso: ex. `blusa-social-verso.jpg`

2. **Adicionar a propriedade `imagemVerso` ao produto** no arquivo HTML correspondente

### Exemplo de Configuração:

```javascript
{
    id: 1,
    nome: "Blusa Social",
    preco: "R$ 79,90",
    categoria: "blusa-social",
    imagem: "blusa-social.jpg",           // Imagem da FRENTE
    imagemVerso: "blusa-social-verso.jpg", // Imagem do VERSO
    descricao: "Blusa Social confeccionada em tecido leve e confortável..."
}
```

---

## 📝 Passos para Implementar:

### 1️⃣ Prepare as Imagens
- Guarde a foto da frente do produto como: `nome-do-produto.jpg`
- Guarde a foto do verso como: `nome-do-produto-verso.jpg`
- Salve ambas na pasta `/img`

### 2️⃣ Localize o Arquivo da Categoria
Entre em um dos arquivos HTML correspondente à categoria:
- `blusas.html`
- `bodys.html`
- `calcas.html`
- `conjuntos.html`
- `croppeds.html`
- `macaquinhos.html`
- `saias.html`
- `shorts.html`
- `vestidos.html`

### 3️⃣ Encontre o Array de Produtos
Procure pelo array `const produtos = [` dentro de cada arquivo

### 4️⃣ Adicione a Propriedade `imagemVerso`

**ANTES:**
```javascript
{
    id: 1,
    nome: "Blusa Social",
    preco: "R$ 79,90",
    categoria: "blusa-social",
    imagem: "blusa-social.jpg",
    descricao: "Blusa Social..."
}
```

**DEPOIS:**
```javascript
{
    id: 1,
    nome: "Blusa Social",
    preco: "R$ 79,90",
    categoria: "blusa-social",
    imagem: "blusa-social.jpg",
    imagemVerso: "blusa-social-verso.jpg",  // ← ADICIONE ESTA LINHA
    descricao: "Blusa Social..."
}
```

---

## 🎨 Como Funciona no Site

### Sem Imagem Verso:
- Apenas a imagem principal é exibida
- Nenhum botão adicional aparece

### Com Imagem Verso:
- Imagem principal (frente) é exibida por padrão
- Botão **"👁️ Ver Verso"** aparece no canto inferior direito
- Indicador **"Frente"** aparece no canto inferior esquerdo
- Clique no botão para alternar entre frente e verso
- O indicador muda para **"Verso"** automaticamente

---

## ✅ Exemplo Completo - Passo a Passo

### Cenário: Adicionar verso à "Blusa Social Amarela"

1. Tenho as imagens:
   - `blusa-social-amarela.jpeg` (frente) ✅
   - `blusa-social-amarela-verso.jpeg` (verso) ✅

2. Acesso o arquivo `blusas.html`

3. Encontro o produto:
   ```javascript
   {
       id: 2,
       nome: "Blusa Social",
       preco: "R$ 79,90",
       categoria: "blusa-social",
       imagem: "blusa-social-amarela.jpeg",
       descricao: "Blusa Social tamanho P..."
   }
   ```

4. Adiciono a propriedade:
   ```javascript
   {
       id: 2,
       nome: "Blusa Social",
       preco: "R$ 79,90",
       categoria: "blusa-social",
       imagem: "blusa-social-amarela.jpeg",
       imagemVerso: "blusa-social-amarela-verso.jpeg",  // ← ADICIONADO
       descricao: "Blusa Social tamanho P..."
   }
   ```

5. Pronto! Agora o cliente pode ver a frente e verso da blusa! 🎉

---

## ❓ Dúvidas Frequentes

**P: E se eu quiser adicionar verso para alguns produtos e não para outros?**
R: Sem problema! Você pode adicionar `imagemVerso` apenas para os produtos que tiverem a foto do verso. Os outros continuarão normalmente.

**P: Qual é o nome correto para o arquivo do verso?**
R: Você decide! Pode usar qualquer nome, desde que:
- A imagem exista na pasta `/img`
- O nome exato seja escrito na propriedade `imagemVerso`

**P: Posso usar formatos diferentes (JPEG, PNG)?**
R: Sim! Use a extensão correta no nome do arquivo conforme a imagem.

---

## 🚀 Páginas Atualizadas

Esta funcionalidade foi implementada em todas as páginas de categorias:
✅ blusas.html
✅ bodys.html
✅ calcas.html
✅ conjuntos.html
✅ croppeds.html
✅ macaquinhos.html
✅ saias.html
✅ shorts.html
✅ vestidos.html

---

## 📱 Visualização Responsiva

A funcionalidade funciona perfeitamente em:
- 💻 Computadores
- 📱 Celulares
- 📲 Tablets

O botão se adapta ao tamanho da tela automaticamente!

---

**Precisa de ajuda? Revise as instruções acima ou entre em contato para suporte! 😊**
