import { fetchDados } from '../services/api.js';

export async function initHome() {
    const data = await fetchDados();
    if (!data) return;

    const countEl = document.getElementById('home-categories-count');
    const gridEl = document.getElementById('home-categories-grid');

    if (!gridEl) return;

    const categoriasKeys = Object.keys(data.categorias);
    
    if (countEl) {
        const count = String(categoriasKeys.length).padStart(2, '0');
        countEl.innerText = `${count} categorias`;
    }

    gridEl.innerHTML = '';

    const escapeHTML = (s = "") =>
        String(s).replace(/[&<>"']/g, (c) => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
        }[c]));

    categoriasKeys.forEach((catId, index) => {
        const cat = data.categorias[catId];
        const num = String(index + 1).padStart(2, '0');
        
        // No design do template de exemplo o segundo card era acentuado. Vamos recriar essa lógica intercortada.
        const isAccent = index % 2 !== 0;
        const boxClass = isAccent ? 'brutal-box brutal-accent p-8' : 'brutal-box p-8';
        const textClass = isAccent ? 'text-accent' : 'text-primary';

        gridEl.innerHTML += `
            <a href="categoria.html?id=${catId}" class="${boxClass}">
                <span class="font-mono uppercase ${textClass}">${num} / Categoria</span>
                <h3 class="font-serif" style="font-size:2.25rem;margin-top:1rem;">${escapeHTML(cat.titulo)}</h3>
                <p class="text-muted mt-3" style="font-size:.875rem">
                    ${escapeHTML(cat.descricao)}
                </p>
                <span class="font-mono uppercase mt-6" style="display:inline-block">Ver categoria →</span>
            </a>
        `;
    });
}