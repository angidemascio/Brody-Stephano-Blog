const bjtAmp = {
    title: 'Four-Stage BJT Audio Amplifier',
    date: 'Electronics II · FAU',
    tags: [{ label: 'Analog', cls: 'analog' }],
    specs: [
        { key: 'Voltage Gain',   val: '90× (linear)' },
        { key: 'Load Impedance', val: '8 Ω' },
        { key: 'Bandwidth',      val: '30 kHz' },
        { key: 'Input Stage',    val: 'Cascode Differential' },
        { key: 'Biasing',        val: 'Wilson Current Mirror' },
        { key: 'Feedback',       val: 'Voltage feedback' },
    ],
    body: `
        <p>This was a class project for Electronics II, but I wanted to actually understand every stage rather than just get it working. Four BJT stages, designed from scratch.</p>
        <h4>Stage Architecture</h4>
        <p>The input is a cascode differential pair biased with a Wilson current mirror. I picked the cascode configuration because the high output impedance keeps the gain from degrading, and the Wilson mirror is a cleaner biasing solution than a simple resistor divider. The second stage is a common-emitter amp that handles most of the voltage gain. The output is a Class AB power stage with voltage feedback wrapped around it to keep things linear.</p>
        <img class="half-width" src="assets/images/audio_amp_bb.png" alt="Breadboard prototype of the BJT audio amplifier">
        <h4>Frequency Response</h4>
        <p>Ran a Bode analysis to check the phase margin before closing the feedback loop. Gain came out flat at 90x (39 dB) from 20 Hz up to 30 kHz with enough phase margin that it wasn't going to oscillate on me.</p>
        <img src="assets/images/phase_margin_bode_plot.png" alt="Phase margin and Bode plot">
        <video controls>
            <source src="assets/audio_amp_video.mov" type="video/mp4">
        </video>
    `
};

const colpitts = {
    title: 'Colpitts LC Oscillator',
    date: 'High Frequency Amplifier Design · FAU',
    tags: [{ label: 'RF / HF', cls: 'rf' }],
    specs: [
        { key: 'Topology',  val: 'Colpitts (BJT)' },
        { key: 'Type',      val: 'LC Tank Oscillator' },
        { key: 'Analysis',  val: 'Startup + Small-signal' },
        { key: 'Condition', val: 'Barkhausen Criterion' },
        { key: 'Output',    val: 'Clean Sine Wave' },
    ],
    body: `
        <p>The Colpitts oscillator topology chosen here uses a common-emitter configuration. The easiest way to identify the type of oscillator at a glance is by examining the feedback network. Colpitts oscillators consist of a single inductor and two capacitors, which together form a π network.</p>
        <p>While the network may appear simple at first glance, it actually acts as an impedance transformer. Unlike a −gm oscillator, the Colpitts oscillator satisfies the Barkhausen criterion for oscillation.</p>
        <p>You may notice that there are two coupling capacitors placed before and after the π network. These capacitors pass the collector signal to the tank circuit and feed the tank signal back to the base. Because a common-emitter amplifier introduces a 180° phase shift, the tank circuit must provide another 180° phase shift, resulting in a total phase shift of 360°, which satisfies the phase condition of the Barkhausen criterion.</p>
        <p>The second requirement for oscillation is that the loop gain must be greater than one. In this design, you may notice that the collector is biased with an inductor rather than a resistor. The advantage of replacing the collector resistor with an inductor is that it allows for a larger oscillator voltage swing and improved noise performance. This also helps satisfy the loop gain requirement more easily.</p>
        <img src="assets/images/colpitts_oscillator.png" alt="Colpitts oscillator schematic">
        <p>Because the collector uses an inductor, you may notice that a large emitter degeneration resistor is included in the design. This resistor is used to dampen the output voltage swing. I will present the calculations later for the specific circuit used in this design.</p>
        <p>In analog design, it is very important to buffer oscillators, since loading the resonant tank circuit can cause unwanted frequency drift, undesirable interference, and may even cause the circuit to stop oscillating. Loading the oscillator's tank circuit also affects the Q factor. The Q factor is a ratio that describes the selectivity of the network and is inversely proportional to bandwidth.</p>
        <p>For oscillators, it is highly desirable to maintain a high Q factor, since this improves frequency stability and spectral purity. Any loading of the tank circuit will reduce the Q factor. Therefore, an emitter follower buffer is added to isolate the oscillator from the rest of the circuit.</p>
        <p>Finally, we wish to convert this single-ended oscillation into a differential signal using a differential amplifier. To do this, we must first understand the limitations of this conversion. Although the Colpitts oscillator produces a large voltage swing, converting it to a differential signal requires that the signal be attenuated.</p>
        <p>You may wonder why we generate a large swing at the oscillator only to attenuate it afterward. This is a very reasonable question. We do this to ensure reliable startup from thermal noise and to provide the oscillator with sufficient gain for sustained oscillation.</p>
        <p>Differential amplifiers are a type of transconductance amplifier, meaning they convert an input voltage into a current, which can then be converted back into a voltage when a resistive load is present. Differential amplifiers can also be used to generate differential signals from single-ended inputs by connecting the unused base of the second transistor to AC ground.</p>
        <p>When using a differential amplifier and attempting to achieve a linear relationship between the input and output, the circuit must operate within the linear region of the amplifier. To keep these amplifiers in their linear region, we must recognize the limitations imposed by sharing a common current source.</p>
        <p>To understand this behavior, consider the case where the voltage at the base of Q1 reaches its maximum value. Increasing the base voltage increases the Q-point of the transistor, which allocates more current to the emitter of Q1. To satisfy Kirchhoff's Current Law (KCL), the emitter current of Q2 must decrease correspondingly.</p>
        <p>In order to prevent either Q1 or Q2 from fully switching off, the input signal must be attenuated to approximately 200 mVpp, unless emitter degeneration resistors are implemented.</p>
        <p>This behavior can be described mathematically by the <strong>current-steering relationship</strong> of the BJT differential pair:</p>
        \\[I_{C1} = \\frac{I_{ref}}{2}\\left(1 + \\tanh\\left(\\frac{V_{id}}{2V_T}\\right)\\right)\\]
        \\[I_{C2} = \\frac{I_{ref}}{2}\\left(1 - \\tanh\\left(\\frac{V_{id}}{2V_T}\\right)\\right)\\]
        <p>where \\(I_{ref}\\) is the <strong>tail current</strong> supplied by the current source, \\(V_{id} = V_{B1} - V_{B2}\\) is the <strong>differential input voltage</strong>, and \\(V_T\\) is the <strong>thermal voltage</strong> (approximately 26 mV at room temperature).</p>
    `
};

const heartPcb = {
    title: 'Heart-Shaped PCB',
    date: 'Personal Project · Altium Designer',
    tags: [{ label: 'PCB', cls: 'pcb' }],
    specs: [
        { key: 'Control IC', val: '555 Timer (astable)' },
        { key: 'Output',     val: 'Variable-rate LED blink' },
        { key: 'Timing',     val: 'RC network' },
        { key: 'EDA Tool',   val: 'Altium Designer' },
        { key: 'Shape',      val: 'Custom heart outline' },
        { key: 'Status',     val: 'Fabricated & assembled' },
    ],
    body: `
        <p>When I first started talking to my future wife, and later my girlfriend, I knew I wanted to make her feel loved and cherished in a way I had never been able to express before. I wanted to create a gift that combined my love for her with one of my greatest passions.</p>
        <p>I have always enjoyed making gifts, and I especially appreciate how she encourages my interests, particularly this one. Before beginning, I should mention that Angelina is the only person for whom I would use an integrated circuit in my personal projects, as I generally prefer building circuits from discrete transistors rather than relying on prepackaged components.</p>
        <p>The project began simply, using 16 red LEDs, a 555 timer, a potentiometer, a capacitor, and a transistor. To understand the circuit, it is important to understand the operation of the 555 timer in a low-frequency monostable configuration.</p>
        <h4>How the 555 Timer Works</h4>
        <p>The 555 timer uses internal comparators referenced to \\(\\frac{1}{3}V_{CC}\\) and \\(\\frac{2}{3}V_{CC}\\) to control a flip-flop, which switches the output between HIGH and LOW states. When triggered, the output goes HIGH and remains HIGH while the external capacitor charges through a resistor.</p>
        <p>Using a \\(10\\,\\text{k}\\Omega\\) potentiometer and a \\(100\\,\\mu\\text{F}\\) capacitor results in a pulse width of approximately:</p>
        \\[T = 1.1RC \\approx 1.1\\,\\text{seconds}\\]
        <p>In monostable operation, the output remains HIGH until the timing capacitor reaches \\(\\frac{2}{3}V_{CC}\\), at which point the output switches LOW and the capacitor is quickly discharged internally. While the 555 output transitions sharply, the capacitor smooths the LED response, producing the breathing effect.</p>
        <p>The frequency of this breathing effect is set by the potentiometer and the \\(100\\,\\mu\\text{F}\\) capacitor, allowing it to blink over a wide range of speeds based on her preference.</p>
        <h4>The PCB</h4>
        <p>After completing the design, I created a PCB in Altium that includes both her name and the date I asked to be her boyfriend.</p>
        <video controls>
            <source src="assets/heart_pcb.mov" type="video/mp4">
        </video>
    `
};

const amTransmitter = {
    title: 'AM Transmitter (DSB-SC) Gilbert Cell Modulator',
    date: '',
    tags: [{ label: 'RF / HF', cls: 'rf' }],
    specs: [
        { key: 'Carrier Frequency',  val: '1.07 MHz' },
        { key: 'Message Frequency',  val: '41 kHz' },
        { key: 'Carrier Oscillator', val: 'Cross-coupled LC (2N2222)' },
        { key: 'Message Oscillator', val: 'Cross-coupled LC (2N2222)' },
        { key: 'Mixer Topology',     val: 'Gilbert Cell (DBSC)' },
        { key: 'Output',             val: 'DSB-SC modulated signal' },
        { key: 'Simulation',         val: 'PSpice' },
    ],
    body: `
        <p>After taking a course on high-frequency amplifiers and learning about the world of oscillators and mixers, I have been obsessed with learning how they work. This project was a way to combine several of my passions into one.</p>
        <h4>The Oscillators</h4>
        <p>When dealing with oscillator topologies, it is important to distinguish between them. The cross-coupled LC oscillator is one topology that particularly fascinates me. A cross-coupled LC oscillator is a type of -gm oscillator, which means that the circuit oscillates due to the negative resistance of the transistor.</p>
        <p>This differs from other oscillators, such as the Colpitts, Hartley, and Clapp oscillators, which satisfy the Barkhausen oscillation criterion.</p>
        <p>The main advantage of a cross-coupled LC oscillator is the reduction of noise due to its differential outputs. Noise affects all circuits and, interestingly, can often be heard in AM radio. Noise is a very important factor when designing high-frequency amplifiers and oscillators.</p>
        <p>Oscillators exhibit a very specific kind of noise called phase noise. Phase noise describes the non-ideal behavior of oscillators by explaining how the output sine wave is more realistically a sine wave with small phase fluctuations. These phase shifts occur due to noise injected into the oscillator from resistive components.</p>
        <p>The oscillation frequency is set by the LC parallel combination:</p>
        \\[f = \\frac{1}{2\\pi\\sqrt{LC}}\\]
        <p>Although this equation appears simple, we must verify that the circuit will actually oscillate. The circuit will oscillate only if the negative resistance provided by the transistor exceeds the losses in the tank circuit. This condition can be written as:</p>
        \\[g_m > \\frac{2}{R_p}\\]
        <p>where \\(R_p\\) represents the total losses of the tank circuit. Finally, we note that the gain of the circuit is approximately equal to \\(g_m R_p\\).</p>
        <img class="half-width" src="assets/images/cross_coupled_LC_osc.png" alt="Cross-Coupled LC Oscillator at 1.07 MHz (carrier)">
        <img class="half-width" src="assets/images/cross_coupled_LC_osc2.png" alt="Cross-Coupled LC Oscillator at 41 kHz (message)">
        <p>Each cross-coupled oscillator also includes a buffer stage. These buffers are implemented as common-collector amplifiers, which provide very high input impedance and low output impedance. This stage is necessary to mitigate mixer feedthrough.</p>
        <p>Mixer feedthrough is an important phenomenon to minimize. An oscillator with poorly designed isolation can experience frequency shifts, the message signal can become corrupted, and the received signal may become unintelligible.</p>
        <img class="half-width" src="assets/images/message_output.png" alt="Output of Cross-Coupled LC Oscillator (Message)">
        <img class="half-width" src="assets/images/carrier_output.png" alt="Output of Cross-Coupled LC Oscillator (Carrier)">
        <h4>The Gilbert Cell Mixer</h4>
        <p>Finally, we must discuss the Gilbert cell. The Gilbert cell is a type of double-balanced mixer that utilizes two differential signal inputs: one from the carrier and one from the message.</p>
        <p>The topology of the mixer naturally produces DSB-SC, since the message inputs are biased with the same DC voltage. You may not be aware of the DC term present in true AM generation, but this can be added easily by slightly adjusting the DC voltage on one of the bottom two transistors.</p>
        <p>The Gilbert cell operates similarly to a differential amplifier. The top four transistors in the upper quadrant are operated nonlinearly, since the carrier should have a large voltage swing in order to turn the transistors fully on or off. Dr. Behzad Razavi does a great job explaining how mixers work at a fundamental level.</p>
        <p>The bottom two transistors form the transconductance stage, which converts the message voltage into a current. These transistors must operate in the linear region in order to maintain the integrity of the message signal.</p>
        <p>This behavior can be described mathematically by the <strong>current-steering relationship</strong> of the BJT differential pair:</p>
        \\[I_{C1} = \\frac{I_{ref}}{2}\\left(1 + \\tanh\\left(\\frac{V_{id}}{2V_T}\\right)\\right)\\]
        \\[I_{C2} = \\frac{I_{ref}}{2}\\left(1 - \\tanh\\left(\\frac{V_{id}}{2V_T}\\right)\\right)\\]
        <p>where \\(I_{ref}\\) is the <strong>tail current</strong> supplied by the current source, \\(V_{id} = V_{B1} - V_{B2}\\) is the <strong>differential input voltage</strong>, and \\(V_T\\) is the <strong>thermal voltage</strong> (approximately 26 mV at room temperature).</p>
        <p>The output of the Gilbert cell is differential, which also improves noise performance. With this theory, we can finally understand a simplified version of DSB-SC generation.</p>
        <p>It is remarkable that something similar to this project was first demonstrated in 1906, more than 100 years ago!</p>
        <img class="half-width" src="assets/images/gilbert_cell.png" alt="Gilbert Cell Schematic">
        <img class="half-width" src="assets/images/dsbsc_differential.png" alt="Differential output of Gilbert Cell">
        <img class="half-width" src="assets/images/dsbsc_vs_message.png" alt="Differential output of Gilbert Cell vs message">
        <p>With all of the simulations complete, it was finally time to build the circuit on a breadboard. A long-time dream of mine has been to have a home lab, and I am incredibly thankful to my loving wife for buying me an oscilloscope for our anniversary. Now I get to show her my projects from the comfort of our home!</p>
        <img class="half-width" src="assets/images/gilbert_cell_breadboard.jpg" alt="Gilbert Cell Breadboard">
        <img class="half-width" src="assets/images/gilbert_cell_breadboard2.jpg" alt="Gilbert Cell Breadboard with Oscilloscope">
        <video controls>
            <source src="assets/gilbert_cell_video.mov" type="video/mp4">
        </video>
        <button class="design-notes-toggle" onclick="this.classList.toggle('open'); this.nextElementSibling.classList.toggle('open')">
            <span style="color: var(--accent);">[ CALCULATIONS ]</span>
            View Design Notes &amp; Calculations
            <span class="toggle-arrow">▾</span>
        </button>
        <div class="design-notes-content">
            <p>Cross-coupled LC oscillators can appear to produce a smaller peak-to-peak output voltage compared to single-ended topologies such as the Colpitts or Hartley oscillators. To understand why, it is helpful to examine the losses in the tank circuit. Since the inductor is made of wire, it has an inherent series resistance \\(R_s\\). We can analyze this more easily by converting the series representation of the tank into an equivalent parallel resistance.</p>
            <p>To do this, we model a series combination of \\(L_1\\) and \\(R_s\\) and set it equal to a parallel combination of \\(L_p\\) and \\(R_p\\). Equating their impedances gives:</p>
            \\[sL_1 + R_s = \\frac{R_p \\cdot sL_p}{R_p + sL_p}, \\quad \\text{where } s = j\\omega\\]
            <p>Using the definition of the quality factor, which describes the ratio of energy stored to energy dissipated:</p>
            \\[Q = \\frac{\\omega L_1}{R_s}\\]
            <p>From this, we can express the equivalent inductance as:</p>
            \\[L_p = L_1 \\left(1 + \\frac{R_s^2}{\\omega^2 L_1^2}\\right)\\]
            <p>For high-Q systems this additional term is very small, so \\(L_p \\approx L_1\\). Substituting back, we find the equivalent parallel resistance:</p>
            \\[R_p = \\frac{\\omega^2 L_1^2}{R_s} = Q^2 R_s\\]
            <p>Finally, for the cross-coupled LC oscillator to satisfy the oscillation condition, the loop gain must satisfy:</p>
            \\[g_{m1} R_{p1} \\cdot g_{m2} R_{p2} > 1\\]
            <p>To verify this for the carrier oscillator, consider \\(f = 1.09\\,\\text{MHz}\\), \\(L_1 = 22\\,\\mu\\text{H}\\), and \\(R_s = 0.09\\,\\Omega\\). Using these values, \\(R_p \\approx 244\\,\\text{k}\\Omega\\).</p>
            <p>Next, we compute the transconductance. Since \\(g_m = 1/r_e\\) and \\(r_e = 2V_T / I_E\\), we first determine the emitter current. The base voltage is \\(9\\,\\text{V}\\), and assuming a \\(0.7\\,\\text{V}\\) base-emitter drop, the emitter voltage is approximately \\(8.3\\,\\text{V}\\). With an emitter resistance of \\(47\\,\\text{k}\\Omega\\):</p>
            \\[I_E = \\frac{V_E}{R_E} \\approx 177\\,\\mu\\text{A}\\]
            <p>In a differential configuration with matched transistors the current splits evenly, so \\(I_E = I_{E1} + I_{E2}\\), giving a transconductance for each transistor of \\(g_m \\approx 3.53\\,\\text{mS}\\). Using these values:</p>
            \\[g_{m1} R_{p1} \\cdot g_{m2} R_{p2} \\approx 740{,}000\\]
            <p>This is clearly greater than 1, confirming the oscillation condition is satisfied.</p>
            <p>To ensure that the message oscillator meets this criterion, the results are presented with less detail for brevity. Given \\(R_s = 4.6\\,\\Omega\\), \\(L = 680\\,\\mu\\text{H}\\), and \\(f = 41\\,\\text{kHz}\\), the equivalent parallel resistance is \\(R_p \\approx 6.67\\,\\text{k}\\Omega\\).</p>
            <p>With an emitter resistance of \\(18\\,\\text{k}\\Omega\\), the tail current is approximately \\(461\\,\\mu\\text{A}\\), which splits evenly between the two transistors. The transconductance is therefore \\(g_m \\approx 9.2\\,\\text{mS}\\), and:</p>
            \\[g_{m1} R_{p1} \\cdot g_{m2} R_{p2} \\approx 3785\\]
            <p>which is greater than one, satisfying the oscillation condition.</p>
            <p>Now that we know both oscillators will operate properly, we can proceed to connect them to the emitter followers. Since the peak-to-peak output voltages are not yet known, we must determine how to estimate them. The approximate peak-to-peak output voltage is given by:</p>
            \\[V_{pp} \\approx \\frac{2 I_C R_p}{\\pi}\\]
            <p>This expression arises from comparing the fundamental component of a square wave to a sinusoidal waveform. The Fourier series expansion of a square wave shows that the amplitude of its fundamental harmonic is \\(\\frac{4V_p}{\\pi}\\). Since the square wave contains more energy than a sine wave of the same peak value, the equivalent sinusoidal amplitude is scaled accordingly.</p>
            <p>Substituting the calculated values gives \\(V_{pp,\\text{message}} \\approx 980\\,\\text{mV}\\) and \\(V_{pp,\\text{carrier}} \\approx 13\\,\\text{V}\\). However, the carrier result is not physically realistic. In practice the voltage swing is limited by the requirement that the transistor remain in its active region, so the practical peak-to-peak voltage is approximately \\(V_{pp} \\approx 1\\,\\text{V}\\).</p>
            <p>To buffer both signals, the emitter followers are carefully DC-biased to capture the full voltage swing from the oscillators. With \\(V_{pp} = 1\\,\\text{V}\\) for both the message and the carrier, a base bias of approximately \\(4.5\\,\\text{V}\\) allows for clean buffering. Note that the emitter follower for the carrier must supply sufficient current to drive both switching nodes, so a \\(1.2\\,\\text{k}\\Omega\\) resistor is used.</p>
            <p>After buffering and coupling these signals, we can address the Gilbert cell. It is desirable to have a large oscillator input driving the upper four switching transistors, \\(Q_{13}\\)–\\(Q_{16}\\). These transistors operate as switches and are intended to function nonlinearly, so the carrier signal is not attenuated.</p>
            <p>The bottom two transconductance transistors perform current steering. The message signal has an amplitude of approximately \\(1\\,\\text{V}_{pp}\\), so it must be attenuated to maintain linear operation. This is accomplished using a resistive divider of \\(2.8\\,\\text{k}\\Omega\\) and \\(680\\,\\Omega\\), reducing the signal to approximately \\(100\\,\\text{mV}_{pp}\\) and keeping the transconductance stage in its linear region.</p>
            <p>To bias the circuit, the tail current is set using a Wilson current mirror:</p>
            \\[I_{copy} = \\frac{V_{CC} - 2V_{BE}}{R} = \\frac{7.6\\,\\text{V}}{2200\\,\\Omega} \\approx 3.45\\,\\text{mA}\\]
            <p>With a collector resistance of \\(680\\,\\Omega\\), each of the four upper transistors carries approximately one-quarter of the tail current. The collector voltage for \\(Q_{13}\\)–\\(Q_{16}\\) is therefore:</p>
            \\[V_C = 9 - \\frac{680 \\cdot 3.45\\,\\text{mA}}{4} \\approx 7.8\\,\\text{V}\\]
            <p>To keep these transistors in the active region, a base voltage of approximately \\(6.13\\,\\text{V}\\) is selected, implemented using a resistor divider with \\(R_1 = 22\\,\\text{k}\\Omega\\) and \\(R_2 = 47\\,\\text{k}\\Omega\\). For the bottom two transistors, the base voltage is set to approximately \\(3.15\\,\\text{V}\\) to allow for sufficient headroom.</p>
            <p>With a collector resistance of \\(680\\,\\Omega\\), the voltage gain can be approximated as:</p>
            \\[A_v \\approx g_m R_C \\approx 23\\,\\text{V/V}\\]
            <p>This results in an output voltage swing approximately between \\(6.65\\,\\text{V}\\) and \\(8.95\\,\\text{V}\\).</p>
        </div>
    `
};

const fmTransmitter = {
    title: 'FM Transmitter',
    date: 'In Development',
    tags: [{ label: 'RF / HF', cls: 'rf' }, { label: 'In Progress', cls: 'wip' }],
    specs: [
        { key: 'Stages',    val: 'Message Oscillator → Buffer → VCO → Power Amplifier' },
        { key: 'Frequency', val: '111k – 5MHz' },
        { key: 'EDA Tool',  val: 'ADS' },
        { key: 'Status',    val: 'In progress' },
    ],
    body: `
        <p>This one is still in progress. The goal is a full FM transmitter chain including a message oscillator, buffer, voltage-controlled oscillator, and power amplifier.</p>
        <p><em>Check back once it's complete.</em></p>
    `
};

const projects = {
    'bjt-amp':        bjtAmp,
    'colpitts':       colpitts,
    'heart-pcb':      heartPcb,
    'am-transmitter': amTransmitter,
    'fm-transmitter': fmTransmitter,
};
