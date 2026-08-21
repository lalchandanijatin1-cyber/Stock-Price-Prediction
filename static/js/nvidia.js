/* =====================================================
   STOCKPREDICT — NVIDIA.JS
   Prediction page interactions: scroll reveal, input states,
   toast notification. Shares behaviour across all stock pages.
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------------------------------
       1. Scroll-reveal animations
    -------------------------------------------------- */
    const revealSelectors = [
        ".disclaimer-box",
        ".prediction-form",
        ".prediction-result",
        ".feature-card",
        ".process-step",
        ".model-tags span",
        ".limitation-box",
    ];

    const revealEls = document.querySelectorAll(revealSelectors.join(","));

    revealEls.forEach((el, index) => {
        el.classList.add("reveal");
        el.style.transitionDelay = `${(index % 5) * 70}ms`;
    });

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
            { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
        );

        revealEls.forEach((el) => observer.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add("is-visible"));
    }

    /* -------------------------------------------------
       2. Input focus / filled states
    -------------------------------------------------- */
    const inputGroups = document.querySelectorAll(".input-group");

    inputGroups.forEach((group) => {
        const input = group.querySelector("input");
        if (!input) return;

        const syncFilled = () => {
            group.classList.toggle("filled", input.value.trim() !== "");
        };

        input.addEventListener("focus", () => group.classList.add("active"));
        input.addEventListener("blur", () => group.classList.remove("active"));
        input.addEventListener("input", syncFilled);

        // handle pre-filled values (e.g. browser autofill / back-navigation)
        syncFilled();
    });

    /* -------------------------------------------------
       3. Prediction toast (shown once per result)
    -------------------------------------------------- */
    const predictionResult = document.querySelector(".prediction-result");

    if (predictionResult) {
        const toast = document.createElement("div");
        toast.className = "prediction-toast";
        toast.setAttribute("role", "status");
        toast.innerHTML = `
            <strong>⚠ Prediction Notice</strong>
            <p>This prediction may be incorrect. Educational use only.</p>
        `;

        document.body.appendChild(toast);

        // trigger fade/slide in on next frame
        requestAnimationFrame(() => {
            requestAnimationFrame(() => toast.classList.add("show"));
        });

        // auto-dismiss after a few seconds
        const dismissDelay = 6000;
        const dismissTimer = setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 500);
        }, dismissDelay);

        // allow manual dismiss on click
        toast.addEventListener("click", () => {
            clearTimeout(dismissTimer);
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 500);
        });
    }

});