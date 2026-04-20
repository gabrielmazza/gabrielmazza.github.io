import { fetchDados } from '../services/api.js';

export async function initProjeto() {
    const params = new URLSearchParams(window.location.search);
    const catId = params.get('cat');
    const subId = params.get('sub');
    const projId = params.get('id');

    if (!catId || !subId || !projId) return;

    const data = await fetchDados();
    if (!data) return;

    const categoria = data.categorias[catId];
    const subcategoria = categoria?.subcategorias[subId];
    const projeto = subcategoria?.projetos.find(p => p.id === projId);

    if (!projeto) {
        document.getElementById('projeto-titulo').innerText = "Projeto não encontrado";
        return;
    }

    document.title = `Projeto: ${projeto.titulo} - Gabriel Mazza`;
    document.getElementById('projeto-titulo').innerText = projeto.titulo;
    
    let conteudoHTML = '';
    
    if (projeto.desafio) {
        conteudoHTML += `<h3>O Desafio</h3><p>${projeto.desafio}</p>`;
    }
    
    if (projeto.solucao) {
        conteudoHTML += `<h3>A Solução</h3><p>${projeto.solucao}</p>`;
    }
    
    if (projeto.tecnologias && projeto.tecnologias.length > 0) {
        conteudoHTML += `<h3>Tecnologias Utilizadas</h3><ul>`;
        projeto.tecnologias.forEach(tech => {
            conteudoHTML += `<li>${tech}</li>`;
        });
        conteudoHTML += `</ul>`;
    }
    
    conteudoHTML += `
        <div style="margin-top: 2.5rem;">
            <a href="categoria.html?id=${catId}" class="btn" style="background-color: var(--secondary-color);">← Voltar para ${categoria.titulo}</a>
        </div>
    `;

    document.getElementById('projeto-conteudo').innerHTML = conteudoHTML;
}