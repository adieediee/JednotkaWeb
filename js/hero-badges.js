const heroFrame = document.querySelector(".hero-frame");

if (heroFrame) {
  const updateHeroBadges = (event) => {
    const rect = heroFrame.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 22;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 18;

    heroFrame.style.setProperty("--hero-badge-x", `${x.toFixed(2)}px`);
    heroFrame.style.setProperty("--hero-badge-y", `${y.toFixed(2)}px`);
  };

  const resetHeroBadges = () => {
    heroFrame.style.setProperty("--hero-badge-x", "0px");
    heroFrame.style.setProperty("--hero-badge-y", "0px");
  };

  heroFrame.addEventListener("pointermove", updateHeroBadges);
  heroFrame.addEventListener("pointerleave", resetHeroBadges);
}
