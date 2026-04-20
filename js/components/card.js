export function criarCartaoProjeto(proj, catId, subId) {
    const card = document.createElement('div');
    card.className = 'projeto-card';
    
    const url = subId ? `projeto.html?cat=${catId}&sub=${subId}&id=${proj.id}` : `projeto.html?cat=${catId}&id=${proj.id}`;

    card.innerHTML = `
        <h4>${proj.titulo}</h4>
        <p>${proj.resumo}</p>
        <a href="${url}" class="btn">Visualizar Projeto</a>
    `;
    
    return card;
}