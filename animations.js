/* 1.1 - THE GLITCH ENGINE: DATA DECODING EFFECT */
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

const runGlitchEffect = (element) => {
    let iteration = 0;
    const originalText = element.dataset.value;
    let interval = null;
    
    clearInterval(interval);
    
    interval = setInterval(() => {
        element.innerText = element.innerText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                    return originalText[index];
                }
                return letters[Math.floor(Math.random() * 26)];
            })
            .join("");
        
        if(iteration >= originalText.length) {
            clearInterval(interval);
        }
        
        iteration += 1 / 3;
    }, 30;
};

/* 1.2 - INTERSECTION OBSERVER: STAGGERED REVEAL */
const initRevealAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Add the visible class to trigger CSS transitions
                entry.target.classList.add('reveal-active');
                
                // If it's a glitch-text element, trigger the decoding effect
                if (entry.target.classList.contains('glitch-text')) {
                    runGlitchEffect(entry.target);
                }
                
                // Stop observing once revealed for performance
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Target all sections and specific headings
    document.querySelectorAll('section, .artifact-card, .audit-log-entry').forEach((el) => {
        el.classList.add('reveal-hidden');
        revealObserver.observe(el);
    });
};

/* 1.3 - PREPARING TEXT FOR DECODING */
document.querySelectorAll('.glitch-text').forEach(el => {
    el.dataset.value = el.innerText;
});

// Initialize on Load
window.addEventListener('load', () => {
    initRevealAnimations();
});
/* 2.1 - GRID PARALLAX: DEPTH SIMULATION */
const initGridParallax = () => {
    const grid = document.querySelector('.system-grid-overlay');
    
    window.addEventListener('mousemove', (e) => {
        if (!grid) return;
        
        // Calculate movement based on mouse position relative to center
        const x = (window.innerWidth / 2 - e.pageX) / 50;
        const y = (window.innerHeight / 2 - e.pageY) / 50;
        
        // Apply a subtle 3D transform to the background grid
        grid.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
};

/* 2.2 - TERMINAL TYPEWRITER: DATA STREAM */
const initTypewriter = () => {
    const focusBox = document.querySelector('.focus-box p');
    if (!focusBox) return;

    const text = focusBox.innerText;
    focusBox.innerText = '';
    let i = 0;

    const type = () => {
        if (i < text.length) {
            focusBox.innerText += text.charAt(i);
            i++;
            // Randomize typing speed slightly for human-realistic "Terminal" feel
            setTimeout(type, Math.random() * 20 + 10);
        }
    };

    // Trigger typewriter only when the section is revealed
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            type();
            observer.disconnect();
        }
    });

    observer.observe(focusBox);
};

/* 2.3 - PERFORMANCE HOOK: MOTION REDUCTION RESPECT */
const checkMotionPreference = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (!prefersReducedMotion.matches) {
        initGridParallax();
        initTypewriter();
    }
};

/* 2.4 - GLOBAL INITIALIZATION */
document.addEventListener('DOMContentLoaded', () => {
    checkMotionPreference();
    
    // Final UX Touch: Log initialization to the system console
    console.log("[SYSTEM] TELEMETRY_INITIALIZED: PARALLAX_ACTIVE // TYPEWRITER_READY");
});
