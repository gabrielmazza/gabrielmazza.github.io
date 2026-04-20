export function renderHeader() {
    const params = new URLSearchParams(window.location.search);
    const catId = params.get('id') || params.get('cat');

    const header = document.getElementById('header-component');
    
    header.innerHTML = `
        <header class="site-header">
            <div class="inner">
                <a href="index.html" class="logo"><span class="gt">&gt;</span> gabrielmazza<span class="sl">/</span>dev</a>
                <nav class="site-nav">
                    <a href="index.html" class="${(!catId && window.location.pathname.includes('index.html')) ? 'active' : ''}">Início</a>
                    <a href="categoria.html?id=academicos" class="${(catId === 'academicos') ? 'active' : ''}">Acadêmicos</a>
                    <a href="categoria.html?id=profissionais" class="${(catId === 'profissionais') ? 'active' : ''}">Profissionais</a>
                </nav>
            </div>
        </header>
    `;
}

export function renderFooter() {
    const footer = document.getElementById('footer-component');
    const currentYear = new Date().getFullYear();
    footer.innerHTML = `
        <footer class="site-footer">
            <div class="inner">
                <span>© ${currentYear} — Gabriel Mazza</span>
                <span>Desenvolvedor Full-stack</span>
            </div>
        </footer>
    `;
}