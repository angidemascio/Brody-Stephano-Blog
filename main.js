const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 80);
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

const backdrop   = document.getElementById('modal-backdrop');
const modalTitle = document.getElementById('modal-title');
const modalDate  = document.getElementById('modal-date');
const modalTags  = document.getElementById('modal-tags');
const modalBody  = document.getElementById('modal-body');

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const id = card.dataset.project;
        const p  = projects[id];
        if (!p) return;

        modalTitle.textContent = p.title;
        modalDate.textContent  = p.date;
        modalTags.innerHTML    = p.tags.map(t =>
            `<span class="card-tag ${t.cls}">${t.label}</span>`
        ).join('');

        let specsHtml = '';
        if (p.specs) {
            specsHtml = `<div class="modal-specs">${p.specs.map(s =>
                `<div class="spec-row">
                    <span class="spec-key">${s.key}</span>
                    <span class="spec-val">${s.val}</span>
                </div>`
            ).join('')}</div>`;
        }

        modalBody.innerHTML = specsHtml + p.body;
        backdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (window.MathJax) MathJax.typesetPromise([modalBody]);
    });
});

document.getElementById('modal-close').addEventListener('click', closeModal);
backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function closeModal() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
}
