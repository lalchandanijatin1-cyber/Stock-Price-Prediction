/* =====================================================
   STOCKPREDICT — COMPARE.JS
   Vanilla JS interactions for the model comparison page.
   No data is calculated, modified, or faked here — all
   MSE/RMSE/R² values come from the backend template.
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------------------------------
       Respect the user's reduced-motion preference.
       Used to gate every animation below.
    -------------------------------------------------- */
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* ===================================================
       FEATURE 1 — SCROLL REVEAL
       Fade + slight upward move when a section/card first
       enters the viewport. Each element animates once.
    =================================================== */
    const revealSelectors = [
        ".content-section",
        ".winner-card",
        ".asset-comparison",
        ".metric-card",
        ".final-result",
        ".explanation-box",
        ".ridge-explanation",
        ".stat-card",
    ];

    const revealEls = document.querySelectorAll(revealSelectors.join(","));

    revealEls.forEach((el, index) => {
        el.classList.add("reveal");
        // small stagger so grouped cards don't all pop at once
        el.style.transitionDelay = prefersReducedMotion
            ? "0ms"
            : `${(index % 5) * 60}ms`;
    });

    if (prefersReducedMotion) {
        // show everything immediately, no observer needed
        revealEls.forEach((el) => el.classList.add("is-visible"));
    } else if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        // unobserve so the animation never restarts
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
        );

        revealEls.forEach((el) => revealObserver.observe(el));
    } else {
        // no IntersectionObserver support — just show content
        revealEls.forEach((el) => el.classList.add("is-visible"));
    }

    /* ===================================================
       FEATURE 2 — ACTIVE NAVIGATION
       This page's own "Comparison" link is already marked
       active by the Flask template. Since the page has no
       in-page anchor sections tied to nav items, we simply
       preserve that server-rendered active state and do not
       touch it — nothing to reassign here.
    =================================================== */
    // (Intentionally left as-is: the "Comparison" nav-link
    // keeps its active class from the template at all times.)

    /* ===================================================
       FEATURE 3 — TABLE ROW INTERACTION
       Subtle hover feedback on table rows. The .best-model
       row already has a distinct style in CSS and simply
       keeps it while other rows get a lightweight hover
       class for consistency.
    =================================================== */
    const tableRows = document.querySelectorAll(".table-container tbody tr");

    tableRows.forEach((row) => {
        row.addEventListener("mouseenter", () => {
            if (!row.classList.contains("best-model")) {
                row.classList.add("row-hover");
            }
        });
        row.addEventListener("mouseleave", () => {
            row.classList.remove("row-hover");
        });
    });

    /* ===================================================
       FEATURE 4 — WINNER CARD INTERACTION
       Adds a "focused" class on hover/focus for a subtle,
       single emphasis effect (styled in CSS).
    =================================================== */
    const winnerCards = document.querySelectorAll(".winner-card");

    winnerCards.forEach((card) => {
        card.addEventListener("mouseenter", () => card.classList.add("focused"));
        card.addEventListener("mouseleave", () => card.classList.remove("focused"));
        // keyboard users get the same emphasis via focus-within
        card.addEventListener("focusin", () => card.classList.add("focused"));
        card.addEventListener("focusout", () => card.classList.remove("focused"));
    });

    /* ===================================================
       FEATURE 5 — METRIC CARD EMPHASIS
       On hover, slightly emphasize the description text.
       (Visual styling lives in CSS via the .emphasized
       class; this just toggles it.)
    =================================================== */
    const metricCards = document.querySelectorAll(".metric-card");

    metricCards.forEach((card) => {
        const description = card.querySelector("p");
        if (!description) return;

        card.addEventListener("mouseenter", () => description.classList.add("emphasized"));
        card.addEventListener("mouseleave", () => description.classList.remove("emphasized"));
        card.addEventListener("focusin", () => description.classList.add("emphasized"));
        card.addEventListener("focusout", () => description.classList.remove("emphasized"));
    });

    /* ===================================================
       FEATURE 6 — FINAL RESULT SEQUENTIAL REVEAL
       When the final-result section enters the viewport,
       reveal the five "Asset → Ridge" items one after another
       with a small delay between each.
    =================================================== */
    const finalResult = document.querySelector(".final-result");
    const finalWinnerItems = document.querySelectorAll(".final-winners > div");

    const revealFinalWinnersSequentially = () => {
        finalWinnerItems.forEach((item, index) => {
            if (prefersReducedMotion) {
                item.classList.add("is-visible");
                return;
            }
            setTimeout(() => {
                item.classList.add("is-visible");
            }, index * 150);
        });
    };

    if (finalResult && finalWinnerItems.length) {
        if (prefersReducedMotion) {
            revealFinalWinnersSequentially();
        } else if ("IntersectionObserver" in window) {
            const finalObserver = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            revealFinalWinnersSequentially();
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.3 }
            );

            finalObserver.observe(finalResult);
        } else {
            revealFinalWinnersSequentially();
        }
    }

});