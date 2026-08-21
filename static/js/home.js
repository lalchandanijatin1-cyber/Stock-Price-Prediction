/* =====================================================
   STOCKPREDICT — HOME.JS
   Scroll-reveal animations + active nav highlighting
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------------------------------
       1. Tag elements that should animate on scroll
    -------------------------------------------------- */
    const revealSelectors = [
        ".disclaimer-box",
        ".content-section .workflow div",
        ".stock-card",
        ".process-step",
        ".limitation-box",
        ".model-card",
        ".selected-model",
        ".file-structure",
        ".file-explanation > div",
        ".summary-stats > div",
    ];

    const revealEls = document.querySelectorAll(revealSelectors.join(","));

    revealEls.forEach((el, index) => {
        el.classList.add("reveal");
        // small staggered delay for elements that share a row/group
        el.style.transitionDelay = `${(index % 5) * 70}ms`;
    });

    /* -------------------------------------------------
       2. IntersectionObserver — reveal on enter viewport
    -------------------------------------------------- */
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -60px 0px",
            }
        );

        revealEls.forEach((el) => observer.observe(el));
    } else {
        // fallback: no IntersectionObserver support
        revealEls.forEach((el) => el.classList.add("is-visible"));
    }

});