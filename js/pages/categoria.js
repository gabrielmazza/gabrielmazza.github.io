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
    document.getElementById('categoria-titulo').innerText = categoria.titulo;
    document.getElementById('categoria-descricao').innerText = categoria.descricao;

    const container = document.getElementById('projetos-container');
    container.innerHTML = ''; 

    for (const subId in categoria.subcategorias) {
        const subcategoria = categoria.subcategorias[subId];

        const subDiv = document.createElement('div');
        subDiv.className = 'sub-categoria';
        
        const subTitulo = document.createElement('h3');
        subTitulo.innerText = subcategoria.titulo;
        subDiv.appendChild(subTitulo);

        const grid = document.createElement('div');
        grid.className = 'projetos-grid';

        subcategoria.projetos.forEach(proj => {
            const card = criarCartaoProjeto(proj, catId, subId);
            grid.appendChild(card);
        });

        subDiv.appendChild(grid);
        container.appendChild(subDiv);
    }
}