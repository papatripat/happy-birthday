// ===== SHARED NAVIGATION =====
function createNavigation(activePage) {
    const pages = [
        { name: 'Home', href: 'index.html', icon: '🏠' },
        { name: 'Gallery', href: 'gallery.html', icon: '📸' },
        { name: 'Wishes', href: 'wishes.html', icon: '💌' },
        { name: 'Games', href: 'games.html', icon: '🎮' },
        { name: 'Cake', href: 'cake.html', icon: '🎂' }
    ];

    const nav = document.createElement('nav');
    nav.className = 'navbar';
    nav.innerHTML = `
    <div class="navbar-inner">
      <a href="index.html" class="navbar-logo">✨ HBD ✨</a>
      <ul class="navbar-links" id="navLinks">
        ${pages.map(p => `
          <li><a href="${p.href}" class="${p.href === activePage ? 'active' : ''}">
            <span>${p.icon}</span> ${p.name}
          </a></li>
        `).join('')}
      </ul>
      <div class="hamburger" id="hamburger" onclick="toggleMobileMenu()">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;

    document.body.prepend(nav);
}

function toggleMobileMenu() {
    const links = document.getElementById('navLinks');
    links.classList.toggle('open');
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const links = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    if (links && !links.contains(e.target) && !hamburger.contains(e.target)) {
        links.classList.remove('open');
    }
});

// ===== FLOATING PARTICLES =====
function createParticles() {
    const container = document.createElement('div');
    container.className = 'particles-container';
    document.body.appendChild(container);

    const emojis = ['💖', '✨', '🎀', '💕', '🌸', '🎈', '⭐', '💫', '🦋', '🌷'];

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (8 + Math.random() * 12) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';
            particle.style.fontSize = (0.8 + Math.random() * 1) + 'rem';
            container.appendChild(particle);
        }, i * 300);
    }
}

// ===== CONFETTI BURST =====
function createConfetti(count = 50) {
    const colors = ['#f472b6', '#fcd34d', '#a78bfa', '#fb923c', '#34d399', '#f87171', '#60a5fa'];

    for (let i = 0; i < count; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.width = (5 + Math.random() * 10) + 'px';
        piece.style.height = (5 + Math.random() * 10) + 'px';
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        piece.style.animationDuration = (2 + Math.random() * 3) + 's';
        piece.style.animationDelay = (Math.random() * 2) + 's';
        document.body.appendChild(piece);

        setTimeout(() => piece.remove(), 5000);
    }
}

// ===== GAME COMPLETE MODAL =====
function showGameCompleteModal(gameType, score) {
    const messages = {
        balloons: {
            emoji: '🎈🎉',
            title: 'Selamat Ulang Tahun!',
            message: 'Seperti balon-balon yang melayang tinggi, semoga impianmu juga terbang tinggi di tahun yang baru ini! Semoga setiap hari dipenuhi kebahagiaan dan tawa. 💖',
        },
        memory: {
            emoji: '🃏💝',
            title: 'Happy Birthday, Cantik!',
            message: 'Seperti kamu yang berhasil mencocokkan semua kartu, semoga kamu selalu menemukan kecocokan dalam setiap langkah hidupmu. Tetap bersinar dan menginspirasi! ✨',
        },
        gifts: {
            emoji: '🎁🌟',
            title: 'Selamat Hari Istimewamu!',
            message: 'Kamu berhasil menangkap semua hadiah! Semoga di tahun ini kamu juga menangkap semua kesempatan dan keberuntungan. Kamu layak mendapatkan yang terbaik! 🌸',
        }
    };

    const msg = messages[gameType] || messages.balloons;

    // Remove existing modal
    const existing = document.querySelector('.game-complete-modal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay active game-complete-modal';
    overlay.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
      <div class="game-complete-emoji">${msg.emoji}</div>
      <h2 class="game-complete-title">${msg.title}</h2>
      <p class="game-complete-message">${msg.message}</p>
      ${score !== undefined ? `<p class="game-complete-score">🏆 Skor kamu: ${score}</p>` : ''}
      <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove()">
        Terima Kasih! 💕
      </button>
    </div>
  `;

    document.body.appendChild(overlay);
    createConfetti(80);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });
}

// ===== PAGE INIT =====
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
});
