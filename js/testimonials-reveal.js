const testimonialCards = document.querySelectorAll(".testimonial-card");
const statsSection = document.querySelector(".stats-section");
const testimonialReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const testimonialStackedLayout = window.matchMedia("(max-width: 900px)");

const clampTestimonialProgress = (value) => Math.min(Math.max(value, 0), 1);

const setTestimonialProgress = (card, progress) => {
  const eased = 1 - Math.pow(1 - progress, 3);
  const blur = (1 - eased) * 24;
  const translateY = (1 - eased) * 90;
  const scale = 0.92 + eased * 0.08;
  const opacity = 0.12 + eased * 0.88;
  const style = window.getComputedStyle(card);
  const x = style.getPropertyValue("--testimonial-x").trim() || "0px";
  const y = style.getPropertyValue("--testimonial-y").trim() || "0px";
  const rotate = style.getPropertyValue("--testimonial-rotate").trim() || "0deg";

  card.style.opacity = opacity.toFixed(3);
  card.style.filter = `blur(${blur.toFixed(2)}px)`;
  card.style.transform = testimonialStackedLayout.matches
    ? "none"
    : `translate3d(${x}, calc(${y} + ${translateY.toFixed(2)}px), 0) rotate(${rotate}) scale(${scale.toFixed(3)})`;
};

const resetTestimonials = () => {
  testimonialCards.forEach((card) => {
    card.style.opacity = "";
    card.style.filter = "";
    card.style.transform = "";
  });

  if (statsSection) {
    statsSection.style.setProperty("--stats-grid-opacity", "1");
    statsSection.style.setProperty("--stats-grid-blur", "0px");
    statsSection.style.setProperty("--stats-grid-shift", "0px");
    statsSection.style.setProperty("--stats-grid-scale", "1");
    statsSection.style.setProperty("--testimonials-intro-opacity", "1");
    statsSection.style.setProperty("--testimonials-intro-shift", "0px");
  }
};

const updateTestimonialsOnScroll = () => {
  if (testimonialReduceMotion.matches) {
    resetTestimonials();
    return;
  }

  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const start = viewportHeight * 0.96;
  const end = viewportHeight * 0.34;

  if (statsSection) {
    const rect = statsSection.getBoundingClientRect();
    const focusStart = viewportHeight * 0.58;
    const focusEnd = viewportHeight * -0.05;
    const progress = clampTestimonialProgress((focusStart - rect.top) / (focusStart - focusEnd));

    statsSection.style.setProperty("--stats-grid-opacity", (1 - progress * 0.72).toFixed(3));
    statsSection.style.setProperty("--stats-grid-blur", `${(progress * 18).toFixed(2)}px`);
    statsSection.style.setProperty("--stats-grid-shift", `${(progress * -22).toFixed(2)}px`);
    statsSection.style.setProperty("--stats-grid-scale", (1 - progress * 0.035).toFixed(3));
    statsSection.style.setProperty("--testimonials-intro-opacity", (0.58 + progress * 0.42).toFixed(3));
    statsSection.style.setProperty("--testimonials-intro-shift", `${((1 - progress) * 28).toFixed(2)}px`);
  }

  testimonialCards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    const stagger = index * 0.055;
    const progress = clampTestimonialProgress((start - rect.top) / (start - end) - stagger);

    setTestimonialProgress(card, progress);
  });
};

let testimonialTicking = false;

const requestTestimonialsUpdate = () => {
  if (testimonialTicking) {
    return;
  }

  testimonialTicking = true;
  window.requestAnimationFrame(() => {
    updateTestimonialsOnScroll();
    testimonialTicking = false;
  });
};

if (testimonialCards.length) {
  updateTestimonialsOnScroll();
  window.addEventListener("scroll", requestTestimonialsUpdate, { passive: true });
  window.addEventListener("resize", requestTestimonialsUpdate);
  testimonialReduceMotion.addEventListener("change", updateTestimonialsOnScroll);
  testimonialStackedLayout.addEventListener("change", updateTestimonialsOnScroll);
}
