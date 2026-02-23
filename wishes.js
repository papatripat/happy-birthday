// ===== WISHES DATA =====
const wishes = [
  {
    emoji: '💖',
    title: 'Hari Ini Tentang Kamu',
    message: 'Happy birthday Vaniaa! 🎉 Hari ini spesial banget, karena dunia lagi ngerayain seseorang yang luar biasa. Di umur yang baru ini, semoga langkah pertama kamu dimulai dengan senyum dan hati yang penuh harapan.',
    author: '— 💕'
  },
  {
    emoji: '🌟',
    title: 'Cahaya yang Kamu Punya',
    message: 'Dan seperti biasa, kamu tetap jadi bintang yang bersinar dengan caramu sendiri. ✨ Kamu mungkin nggak selalu sadar, tapi kehadiran kamu itu bikin banyak hal jadi lebih hangat dan berarti.',
    author: '— ✨'
  },
  {
    emoji: '🌸',
    title: 'Tentang Perjalanan',
    message: 'Di perjalanan umur yang baru ini, mungkin nggak semuanya akan mudah. Tapi semoga setiap proses bikin kamu makin kuat, makin dewasa, dan makin ngerti betapa berharganya diri kamu.',
    author: '— 🌷'
  },
  {
    emoji: '🎁',
    title: 'Orang-Orang di Sekitarmu',
    message: 'Semoga kamu selalu dikelilingi orang-orang yang tulus, yang dukung kamu tanpa banyak syarat. Karena kamu pantas dapet cinta dan perhatian yang setara dengan apa yang kamu kasih ke orang lain.',
    author: '— 💫'
  },
  {
    emoji: '🦋',
    title: 'Bertumbuh Lebih Jauh',
    message: 'Pelan-pelan aja, nggak usah buru-buru. Yang penting kamu terus berkembang dan berani ambil kesempatan baru. Dunia masih luas banget, dan kamu punya banyak hal indah yang belum kamu jelajahi.',
    author: '— 🦋'
  },
  {
    emoji: '🎂',
    title: 'Dan Akhirnya...',
    message: 'Jadi hari ini, rayakan diri kamu sepenuhnya. Tertawa yang puas, bahagia yang banyak, dan bermimpi yang tinggi. Happy birthday once again, semoga tahun ini jadi salah satu tahun terbaik dalam hidup kamu 🤍',
    author: '— 🙏'
  }
];
const reactions = [
  { emoji: '😍', label: 'Love', count: 24 },
  { emoji: '🥳', label: 'Party', count: 18 },
  { emoji: '💖', label: 'Heart', count: 31 },
  { emoji: '🎉', label: 'Celebrate', count: 22 },
  { emoji: '🥰', label: 'Adore', count: 15 },
  { emoji: '✨', label: 'Sparkle', count: 27 }
];

// ===== RENDER WISHES =====
function renderWishes() {
  const grid = document.getElementById('wishesGrid');
  grid.innerHTML = wishes.map((wish, i) => `
    <div class="wish-card" onclick="this.classList.toggle('flipped')" style="animation-delay: ${i * 0.15}s; animation: fadeInUp 0.6s ease ${i * 0.15}s both;">
      <div class="wish-card-inner">
        <div class="wish-front">
          <div class="wish-emoji">${wish.emoji}</div>
          <h3>${wish.title}</h3>
          <p class="tap-hint">✨ Klik untuk membaca ✨</p>
        </div>
        <div class="wish-back">
          <p>${wish.message}</p>
          <span class="wish-author">${wish.author}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== RENDER REACTIONS =====
function renderReactions() {
  const bar = document.getElementById('reactionBar');
  bar.innerHTML = reactions.map((r, i) => `
    <button class="reaction-btn" onclick="reactClick(this, ${i})" title="${r.label}">
      ${r.emoji}
      <span class="count">${r.count}</span>
    </button>
  `).join('');
}

function reactClick(btn, index) {
  btn.classList.add('active');
  reactions[index].count++;
  btn.querySelector('.count').textContent = reactions[index].count;

  // Floating emoji animation
  const emoji = document.createElement('span');
  emoji.textContent = reactions[index].emoji;
  emoji.style.cssText = `
    position: fixed;
    left: ${btn.getBoundingClientRect().left + btn.offsetWidth / 2}px;
    top: ${btn.getBoundingClientRect().top}px;
    font-size: 2rem;
    pointer-events: none;
    z-index: 3000;
    animation: floatUp 1.5s ease forwards;
  `;
  document.body.appendChild(emoji);
  setTimeout(() => emoji.remove(), 1500);

  setTimeout(() => btn.classList.remove('active'), 1000);
}

// ===== INIT =====
createNavigation('wishes.html');
renderWishes();
renderReactions();
