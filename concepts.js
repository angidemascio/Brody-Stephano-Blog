const conceptsData = [
    {
        id: 'barkhausen',
        name: 'Barkhausen Criterion',
        blurb: 'The two conditions a circuit must satisfy to sustain oscillation: loop gain ≥ 1 and a total phase shift of 360°.',
        full: 'The Barkhausen criterion defines the two necessary conditions for a linear feedback circuit to sustain steady oscillation. First, the total phase shift around the feedback loop must be exactly 360°. Second, the loop gain must be at least one, meaning the signal must emerge from the loop with equal or greater amplitude than it entered. In practice, the circuit is designed with slightly more than unity gain so oscillation can grow from noise, after which nonlinearity or automatic gain control stabilizes the amplitude. If only one condition is met, the result is either a decaying waveform or a growing signal that clips, rather than a clean oscillation.'
    },
    {
        id: 'q-factor',
        name: 'Q Factor',
        blurb: 'A dimensionless ratio describing how sharp a resonant circuit is. High Q corresponds to low loss, narrow bandwidth, and improved frequency stability.',
        full: 'The Q (quality) factor is the ratio of energy stored in a resonant circuit to the energy dissipated per cycle. A higher Q indicates that the circuit resonates more sharply at a specific frequency with reduced resistive loss. In an LC oscillator, a high Q results in improved frequency stability, reduced phase noise, and a cleaner sinusoidal output. In a bandpass filter, a high Q corresponds to a narrower passband. Loading the tank circuit introduces additional loss, effectively reducing Q, which is why a buffer stage is typically placed between the oscillator and any subsequent stages.'
    },
    {
        id: 'loop-gain',
        name: 'Loop Gain',
        blurb: 'The product of gains around a feedback loop. It must reach at least 1 for oscillation, while high loop gain improves linearity, stability, and bandwidth in amplifiers.',
        full: 'Loop gain is the product of all gains around a closed feedback loop, including the amplifier gain and the attenuation of the feedback network. In oscillators, the loop gain must be at least one at the oscillation frequency. In negative-feedback amplifiers, high loop gain reduces distortion, stabilizes gain against component variation, and extends bandwidth. However, excessive gain at unintended frequencies can lead to instability and oscillation. Stability is typically verified using phase margin derived from a Bode plot.'
    },
    {
        id: 'wilson-mirror',
        name: 'Wilson Current Mirror',
        blurb: 'A three-transistor current mirror that provides higher output impedance and improved accuracy compared to the basic two-transistor implementation.',
        full: 'A current mirror replicates a reference current into one or more output branches. The basic two-transistor implementation suffers from finite output impedance and errors due to the Early effect. The Wilson current mirror introduces a third transistor in a feedback configuration, which significantly increases output impedance and compensates for base current errors. This makes it well suited for precision analog and RF biasing applications where a stable and accurate current source is required.'
    },
    {
        id: 'emitter-follower',
        name: 'Emitter Follower',
        blurb: 'A common-collector BJT stage with near-unity voltage gain, high input impedance, and low output impedance.',
        full: 'The emitter follower, or common-collector configuration, has its collector tied to the supply, the input applied at the base, and the output taken from the emitter. The voltage gain is approximately unity, meaning the output closely follows the input. Its primary function is impedance transformation, providing high input impedance and low output impedance. This makes it ideal as a buffer between sensitive circuits, such as oscillator tanks, and loads that would otherwise disturb their operation. Without buffering, loading the tank reduces its Q and shifts the resonant frequency.'
    },
    {
        id: 'diff-pair',
        name: 'Differential Pair',
        blurb: 'Two matched transistors that share a common tail current source and amplify the difference between two input signals.',
        full: 'The differential pair amplifies the difference between two input signals while rejecting common-mode components. Two transistors share a tail current, typically set by a current source. As one input increases, that transistor steers more of the tail current away from the other. This current-steering behavior is approximately linear for small differential inputs.'
    },
    {
        id: 'transconductance',
        name: 'Transconductance (gₘ)',
        blurb: 'The ratio of output current change to input voltage change in a transistor, which determines voltage gain in many amplifier topologies.',
        full: 'Transconductance (\\(g_m\\)) describes how effectively a transistor converts an input voltage into an output current. For a BJT biased at collector current \\(I_C\\), \\(g_m = \\frac{I_C}{V_T}\\), where \\(V_T\\) is approximately 26 mV at room temperature. The voltage gain of a common-emitter stage is approximately \\(g_m \\times R_C\\), making gain directly proportional to bias current.'
    },
    {
        id: 'thermal-noise',
        name: 'Thermal Noise',
        blurb: 'Voltage noise caused by random electron motion in resistive elements. It sets the fundamental noise floor and depends on temperature, resistance, and bandwidth.',
        full: 'Thermal noise, also known as Johnson-Nyquist noise, arises from the random motion of electrons within a conductor. This produces a fluctuating voltage even in the absence of current flow. The RMS noise voltage is given by \\(V_n = \\sqrt{4kTR\\Delta f}\\), where \\(k\\) is Boltzmann\'s constant, \\(T\\) is the absolute temperature, \\(R\\) is resistance, and \\(\\Delta f\\) is bandwidth. Thermal noise can be reduced by lowering temperature or limiting bandwidth, which is why low-noise amplifiers (LNAs) typically use predominantly reactive components while minimizing resistive elements. In RF circuits, biasing resistors near sensitive nodes are undesirable because their noise is amplified along with the signal, degrading overall performance.'
    },
    {
        id: 'cascode',
        name: 'Cascode Configuration',
        blurb: 'A two-transistor stacked configuration that increases output impedance and bandwidth by isolating the input stage from output voltage variations.',
        full: 'The telescopic cascode configuration consists of two transistors stacked vertically. The lower transistor operates as a common-emitter transconductance stage, while the upper transistor operates as a common-base current buffer that absorbs output voltage swings. This prevents large voltage variations at the collector of the input device, effectively eliminating the Miller effect. As a result, the cascode provides both high gain and wide bandwidth. It is commonly used in RF and analog circuits where gain can be sacrificed for higher bandwidth.'
    },
    {
        id: 'phase-noise',
        name: 'Phase Noise',
        blurb: 'Random phase fluctuations in an oscillator output, measured in dBc/Hz, that determine spectral purity and adjacent-channel interference.',
        full: 'An ideal oscillator produces a single-frequency sinusoid. In practice, noise causes random variations in the phase of the signal, spreading energy into frequencies near the carrier. This effect is known as phase noise and is typically specified in dBc/Hz at a given offset from the carrier. In receiver systems, phase noise from the local oscillator can degrade adjacent-channel performance through reciprocal mixing. Minimizing phase noise is a key design goal and is strongly influenced by the Q of the resonant tank and the presence of resistive noise sources.'
    },
];

const IS_TOUCH = window.matchMedia('(hover: none)').matches;

function renderConceptList(list) {
    const el = document.getElementById('concepts-list');
    const noResults = document.getElementById('no-results');
    el.innerHTML = '';
    noResults.style.display = list.length ? 'none' : 'block';

    list.forEach((c, i) => {
        const row = document.createElement('div');
        row.className = 'concept-row';
        row.dataset.id = c.id;
        row.style.opacity = '0';
        row.style.transform = 'translateY(10px)';
        row.innerHTML = `
            <div class="row-left">
                <span class="row-name">${c.name}</span>
            </div>
            <span class="row-blurb">${c.blurb}</span>
            <span class="row-arrow">Read →</span>`;
        row.addEventListener('click', () => openConceptModal(c.id));
        el.appendChild(row);
        setTimeout(() => {
            row.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            row.style.opacity = '1';
            row.style.transform = 'none';
        }, i * 40);
    });
}

function applyConceptFilters() {
    const q = document.getElementById('concept-search').value.toLowerCase();
    renderConceptList(conceptsData.filter(c =>
        !q || c.name.toLowerCase().startsWith(q)
    ));
}

const tooltip = document.getElementById('concept-tooltip');
let tooltipTimer = null;

function showTooltip(term) {
    if (IS_TOUCH) return;
    const c = conceptsData.find(x => x.id === term.dataset.id);
    if (!c) return;

    document.getElementById('tt-name').textContent = c.name;
    document.getElementById('tt-body').textContent = c.blurb;
    const more = document.getElementById('tt-more');
    more.onclick = () => { hideTooltip(); openConceptModal(c.id); };

    const r = term.getBoundingClientRect();
    let left = r.left;
    let top = r.bottom + 8;
    if (left + 290 > window.innerWidth - 12) left = window.innerWidth - 302;
    if (top + 160 > window.innerHeight - 12) top = r.top - 168;
    tooltip.style.left = Math.max(8, left) + 'px';
    tooltip.style.top = Math.max(8, top) + 'px';
    tooltip.classList.add('visible');
}

function hideTooltip() {
    tooltip.classList.remove('visible');
}

function initConceptTerms(container) {
    container.querySelectorAll('.concept-term').forEach(term => {
        term.addEventListener('click', (e) => {
            e.stopPropagation();
            hideTooltip();
            openConceptModal(term.dataset.id);
        });

        if (!IS_TOUCH) {
            term.addEventListener('mouseenter', () => {
                clearTimeout(tooltipTimer);
                showTooltip(term);
            });
            term.addEventListener('mouseleave', () => {
                tooltipTimer = setTimeout(hideTooltip, 160);
            });
        }
    });
}

if (tooltip) {
    tooltip.addEventListener('mouseenter', () => clearTimeout(tooltipTimer));
    tooltip.addEventListener('mouseleave', () => {
        tooltipTimer = setTimeout(hideTooltip, 160);
    });
}

function openConceptModal(id) {
    const c = conceptsData.find(x => x.id === id);
    if (!c) return;

    document.getElementById('cm-title').textContent = c.name;
    document.getElementById('cm-content').innerHTML = c.full;

    document.getElementById('concept-backdrop').classList.add('open');
    document.body.style.overflow = 'hidden';

    if (window.MathJax?.typesetPromise) {
        MathJax.typesetPromise([document.getElementById('cm-content')]).catch(console.error);
    }
}

function closeConceptModal() {
    document.getElementById('concept-backdrop').classList.remove('open');
    document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {

    const conceptsList = document.getElementById('concepts-list');
    if (conceptsList) {
        renderConceptList(conceptsData);
        document.getElementById('concept-search')
            .addEventListener('input', applyConceptFilters);
    }

    document.getElementById('cm-close')
        .addEventListener('click', closeConceptModal);
    document.getElementById('concept-backdrop')
        .addEventListener('click', e => {
            if (e.target.id === 'concept-backdrop') closeConceptModal();
        });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeConceptModal();
    });

    initConceptTerms(document);

    const fadeObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 80);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.concepts-fade').forEach(el => fadeObserver.observe(el));
});