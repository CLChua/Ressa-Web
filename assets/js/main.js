/* Ressa website — GSAP motion + product design gallery.
   Motion respects prefers-reduced-motion via gsap.matchMedia(); all
   animation targets transforms and opacity only. Content never depends on
   an animation finishing (see the render-throttle safety below). */
(function () {
  "use strict";

  /* Switch between original product design exports, without simulating app behavior. */
  function initProductPreview() {
    var buttons = document.querySelectorAll("[data-product-view]");
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var view = button.getAttribute("data-product-view");
        buttons.forEach(function (item) {
          item.setAttribute("aria-pressed", String(item === button));
        });
        document.querySelectorAll("[data-product-screen]").forEach(function (screen) {
          screen.hidden = screen.getAttribute("data-product-screen") !== view;
        });
      });
    });
  }

  /* ---------- GSAP motion ---------- */

  function initMotion() {
    if (!window.gsap) return;
    document.documentElement.classList.add("js-anim");

    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ duration: 0.7, ease: "power2.out" });

    /* header background state */
    var header = document.querySelector(".site-header");
    if (header) {
      var onScroll = function () {
        header.classList.toggle("scrolled", window.scrollY > 24);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    /* render-throttle safety: in a suspended/background tab rAF never fires,
       so "hide-then-animate" entrances would stay hidden. If no frame has
       painted shortly after setup, complete every non-looping animation
       immediately — content must never depend on an animation finishing. */
    var painted = false;
    requestAnimationFrame(function () { painted = true; });
    setTimeout(function () {
      if (painted) return;
      gsap.globalTimeline.getChildren(true, true, true).forEach(function (anim) {
        if (!anim.repeat()) anim.progress(1);
      });
      document.querySelectorAll("[data-reveal]").forEach(function (el) {
        el.style.opacity = "";
      });
    }, 900);

    var mm = gsap.matchMedia();

    mm.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        fullMotion: "(prefers-reduced-motion: no-preference)"
      },
      function (ctx) {
        var full = ctx.conditions.fullMotion;

        /* hero entrance: lines are hand-authored (.hero-line wraps both
           languages), so the entrance never disturbs the bilingual markup */
        var heroLines = document.querySelectorAll(".hero-title .hero-line > span");
        if (heroLines.length && full) {
          gsap.from(heroLines, {
            yPercent: 110,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.15
          });
        }
        var seq = document.querySelectorAll("[data-hero-seq]");
        if (seq.length && full) {
          gsap.from(seq, {
            y: 22,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.45,
            clearProps: "all"
          });
        }
        var stage = document.querySelector(".hero-stage");
        if (stage && full) {
          gsap.from(stage, {
            y: 34,
            opacity: 0,
            duration: 1.1,
            delay: 0.3,
            ease: "power3.out",
            clearProps: "all"
          });
        }

        /* hero glow breathing */
        var glow = document.querySelector(".hero-glow");
        if (glow && full) {
          gsap.to(glow, {
            scale: 1.12,
            opacity: 0.82,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }

        /* scroll reveals */
        var reveals = document.querySelectorAll("[data-reveal]");
        if (reveals.length) {
          if (full) {
            reveals.forEach(function (el) {
              gsap.fromTo(el,
                { opacity: 0, y: 34 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.85,
                  scrollTrigger: { trigger: el, start: "top 86%", once: true },
                  onComplete: function () { el.style.opacity = ""; }
                }
              );
            });
          } else {
            reveals.forEach(function (el) { el.style.opacity = ""; });
          }
        }

        /* feature visuals drift in slightly deeper */
        if (full) {
          document.querySelectorAll(".feature-viz").forEach(function (el) {
            gsap.fromTo(el,
              { opacity: 0, y: 54 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: { trigger: el, start: "top 82%", once: true }
              }
            );
          });
        }

        /* pricing cards rise with a beat between them */
        if (full) {
          document.querySelectorAll(".price-card").forEach(function (el, i) {
            gsap.fromTo(el,
              { opacity: 0, y: 44 },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                delay: i * 0.12,
                scrollTrigger: { trigger: ".pricing-grid", start: "top 82%", once: true }
              }
            );
          });
        }
      }
    );
  }

  function init() {
    initProductPreview();
    initMotion();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
