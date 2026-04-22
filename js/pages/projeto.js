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

    document.title = `${projeto.titulo} — Gabriel Mazza`;
    
    // Configura os breadcrumbs (navegação textual do site do modelo)
    const breadcrumbsEl = document.getElementById('breadcrumbs');
    if (breadcrumbsEl) {
        breadcrumbsEl.innerHTML = `
            <ol>
                <li><a href="index.html">Início</a></li>
                <li class="sep" aria-hidden>/</li>
                <li><a href="categoria.html?id=${catId}">${categoria.titulo}</a></li>
                <li class="sep" aria-hidden>/</li>
                <li class="current">${projeto.titulo}</li>
            </ol>
        `;
    }

    // Configura botão de voltar do topo
    const backTopEl = document.getElementById('back-top');
    const backHTML = `<a href="categoria.html?id=${catId}" class="back-link"><span aria-hidden>←</span> Voltar para ${categoria.titulo}</a>`;
    if (backTopEl) {
        backTopEl.innerHTML = backHTML;
    }

    const escapeHTML = (s = "") =>
        String(s).replace(/[&<>"']/g, (c) => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
        }[c]));

    // Renderiza a estrutura exata do novo layout projetomodelo.js
    const titleBlock = document.getElementById('title-block');
    if (titleBlock) {
        const ano = projeto.ano || "2024"; // Fallback se não existir no data.json
        const resumo = projeto.resumo || "";
        const tecnologias = projeto.tecnologias || [];
        const linksHTML = projeto.links && projeto.links.length
            ? `<div>
                <h4>Links</h4>
                <ul>
                ${projeto.links.map(l => `<li><a href="${escapeHTML(l.url)}">${escapeHTML(l.label)} ↗</a></li>`).join("")}
                </ul>
            </div>`
            : "";

        let extraContent = '';
        if (projeto.desafio || projeto.solucao) {
            extraContent += `<div class="mt-12 text-primary">`;
            if (projeto.desafio) {
                extraContent += `<h3 class="font-mono uppercase mt-8" style="font-size:.875rem;letter-spacing:1px;margin-bottom:1rem;">// O Desafio</h3>
                <p style="font-size:1rem;line-height:1.7;margin-bottom:2rem;">${projeto.desafio}</p>`;
            }
            if (projeto.solucao) {
                extraContent += `<h3 class="font-mono uppercase mt-8" style="font-size:.875rem;letter-spacing:1px;margin-bottom:1rem;">// A Solução</h3>
                <p style="font-size:1rem;line-height:1.7;margin-bottom:2rem;">${projeto.solucao}</p>`;
            }
            extraContent += `</div>`;
        }

        // Lógica de Imagem Única vs Carrossel
        const arrayImagensRaw = projeto.imagens || (projeto.imagem ? [projeto.imagem] : []);
        // Normaliza itens da array para suportarem formato object {url, legenda} ou a antiga string
        const arrayImagens = arrayImagensRaw.map(img => typeof img === 'string' ? { url: img, legenda: '' } : img);

        let imagemContent = '';

        if (arrayImagens.length > 1) {
            // Carrossel com botões estilo brutal
            const slidesStr = arrayImagens.map((img, i) => {
                const legendHtml = img.legenda ? `<figcaption class="font-mono text-muted mt-3" style="font-size: 0.875rem;">${escapeHTML(img.legenda)}</figcaption>` : '';
                return `
                <figure style="flex: 0 0 100%; margin: 0; display: flex; flex-direction: column; scroll-snap-align: start;">
                    <div class="brutal-box" style="padding: 0; overflow: hidden; margin: 0;">
                        <img src="${escapeHTML(img.url)}" alt="${img.legenda ? escapeHTML(img.legenda) : 'Slide ' + (i+1)}" style="width: 100%; height: auto; display: block; object-fit: cover;" />
                    </div>
                    ${legendHtml}
                </figure>
                `;
            }).join('');

            imagemContent = `
                <div class="mt-16" style="position: relative; overflow: hidden;">
                    <style>
                        .carousel-track::-webkit-scrollbar { display: none; }
                        .carousel-track { -ms-overflow-style: none; scrollbar-width: none; }
                    </style>
                    <div id="carousel-${projeto.id}" class="carousel-track" style="display: flex; align-items: flex-start; overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth;">
                        ${slidesStr}
                    </div>
                    <button id="btn-prev-${projeto.id}" style="position: absolute; top: calc(50% - 2.5rem); left: 1rem; transform: translateY(-50%); background: #111; color: #fff; border: 2px solid #fff; padding: 0.5rem 1rem; cursor: pointer; font-family: monospace; font-weight: bold; font-size: 1.25rem; z-index: 10;" aria-label="Imagem anterior">←</button>
                    <button id="btn-next-${projeto.id}" style="position: absolute; top: calc(50% - 2.5rem); right: 1rem; transform: translateY(-50%); background: #111; color: #fff; border: 2px solid #fff; padding: 0.5rem 1rem; cursor: pointer; font-family: monospace; font-weight: bold; font-size: 1.25rem; z-index: 10;" aria-label="Próxima imagem">→</button>
                </div>
            `;
        } else if (arrayImagens.length === 1) {
            // Imagem Única
            const legendHtml = arrayImagens[0].legenda ? `<figcaption class="font-mono text-muted mt-3" style="font-size: 0.875rem;">${escapeHTML(arrayImagens[0].legenda)}</figcaption>` : '';
            imagemContent = `
                <figure class="mt-16" style="margin: 0; padding: 0; display: flex; flex-direction: column;">
                    <div class="brutal-box" style="padding: 0; margin-inline: 0; overflow: hidden;">
                        <img src="${escapeHTML(arrayImagens[0].url)}" alt="${arrayImagens[0].legenda ? escapeHTML(arrayImagens[0].legenda) : 'Imagem do projeto ' + escapeHTML(projeto.titulo)}" style="width: 100%; height: auto; display: block; object-fit: cover;" />
                    </div>
                    ${legendHtml}
                </figure>
            `;
        } else {
            // Placeholder Vazio
            imagemContent = ``;
        }

        titleBlock.innerHTML = `
            <div class="meta-row">
                <span>Projeto</span>
                <span>${escapeHTML(ano)}</span>
            </div>
            
            <h1>${escapeHTML(projeto.titulo)}</h1>
            
            <div class="editorial-rule mt-10" style="padding-top:2rem;">
                <p class="lede">${escapeHTML(resumo)}</p>
            </div>
            
            <div class="info-grid">
                <div>
                    <h4>Stack</h4>
                    <ul>${tecnologias.map(t => `<li>${escapeHTML(t)}</li>`).join("")}</ul>
                </div>
                ${linksHTML}
            </div>

            ${extraContent}

            ${imagemContent}
            
            <div class="nav-row" style="margin-top:4rem;">
                ${backHTML}
                <a class="right" href="index.html">Ir ao início →</a>
            </div>
        `;

        // Eventos para o carrossel dar a volta (loop infinito)
        if (arrayImagens.length > 1) {
            const track = document.getElementById(`carousel-${projeto.id}`);
            const btnPrev = document.getElementById(`btn-prev-${projeto.id}`);
            const btnNext = document.getElementById(`btn-next-${projeto.id}`);
            
            if (track && btnPrev && btnNext) {
                btnPrev.addEventListener('click', () => {
                    // Se estiver no começo (com margem de erro de 10px), rola pro fim
                    if (track.scrollLeft <= 10) {
                        track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
                    } else {
                        track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
                    }
                });
                
                btnNext.addEventListener('click', () => {
                    // Se estiver no fim (com margem de erro), rola pro começo
                    if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 10) {
                        track.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
                    }
                });
            }
        }
    }
}