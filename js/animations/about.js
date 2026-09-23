const photoRevealItems = document.querySelectorAll("[data-photo-reveal]");

if (photoRevealItems.length) {
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
      threshold: 0.24,
    },
  );

  photoRevealItems.forEach((item, index) => {
    item.style.setProperty("--photo-delay", `${index * 110}ms`);
    observer.observe(item);
  });
}
