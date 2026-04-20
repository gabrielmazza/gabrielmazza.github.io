export function renderHeader() {
    const params = new URLSearchParams(window.location.search);
    const catId = params.get('id') || params.get('cat');

    const header = document.getElementById('header-component');
    
    header.innerHTML = `
        <header>
            <div class="container">
                <h1>Gabriel Mazza</h1>
                <nav id="nav-menu">
                    <a href="index.html" class="${(!catId && window.location.pathname.includes('index.html')) ? 'active' : ''}">Sobre Mim</a>
                    <a href="categoria.html?id=academicos" class="${(catId === 'academicos') ? 'active' : ''}">Projetos Acadêmicos</a>
                    <a href="categoria.html?id=profissionais" class="${(catId === 'profissionais') ? 'active' : ''}">Projetos Profissionais</a>
                </nav>
            </div>
        </header>
    `;
}

export function renderFooter() {
    const footer = document.getElementById('footer-component');
    footer.innerHTML = `
        <footer>
            <div class="container">
                <p>&copy; 2026 Gabriel Mazza. Todos os direitos reservados.</p>
            </div>
        </footer>
    `;
}