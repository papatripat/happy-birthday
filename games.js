// ===== GAMES CONTROLLER =====
createNavigation('games.html');

function startGame(game) {
    document.getElementById('gamesHub').style.display = 'none';
    document.querySelectorAll('.game-area').forEach(g => g.classList.remove('active'));
    document.getElementById(game + 'Game').classList.add('active');
}

function backToHub() {
    // Stop all games
    stopCatchGame();
    document.querySelectorAll('.game-area').forEach(g => g.classList.remove('active'));
    document.getElementById('gamesHub').style.display = 'block';
}

// ====================================================
// 🎁 CATCH THE GIFTS GAME
// ====================================================
let catchScore = 0;
let catchLives = 3;
let catchTimer = null;
let catchSpawner = null;
let catchActive = false;
let basketX = 50;

function startCatchGame() {
    catchScore = 0;
    catchLives = 3;
    catchActive = true;
    basketX = 50;
    document.getElementById('catchScore').textContent = '0';
    updateLivesDisplay();

    const field = document.getElementById('catchField');
    // Clear old gifts
    field.querySelectorAll('.gift, .catch-score-popup').forEach(el => el.remove());

    const basket = document.getElementById('basket');
    basket.style.left = 'calc(50% - 25px)';

    clearInterval(catchSpawner);
    catchSpawner = setInterval(spawnGift, 700);

    // Mouse / touch movement
    field.onmousemove = (e) => {
        if (!catchActive) return;
        const rect = field.getBoundingClientRect();
        const x = e.clientX - rect.left;
        basket.style.left = Math.max(0, Math.min(rect.width - 50, x - 25)) + 'px';
        basketX = x;
    };

    field.ontouchmove = (e) => {
        if (!catchActive) return;
        e.preventDefault();
        const rect = field.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        basket.style.left = Math.max(0, Math.min(rect.width - 50, x - 25)) + 'px';
        basketX = x;
    };
}

function stopCatchGame() {
    catchActive = false;
    clearInterval(catchSpawner);
}

function spawnGift() {
    if (!catchActive) return;

    const field = document.getElementById('catchField');
    if (!field) return;

    const giftEmojis = ['🎁', '🎀', '💝', '🧸', '🌹', '💎', '🍰'];
    const gift = document.createElement('div');
    gift.className = 'gift';
    gift.textContent = giftEmojis[Math.floor(Math.random() * giftEmojis.length)];
    gift.style.left = (5 + Math.random() * 85) + '%';
    const duration = 2 + Math.random() * 1.5;
    gift.style.animationDuration = duration + 's';

    field.appendChild(gift);

    // Check collision every 50ms
    const checker = setInterval(() => {
        if (!catchActive) {
            clearInterval(checker);
            gift.remove();
            return;
        }

        const giftRect = gift.getBoundingClientRect();
        const basketRect = document.getElementById('basket').getBoundingClientRect();

        // Check if gift reached basket level
        if (giftRect.bottom >= basketRect.top && giftRect.top <= basketRect.bottom) {
            const giftCenter = giftRect.left + giftRect.width / 2;
            const basketCenter = basketRect.left + basketRect.width / 2;

            if (Math.abs(giftCenter - basketCenter) < 50) {
                // Caught!
                catchScore += 10;
                document.getElementById('catchScore').textContent = catchScore;
                showCatchPopup(gift, '+10 🎉');
                gift.remove();
                clearInterval(checker);
                return;
            }
        }

        // Check if gift fell past screen
        if (giftRect.top > field.getBoundingClientRect().bottom) {
            catchLives--;
            updateLivesDisplay();
            gift.remove();
            clearInterval(checker);

            if (catchLives <= 0) {
                catchActive = false;
                clearInterval(catchSpawner);
                showGameCompleteModal('gifts', catchScore);
            }
        }
    }, 50);

    // Cleanup on animation end
    gift.addEventListener('animationend', () => {
        clearInterval(checker);
        if (gift.parentNode) {
            catchLives--;
            updateLivesDisplay();
            gift.remove();
            if (catchLives <= 0 && catchActive) {
                catchActive = false;
                clearInterval(catchSpawner);
                showGameCompleteModal('gifts', catchScore);
            }
        }
    });
}

function showCatchPopup(element, text) {
    const field = document.getElementById('catchField');
    const rect = element.getBoundingClientRect();
    const fieldRect = field.getBoundingClientRect();

    const popup = document.createElement('div');
    popup.className = 'catch-score-popup';
    popup.textContent = text;
    popup.style.left = (rect.left - fieldRect.left) + 'px';
    popup.style.top = (rect.top - fieldRect.top) + 'px';
    field.appendChild(popup);

    setTimeout(() => popup.remove(), 800);
}

function updateLivesDisplay() {
    const display = document.getElementById('livesDisplay');
    let html = '';
    for (let i = 0; i < 3; i++) {
        html += `<span class="heart ${i >= catchLives ? 'lost' : ''}">❤️</span>`;
    }
    display.innerHTML = html;
}
