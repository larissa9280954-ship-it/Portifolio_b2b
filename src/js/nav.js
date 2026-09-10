// ===================================================
// MENU RESPONSIVO
// ===================================================

export function initMenuToggle() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Verifica se os elementos existem
    if (!menuToggle || !navMenu) {
        return;
    }

    // Abre e fecha o menu
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Atualiza a acessibilidade
        const isExpanded = navMenu.classList.contains('active');

        menuToggle.setAttribute(
            'aria-expanded',
            isExpanded
        );
    });

    // Fecha o menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}