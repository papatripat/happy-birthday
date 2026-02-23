// ===== CAKE INTERACTIONS =====
createNavigation('cake.html');

let candlesBlown = false;
let wishMade = false;
let cakeCut = false;

function blowCandles() {
    if (candlesBlown) return;
    candlesBlown = true;

    // Blow out flames one by one
    for (let i = 1; i <= 5; i++) {
        setTimeout(() => {
            document.getElementById('flame' + i).classList.add('blown');
            document.getElementById('smoke' + i).classList.add('visible');
        }, i * 300);
    }

    // Show confetti after all blown
    setTimeout(() => {
        createConfetti(100);

        // Show casual birthday greeting
        showBlowCandlesGreeting();

        document.getElementById('cakeStatus').textContent = '🎉 Lilinnya sudah padam! Sekarang buat permohonan!';
        document.getElementById('blowBtn').style.display = 'none';
        document.getElementById('wishBtn').style.display = 'inline-flex';
    }, 2000);
}

function showBlowCandlesGreeting() {
    const existing = document.querySelector('.candle-greeting-modal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay active candle-greeting-modal';
    overlay.innerHTML = `
      <div class="modal-content">
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
        <div style="font-size: 4rem; margin-bottom: 1rem; animation: bounceIn 0.8s ease;">🎂🎉</div>
        <h2 class="game-complete-title">Happy Birthday, Vania!</h2>
        <p class="game-complete-message">
          Yeay, lilinnya udah padam! 🥳<br><br>
          Semoga tahun ini jadi tahun yang penuh kebahagiaan, penuh cinta, dan penuh hal-hal seru buat kamu! 💖<br><br>
          Okay sekarang, tutup mata... dan buat permohonan terbaikmu! ✨
        </p>
        <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove()">
          Makasih! Aku mau bikin wish dulu 💫
        </button>
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });
}

function makeWish() {
    document.getElementById('wishModal').classList.add('active');

    // Spawn sparkles around modal
    spawnModalSparkles();
}

function closeWishModal() {
    document.getElementById('wishModal').classList.remove('active');
}

function submitWish() {
    const wish = document.getElementById('wishInput').value.trim();
    wishMade = true;

    closeWishModal();
    createConfetti(60);

    // Save wish to localStorage
    if (wish) {
        const wishes = JSON.parse(localStorage.getItem('birthday_wishes') || '[]');
        wishes.push({ text: wish, date: new Date().toISOString() });
        localStorage.setItem('birthday_wishes', JSON.stringify(wishes));
    }

    document.getElementById('cakeStatus').textContent = '✨ Permohonanmu sudah dikirim ke bintang! Sekarang potong kuenya! ✨';
    document.getElementById('wishBtn').style.display = 'none';
    document.getElementById('cutBtn').style.display = 'inline-flex';
}

function cutCake() {
    if (cakeCut) return;
    cakeCut = true;

    const cutLine = document.getElementById('cutLine');
    cutLine.classList.add('active');

    setTimeout(() => {
        document.getElementById('cakeContainer').classList.add('cut');
        createConfetti(40);
        document.getElementById('cakeStatus').textContent = '🍰 Kuenya sudah dipotong! Selamat menikmati! 🎂';
        document.getElementById('cutBtn').style.display = 'none';
        document.getElementById('resetBtn').style.display = 'inline-flex';
    }, 600);
}

function resetCake() {
    candlesBlown = false;
    wishMade = false;
    cakeCut = false;

    // Reset flames
    for (let i = 1; i <= 5; i++) {
        document.getElementById('flame' + i).classList.remove('blown');
        document.getElementById('smoke' + i).classList.remove('visible');
    }

    // Reset cake
    document.getElementById('cutLine').classList.remove('active');
    document.getElementById('cakeContainer').classList.remove('cut');

    // Reset buttons
    document.getElementById('blowBtn').style.display = 'inline-flex';
    document.getElementById('wishBtn').style.display = 'none';
    document.getElementById('cutBtn').style.display = 'none';
    document.getElementById('resetBtn').style.display = 'none';

    document.getElementById('cakeStatus').textContent = '✨ Tiup lilinnya untuk membuat permohonan! ✨';
    document.getElementById('wishInput').value = '';
}

function spawnModalSparkles() {
    const modal = document.querySelector('#wishModal .modal-content');
    const sparkles = ['✨', '⭐', '💫', '🌟'];

    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('span');
            sparkle.className = 'wish-sparkle';
            sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            modal.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }, i * 200);
    }
}
