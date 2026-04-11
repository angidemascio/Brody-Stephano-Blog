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

(function () {
    const toggle = document.getElementById('concepts-toggle');
    if (!toggle) return;
    const showMore = document.getElementById('concepts-show-more');
    let expanded = false;

    function updateRows() {
        const rows = document.querySelectorAll('.concept-row');
        if (rows.length <= 6) { showMore.style.display = 'none'; return; }
        showMore.style.display = '';
        rows.forEach((row, i) => {
            if (i >= 6) row.classList.toggle('expanded', expanded);
        });
        toggle.textContent = expanded ? 'Show less ↑' : 'Show more ↓';
    }

    toggle.addEventListener('click', () => { expanded = !expanded; updateRows(); });

    const list = document.getElementById('concepts-list');
    new MutationObserver(updateRows).observe(list, { childList: true });

    document.addEventListener('DOMContentLoaded', updateRows);
})();
