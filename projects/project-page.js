function renderProject(id) {
    const p = projects[id];
    if (!p) { document.body.innerHTML = '<p>Project not found.</p>'; return; }

    document.title = p.title + ' — Brody Stephano';

    document.getElementById('proj-tags').innerHTML = p.tags.map(t =>
        `<span class="card-tag ${t.cls}">${t.label}</span>`
    ).join('');
    document.getElementById('proj-title').textContent = p.title;
    document.getElementById('proj-date').textContent = p.date;

    if (p.specs) {
        document.getElementById('proj-specs').innerHTML = p.specs.map(s =>
            `<div class="spec-row">
                <span class="spec-key">${s.key}</span>
                <span class="spec-val">${s.val}</span>
            </div>`
        ).join('');
    }

    const body = document.getElementById('proj-body');
    body.innerHTML = p.body;
    initConceptTerms(body);
    initMediaLightbox(body);
    if (window.MathJax) MathJax.typesetPromise([body]);
}