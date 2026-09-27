// About page only — scroll-triggered blur reveal for [data-blur-reveal] items.
// Items inside a shared [data-blur-reveal-group] stagger relative to each other.

// Stagger cycles through a short wave instead of growing linearly with the
// group size — with large grids (e.g. the masonry project wall), a plain
// index * delay leaves late items sitting invisible for seconds.
const STAGGER_STEP_MS = 70;
const STAGGER_WAVE_SIZE = 6;

document.querySelectorAll("[data-blur-reveal-group]").forEach((group) => {
  const items = [...group.querySelectorAll("[data-blur-reveal]")];
  items.forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${(index % STAGGER_WAVE_SIZE) * STAGGER_STEP_MS}ms`);
  });
});

const revealItems = document.querySelectorAll("[data-blur-reveal]");

if (revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.2,
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

// Closing CTA — gradient panel blooms in via clip-path once scrolled into view.
// Observed target is the section, not the clipped panel itself: a target
// clipped to 0% has zero intersection area, so it would never be seen as
// intersecting and the observer that's supposed to un-clip it would never fire.
const ctaSection = document.querySelector("[data-cta-reveal]");

if (ctaSection) {
  const ctaObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        ctaObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.3 }
  );

  ctaObserver.observe(ctaSection);
}
