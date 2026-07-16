/* MOLDACAMPO — main.js */
(function () {
    "use strict";

    /* Menu móvel */
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".main-nav");

    if (toggle && nav) {
        toggle.addEventListener("click", function () {
            var open = toggle.getAttribute("aria-expanded") === "true";
            toggle.setAttribute("aria-expanded", String(!open));
            toggle.setAttribute("aria-label", open ? "Abrir menu" : "Fechar menu");
            nav.classList.toggle("is-open", !open);
        });

        // Fechar o menu ao clicar num link (navegação por âncoras)
        nav.addEventListener("click", function (e) {
            if (e.target.closest("a")) {
                toggle.setAttribute("aria-expanded", "false");
                toggle.setAttribute("aria-label", "Abrir menu");
                nav.classList.remove("is-open");
            }
        });
    }

    /* Sombra no header ao fazer scroll */
    var header = document.querySelector(".site-header");
    if (header) {
        var onScroll = function () {
            header.classList.toggle("is-scrolled", window.scrollY > 10);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    }

    /* Animações de entrada (respeita prefers-reduced-motion via CSS) */
    var revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealEls.length) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

        revealEls.forEach(function (el) { observer.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }

    /* Ano do copyright sempre atualizado */
    document.querySelectorAll("#ano").forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });
})();
