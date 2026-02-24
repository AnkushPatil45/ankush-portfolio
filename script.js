/* 1.1 - THEME ENGINE: DEFAULT-DARK LOGIC */
const initTheme = () => {
    const htmlElement = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");
    
    // Check local storage for existing preference
    const savedTheme = localStorage.getItem("audit_theme_preference");
    
    // Logic: If no saved preference exists, FORCE 'dark'. 
    // Otherwise, use the saved preference.
    if (!savedTheme) {
        htmlElement.setAttribute("data-theme", "dark");
        localStorage.setItem("audit_theme_preference", "dark");
    } else {
        htmlElement.setAttribute("data-theme", savedTheme);
    }
    
    // Update toggle button icon based on active theme
    updateToggleIcon(htmlElement.getAttribute("data-theme"));
};

/* 1.2 - ICON MANAGEMENT */
const updateToggleIcon = (theme) => {
    const themeToggle = document.getElementById("themeToggle");
    if (!themeToggle) return;
    
    // Senior UX: Using explicit labels for clarity within the 'Black Box' theme
    themeToggle.textContent = theme === "dark" ? "MODE_SELECT [☀]" : "MODE_SELECT [☾]";
};

/* 1.3 - INTERACTIVE TOGGLE */
const handleThemeToggle = () => {
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    // Apply new state
    htmlElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("audit_theme_preference", newTheme);
    
    // Update UI
    updateToggleIcon(newTheme);
    
    // UX Touch: Log state change to console for technical recruiters
    console.log(`[SYSTEM] THEME_CHANGE_DETECTED: SWAP TO ${newTheme.toUpperCase()}`);
};

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", handleThemeToggle);
    }
});
/* 2.1 - SYSTEM INTERACTION: CONSOLE IDENTITY */
const launchSystemLog = () => {
    console.clear();
    console.log(
        "%c ANKUSH PATIL // INFRASTRUCTURE AUDIT %c v2.0.4 ",
        "background: #3291ff; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px 0 0 4px;",
        "background: #1d1d1f; color: #888; font-weight: bold; padding: 4px 8px; border-radius: 0 4px 4px 0;"
    );
    console.log("[STATUS] ALL SYSTEMS OPERATIONAL");
    console.log("[LOC] TORONTO_HQ // 43.6532° N, 79.3832° W");
};

/* 2.2 - SMOOTH SCROLL PROTOCOL */
const initSmoothScroll = () => {
    // Select all links with hashes for internal navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

/* 2.3 - DYNAMIC STATUS MONITORING */
const monitorSystemHealth = () => {
    const statusText = document.querySelector('.nav-left .mono-text');
    
    // Subtle UX: Randomly vary the system status to simulate "Live" monitoring
    const statuses = ["ACTIVE", "SECURE", "OPTIMAL", "MONITORING"];
    
    setInterval(() => {
        if (statusText) {
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            statusText.textContent = `SYSTEM_STATUS: ${randomStatus}`;
        }
    }, 10000); // Update every 10 seconds for a "living" UI feel
};

/* 2.4 - INITIALIZATION */
document.addEventListener("DOMContentLoaded", () => {
    launchSystemLog();
    initSmoothScroll();
    monitorSystemHealth();
    
    // UX Touch: Fade in the body once the logic is ready to prevent layout shift
    document.body.style.opacity = "1";
});
