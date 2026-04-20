import { renderHeader, renderFooter } from './components/layout.js';
import { initCategoria } from './pages/categoria.js';
import { initProjeto } from './pages/projeto.js';

document.addEventListener('DOMContentLoaded', () => {
    // Renderiza Header e Footer globalmente, independente da página
    if(document.getElementById('header-component')) renderHeader();
    if(document.getElementById('footer-component')) renderFooter();

    // Roteador Básico: Define qual script rodar de acordo com o arquivo HTML
    const path = window.location.pathname;
    
    if (path.includes('categoria.html')) {
        initCategoria();
    } else if (path.includes('projeto.html')) {
        initProjeto();
    }
});