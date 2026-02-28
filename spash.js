/* ============================================
   RADSTRIX SPLASH SCREEN - CONTROLLER
   ============================================ */

(function () {

    // ============================
    // CONFIG - Ubah di sini aja
    // ============================
    const CONFIG = {
        redirectTo: 'main.html',    // ← file utama kamu
        totalDuration: 4500,        // total durasi splash (ms)
        loadingStart: 2300,         // kapan loading bar mulai (ms)
        loadingDuration: 1800,      // durasi loading bar (ms)
        particleCount: 40           // jumlah partikel
    };


    // ============================
    // PARTICLES GENERATOR
    // ============================
    function createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;

        const types = ['red', 'white', 'ember'];

        for (let i = 0; i < CONFIG.particleCount; i++) {
            const particle = document.createElement('div');
            const type = types[Math.floor(Math.random() * types.length)];
            const size = Math.random() * 3 + 1;

            particle.classList.add('particle', `particle--${type}`);

            particle.style.cssText = `
                left: ${Math.random() * 100}%;
                top: ${30 + Math.random() * 60}%;
                width: ${size}px;
                height: ${size}px;
                animation-delay: ${Math.random() * 4}s;
                animation-duration: ${3 + Math.random() * 3}s;
            `;

            container.appendChild(particle);
        }
    }


    // ============================
    // LOADING BAR ANIMATION
    // ============================
    function animateLoadingBar() {
        const fill = document.getElementById('loadingFill');
        const text = document.getElementById('loadingText');
        if (!fill || !text) return;

        const startTime = Date.now();
        const steps = [
            { at: 0,    width: 0,   label: 'Loading...' },
            { at: 0.15, width: 15,  label: 'Loading...' },
            { at: 0.3,  width: 30,  label: 'Initializing...' },
            { at: 0.5,  width: 55,  label: 'Preparing...' },
            { at: 0.7,  width: 75,  label: 'Almost ready...' },
            { at: 0.9,  width: 92,  label: 'Launching...' },
            { at: 1.0,  width: 100, label: 'Welcome!' }
        ];

        function update() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / CONFIG.loadingDuration, 1);

            // Find current step
            let currentStep = steps[0];
            for (let i = steps.length - 1; i >= 0; i--) {
                if (progress >= steps[i].at) {
                    currentStep = steps[i];
                    break;
                }
            }

            // Smooth width interpolation
            const smoothWidth = currentStep.width + 
                (progress - currentStep.at) * 20;

            fill.style.width = Math.min(smoothWidth, 100) + '%';
            text.textContent = currentStep.label;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                fill.style.width = '100%';
                text.textContent = 'Welcome!';
            }
        }

        requestAnimationFrame(update);
    }


    // ============================
    // PLAY SOUND (optional)
    // ============================
    function tryPlaySound() {
        const audio = document.getElementById('splash-sound');
        if (!audio) return;

        audio.volume = 0.3;
        audio.play().catch(() => {
            // Browser block autoplay - no problem
        });
    }


    // ============================
    // TRANSITION & REDIRECT
    // ============================
    function triggerTransition() {
        const screen = document.getElementById('transitionScreen');
        if (screen) {
            screen.classList.add('active');
        }

        // Redirect after fade
        setTimeout(() => {
            window.location.href = CONFIG.redirectTo;
        }, 800);
    }


    // ============================
    // INIT - Jalankan semua
    // ============================
    function init() {
        // 1. Bikin partikel
        createParticles();

        // 2. Coba mainkan suara
        tryPlaySound();

        // 3. Mulai loading bar setelah delay
        setTimeout(() => {
            animateLoadingBar();
        }, CONFIG.loadingStart);

        // 4. Transisi & redirect
        setTimeout(() => {
            triggerTransition();
        }, CONFIG.totalDuration);
    }

    // Jalankan saat DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
