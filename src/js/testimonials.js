// ===================================================
// TESTIMONIALS - API FETCH & CARROSSEL
// ===================================================

const avatarImages = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
];

// ===================================================
// FUNÇÃO PRINCIPAL
// ===================================================

export async function initTestimonials() {
    const cardsContainer = document.getElementById('testimonials-cards');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Verifica se o carrossel existe
    if (!cardsContainer) {
        return;
    }

    // Busca os dados da API
    await loadTestimonials(cardsContainer);

    // Botão próximo
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            cardsContainer.scrollBy({
                left: 340,
                behavior: 'smooth'
            });
        });
    }

    // Botão anterior
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            cardsContainer.scrollBy({
                left: -340,
                behavior: 'smooth'
            });
        });
    }
}

// ===================================================
// CARREGA OS DEPOIMENTOS DA API
// ===================================================

async function loadTestimonials(cardsContainer) {
    try {
        const response = await fetch(
            'https://jsonplaceholder.typicode.com/users'
        );

        if (!response.ok) {
            throw new Error('Erro ao carregar os dados');
        }

        const users = await response.json();

        // Pega apenas os cinco primeiros usuários
        const firstFiveUsers = users.slice(0, 5);

        // Limpa os cards antigos
        cardsContainer.innerHTML = '';

        // Cria os novos cards
        firstFiveUsers.forEach((user, index) => {
            const cardHTML = createCardHTML(user, index);

            cardsContainer.insertAdjacentHTML(
                'beforeend',
                cardHTML
            );
        });

        // Inicializa o carrossel
        initCarouselFocus(cardsContainer);

    } catch (error) {
        console.error(
            'Erro na seção de depoimentos:',
            error
        );
    }
}

// ===================================================
// CRIA O HTML DE CADA CARD
// ===================================================

function createCardHTML(user, index) {
    const avatarUrl =
        avatarImages[index] ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`;

    return `
        <article class="testimonial-card">

            <div class="card-company">
                <span class="company-name">
                    ${user.company.name}
                </span>
            </div>

            <p class="card-text">
                "${user.company.catchPhrase}. ${user.company.bs}."
            </p>

            <div class="card-author">

                <img
                    src="${avatarUrl}"
                    alt="Foto de ${user.name}"
                    class="author-avatar"
                    loading="lazy"
                />

                <div class="author-info">
                    <h4 class="author-name">
                        ${user.name}
                    </h4>

                    <span class="author-role">
                        Co-founder / ${user.address.city}
                    </span>
                </div>

            </div>

        </article>
    `;
}

// ===================================================
// ATUALIZA O CARD ATIVO
// ===================================================

function updateActiveCard(cardsContainer) {
    const cards = cardsContainer.querySelectorAll(
        '.testimonial-card'
    );

    const containerBox =
        cardsContainer.getBoundingClientRect();

    const containerCenter =
        containerBox.left +
        cardsContainer.offsetWidth / 2;

    let closestCard = null;
    let minDistance = Infinity;

    cards.forEach((card) => {
        const cardBox = card.getBoundingClientRect();

        const cardCenter =
            cardBox.left + cardBox.width / 2;

        const distance = Math.abs(
            containerCenter - cardCenter
        );

        if (distance < minDistance) {
            minDistance = distance;
            closestCard = card;
        }
    });

    // Remove o active de todos os cards
    cards.forEach((card) => {
        card.classList.remove('active');
    });

    // Adiciona active ao card mais próximo do centro
    if (closestCard) {
        closestCard.classList.add('active');
    }
}

// ===================================================
// INICIA O CARROSSEL
// ===================================================

function initCarouselFocus(cardsContainer) {
    const cards = cardsContainer.querySelectorAll(
        '.testimonial-card'
    );

    // Centraliza inicialmente o terceiro card
    if (cards.length >= 3) {
        const targetCard = cards[2];

        const containerWidth =
            cardsContainer.offsetWidth;

        const cardOffsetLeft =
            targetCard.offsetLeft;

        const cardWidth =
            targetCard.offsetWidth;

        cardsContainer.scrollLeft =
            cardOffsetLeft -
            (containerWidth / 2) +
            (cardWidth / 2);
    }

    // Define o card ativo inicialmente
    updateActiveCard(cardsContainer);

    // Atualiza o card ativo durante a rolagem
    cardsContainer.addEventListener(
        'scroll',
        () => updateActiveCard(cardsContainer)
    );
}