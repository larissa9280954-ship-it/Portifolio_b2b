// ===================================================
// SCRIPT PRINCIPAL
// ===================================================

import { initMenuToggle } from './src/js/nav.js';
import { initTestimonials } from './src/js/testimonials.js';

// ===================================================
// INICIALIZA AS FUNCIONALIDADES
// ===================================================

document.addEventListener('DOMContentLoaded', () => {
    initMenuToggle();
    initTestimonials();
});