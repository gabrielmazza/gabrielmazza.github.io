export function criarCartaoProjeto(proj, catId, subId, index = 0) {
    const card = document.createElement('a');
    card.className = 'brutal-box project-card';
    
    // Configura o link
    const url = subId ? `projeto.html?cat=${catId}&sub=${subId}&id=${proj.id}` : `projeto.html?cat=${catId}&id=${proj.id}`;
    card.href = url;

    const escapeHTML = (s = "") =>
        String(s).replace(/[&<>"']/g, (c) => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
        }[c]));

    // Dados auxiliares para design editorial
    const num = String(index + 1).padStart(2, "0");
    const ano = escapeHTML(proj.ano || "2024");
    const titulo = escapeHTML(proj.titulo || "");
    const resumo = escapeHTML(proj.resumo || "");
    const tecnologias = proj.tecnologias || [];

    const tagsHTML = tecnologias
        .map((t, ti) => {
            const cls = ti % 3 === 1 ? "chip chip-accent" : ti % 3 === 2 ? "chip chip-highlight" : "chip";
            return `<span class="${cls}">${escapeHTML(t)}</span>`;
        })
        .join("");

    card.innerHTML = `
        <div class="meta">
            <span class="num">${num}</span>
            <span class="year">${ano}</span>
        </div>
        <h3>${titulo}</h3>
        <p class="desc">${resumo}</p>
        <div class="tags">${tagsHTML}</div>
        <span class="read-more">Ler mais →</span>
    `;
    
    return card;
}