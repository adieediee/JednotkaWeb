// Services page only — page-specific ScrollTrigger scenes.
// [data-reveal] elements are already handled by js/animations/reveal.js.

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const timelineSteps = document.querySelectorAll(".services-timeline-step");
const timelineLine = document.querySelector(".services-timeline-line");

if (timelineSteps.length && !reduceMotion) {
  gsap.set(timelineSteps, { opacity: 0, y: 28 });

  ScrollTrigger.create({
    trigger: ".services-timeline",
    start: "top 78%",
    onEnter: () =>
      gsap.to(timelineSteps, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" }),
    onLeaveBack: () => gsap.set(timelineSteps, { opacity: 0, y: 28 }),
  });

  if (timelineLine) {
    gsap.fromTo(
      timelineLine,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".services-timeline",
          start: "top 75%",
          end: "bottom 65%",
          scrub: 0.6,
        },
      }
    );
  }
}

const whyItems = document.querySelectorAll(".services-why-item");

if (whyItems.length && !reduceMotion) {
  gsap.set(whyItems, { opacity: 0, y: 28 });

  ScrollTrigger.create({
    trigger: ".services-why-grid",
    start: "top 78%",
    onEnter: () =>
      gsap.to(whyItems, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" }),
    onLeaveBack: () => gsap.set(whyItems, { opacity: 0, y: 28 }),
  });
}
