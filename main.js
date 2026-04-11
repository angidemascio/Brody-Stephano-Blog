const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 80);
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

const lightbox = document.getElementById('media-lightbox');
const lightboxInner = document.getElementById('lightbox-inner');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(content, caption) {
    lightboxInner.replaceChildren(lightboxClose, content);
    if (caption) {
        const cap = document.createElement('p');
        cap.className = 'lightbox-caption';
        cap.textContent = caption;
        lightboxInner.appendChild(cap);
        }
lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
        }

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox(); });

function initMediaLightbox(container) {
    container.querySelectorAll('img:not(.no-zoom)').forEach(img => {
        img.style.display = 'block';
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            const clone = document.createElement('img');
            clone.src = img.src;
            clone.alt = img.alt;
            clone.style.cssText = 'max-width:100%;max-height:85vh;border-radius:4px;border:1px solid var(--border);object-fit:contain;display:block;';
            openLightbox(clone, img.alt || null);
        });
    });
}
