/* =====================================================
   STOCKPREDICT — ABOUT.JS
   Vanilla JS interactions for the About page.
   Does not touch Flask/Jinja logic, review persistence,
   or the submitted form data in any way.
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------------------------------
       Respect the user's reduced-motion preference.
       Used throughout to gate animation-only behaviour.
    -------------------------------------------------- */
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* ===================================================
       FEATURE 1 — SCROLL REVEAL
       Fade + slight upward move when an element first enters
       the viewport. Runs once per element via unobserve().
    =================================================== */
    const revealSelectors = [
        ".content-section",
        ".highlight-card",
        ".technology-block",
        ".flow-node",
        ".connection-card",
        ".contact-card",
        ".review-card",
        ".final-disclaimer",
    ];

    const revealEls = document.querySelectorAll(revealSelectors.join(","));

    revealEls.forEach((el, index) => {
        el.classList.add("reveal");
        el.style.transitionDelay = prefersReducedMotion
            ? "0ms"
            : `${(index % 6) * 60}ms`;
    });

    if (prefersReducedMotion) {
        revealEls.forEach((el) => el.classList.add("is-visible"));
    } else if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
        );

        revealEls.forEach((el) => revealObserver.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add("is-visible"));
    }

    /* ===================================================
       FEATURE 2 — FLOWCHART ANIMATION
       Each .flow-node reveals with a small delay based on
       its position in the flowchart, so the sequence reads
       top-to-bottom like the data flow it represents.
       Arrows stay visible at all times (never hidden/animated).
    =================================================== */
    const flowNodes = document.querySelectorAll(".flow-node");

    if (flowNodes.length) {
        flowNodes.forEach((node, index) => {
            // override the generic reveal delay with a clearer
            // top-to-bottom stagger specific to the flowchart
            node.style.transitionDelay = prefersReducedMotion
                ? "0ms"
                : `${index * 90}ms`;
        });
    }

    /* ===================================================
       FEATURE 3 — TECHNOLOGY / MODEL ITEM INTERACTION
       Subtly emphasize a technology or model item on hover
       or keyboard focus. Purely visual — content is untouched.
    =================================================== */
    const techItems = document.querySelectorAll(
        ".technology-list li, .model-list li"
    );

    techItems.forEach((item) => {
        item.setAttribute("tabindex", "0");
        item.addEventListener("mouseenter", () => item.classList.add("tech-emphasized"));
        item.addEventListener("mouseleave", () => item.classList.remove("tech-emphasized"));
        item.addEventListener("focus", () => item.classList.add("tech-emphasized"));
        item.addEventListener("blur", () => item.classList.remove("tech-emphasized"));
    });

    /* ===================================================
       FEATURE 4 — CONTACT CARDS
       Subtle interaction only; URLs are never touched.
    =================================================== */
    const contactCards = document.querySelectorAll(".contact-card");

    contactCards.forEach((card) => {
        card.addEventListener("mouseenter", () => card.classList.add("card-active"));
        card.addEventListener("mouseleave", () => card.classList.remove("card-active"));
        card.addEventListener("focus", () => card.classList.add("card-active"));
        card.addEventListener("blur", () => card.classList.remove("card-active"));
    });

    /* ===================================================
       FEATURE 5 — REVIEW FORM VALIDATION
       Simple non-blocking inline validation. No alert().
       On success, the form submits normally to Flask —
       nothing here stores or fakes review data.
    =================================================== */
    const reviewForm = document.querySelector(".review-form");

    if (reviewForm) {
        const nameField = reviewForm.querySelector("#review_name");
        const textField = reviewForm.querySelector("#review_text");

        const clearFieldError = (field) => {
            const group = field.closest(".input-group");
            if (!group) return;
            group.classList.remove("field-error");
            const existingMessage = group.querySelector(".field-error-message");
            if (existingMessage) existingMessage.remove();
        };

        const showFieldError = (field, message) => {
            const group = field.closest(".input-group");
            if (!group) return;
            group.classList.add("field-error");

            let messageEl = group.querySelector(".field-error-message");
            if (!messageEl) {
                messageEl = document.createElement("span");
                messageEl.className = "field-error-message";
                group.appendChild(messageEl);
            }
            messageEl.textContent = message;
        };

        // clear a field's error as soon as the user starts fixing it
        [nameField, textField].forEach((field) => {
            if (!field) return;
            field.addEventListener("input", () => clearFieldError(field));
        });

        reviewForm.addEventListener("submit", (event) => {
            let firstInvalidField = null;

            if (nameField && nameField.value.trim() === "") {
                showFieldError(nameField, "Please enter your name.");
                firstInvalidField = firstInvalidField || nameField;
            } else if (nameField) {
                clearFieldError(nameField);
            }

            if (textField && textField.value.trim() === "") {
                showFieldError(textField, "Please write a short review.");
                firstInvalidField = firstInvalidField || textField;
            } else if (textField) {
                clearFieldError(textField);
            }

            if (firstInvalidField) {
                event.preventDefault();
                firstInvalidField.focus();
            }
            // otherwise: let the form submit normally to Flask
        });
    }

    /* ===================================================
       FEATURE 6 — REVIEW SUBMISSION FEEDBACK
       If the page already contains a success indicator after
       Flask redirects back (e.g. an element with the class
       ".review-success" rendered by the backend/template),
       gently reveal it. This does not invent or assume any
       backend data — it only animates an element if present.
    =================================================== */
    const successMessage = document.querySelector(".review-success");

    if (successMessage) {
        successMessage.classList.add("reveal");
        requestAnimationFrame(() => {
            requestAnimationFrame(() => successMessage.classList.add("is-visible"));
        });
    }

    /* ===================================================
       FEATURE 7 — ACTIVE NAVIGATION
       The "About" nav-link is already marked active by the
       Flask template, and this page has no in-page anchor
       sections tied to nav items, so that server-rendered
       state is left untouched here.
    =================================================== */
    // (Intentionally left as-is — no JS override needed.)

});