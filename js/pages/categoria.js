import { fetchDados } from '../services/api.js';
import { criarCartaoProjeto } from '../components/card.js';

export async function initCategoria() {
    const params = new URLSearchParams(window.location.search);
    const catId = params.get('id');

    if (!catId) return;

    const data = await fetchDados();
    if (!data) return;

    const categoria = data.categorias[catId];

    if (!categoria) {
        document.getElementById('categoria-titulo').innerText = "Categoria não encontrada";
        document.getElementById('categoria-descricao').innerText = "Verifique a URL.";
        return;
    }

    document.title = `${categoria.titulo} - Gabriel Mazza`;
    
    // Breadcrumbs e Back Link
    const breadcrumbsEl = document.getElementById('breadcrumbs');
    if (breadcrumbsEl) {
        breadcrumbsEl.innerHTML = `
            <ol>
                <li><a href="index.html">Início</a></li>
                <li class="sep" aria-hidden>/</li>
                <li class="current">${categoria.titulo}</li>
            </ol>
        `;
    }

    const backTopEl = document.getElementById('back-top');
    if (backTopEl) {
        backTopEl.innerHTML = `
            <a href="index.html" class="back-link">
                <span aria-hidden>←</span> Voltar ao início
            </a>
        `;
    }

    // Textos do header da categoria com estilo brutalista/editorial
    document.getElementById('categoria-titulo').innerText = categoria.titulo;
    document.getElementById('categoria-descricao').innerText = categoria.descricao;
    
    // Configurar o subtítulo/kicker text ("Categoria ID")
    const kickerEl = document.getElementById('categoria-kicker');
    if (kickerEl) {
        kickerEl.innerText = catId.replace("-", " ").toUpperCase();
    }

    const container = document.getElementById('projetos-container');
    container.innerHTML = ''; 

    for (const subId in categoria.subcategorias) {
        const subcategoria = categoria.subcategorias[subId];

        const subDiv = document.createElement('div');
        subDiv.className = 'sub-categoria';
        
        // Estilizando o título da subcategoria para casar com o design brutalista
        const subTitulo = document.createElement('h3');
        subTitulo.innerText = `// ${subcategoria.titulo}`;
        subTitulo.className = 'font-mono uppercase text-primary';
        subTitulo.style.fontSize = '.875rem';
        subTitulo.style.letterSpacing = '1px';
        subTitulo.style.margin = '2.5rem 0 1.5rem 0';
        subDiv.appendChild(subTitulo);

        const grid = document.createElement('div');
        // Usa a classe cards-grid do novo template em vez da antiga projetos-grid
        grid.className = 'cards-grid three';

        subcategoria.projetos.forEach((proj, index) => {
            const card = criarCartaoProjeto(proj, catId, subId, index);
            grid.appendChild(card);
        });

        subDiv.appendChild(grid);
        container.appendChild(subDiv);
    }
}