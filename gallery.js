// ===== GALLERY DATA =====
// Untuk menambahkan foto, letakkan file gambar di folder "photos/"
// lalu tambahkan entry baru di array galleryItems di bawah ini.
//
// Contoh:
//   { image: 'photos/foto1.jpg', title: 'Judul Foto', caption: 'Deskripsi foto' }
//
// Format gambar yang didukung: .jpg, .jpeg, .png, .webp, .gif

const galleryItems = [
    {
        image: 'photos/foto1.jpg',
        title: 'BAZAR 2023',
        caption: '💖'
    },
    {
        image: 'photos/foto2.jpg',
        title: 'CLASSMEET 1 2023',
        caption: '🌸'
    },
    {
        image: 'photos/foto3.jpg',
        title: 'BIOLOGY PRACTICUM',
        caption: '🦋'
    },
    {
        image: 'photos/foto4.jpg',
        title: 'PSPB2 2023',
        caption: '⭐'
    },
    {
        image: 'photos/foto5.jpg',
        title: 'MARRIAGE PRACTICE',
        caption: '🌷'
    },
    {
        image: 'photos/foto6.jpg',
        title: 'ONE RANDOM PHOTO',
        caption: '🎀'
    }
];

let currentLightboxIndex = 0;

// ===== RENDER GALLERY =====
function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    grid.innerHTML = galleryItems.map((item, index) => `
    <div class="gallery-card" onclick="openLightbox(${index})">
      <img src="${item.image}" alt="${item.title}" class="card-image"
           onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <div class="card-image-placeholder" style="display:none;">
        <span>📷</span>
        <small>Foto belum ditambahkan</small>
      </div>
      <div class="card-overlay">
        <h3>${item.title}</h3>
        <p>${item.caption}</p>
      </div>
    </div>
  `).join('');
}

// ===== LIGHTBOX =====
function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightbox();
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
    if (event && event.target.closest('.lightbox-nav')) return;
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    currentLightboxIndex = (currentLightboxIndex + direction + galleryItems.length) % galleryItems.length;
    updateLightbox();
}

function updateLightbox() {
    const item = galleryItems[currentLightboxIndex];
    const content = document.getElementById('lightboxContent');
    content.innerHTML = `<img src="${item.image}" alt="${item.title}" style="max-width: 90vw; max-height: 65vh; border-radius: 16px; object-fit: contain;">`;
    document.getElementById('lightboxTitle').textContent = item.title;
    document.getElementById('lightboxCaption').textContent = item.caption;
    document.getElementById('lightboxCounter').textContent = `${currentLightboxIndex + 1} / ${galleryItems.length}`;
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
    if (e.key === 'Escape') {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== INIT =====
createNavigation('gallery.html');
renderGallery();
