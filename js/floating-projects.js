const clientsCta = document.querySelector(".clients-cta-section");

if (clientsCta) {
  const trailLayer = clientsCta.querySelector(".cursor-trail-layer");
  let lastTrail = 0;

  const updateFloatingCards = (event) => {
    const rect = clientsCta.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 28;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 28;

    clientsCta.style.setProperty("--float-x", `${x.toFixed(2)}px`);
    clientsCta.style.setProperty("--float-y", `${y.toFixed(2)}px`);

    if (!trailLayer || event.timeStamp - lastTrail < 42) {
      return;
    }

    lastTrail = event.timeStamp;

    const dot = document.createElement("span");
    const size = 10 + Math.random() * 18;

    dot.className = "cursor-trail-dot";
    dot.style.left = `${event.clientX - rect.left}px`;
    dot.style.top = `${event.clientY - rect.top}px`;
    dot.style.setProperty("--trail-size", `${size.toFixed(1)}px`);
    trailLayer.appendChild(dot);

    window.setTimeout(() => dot.remove(), 950);
  };

  const resetFloatingCards = () => {
    clientsCta.style.setProperty("--float-x", "0px");
    clientsCta.style.setProperty("--float-y", "0px");
  };

  clientsCta.addEventListener("pointermove", updateFloatingCards);
  clientsCta.addEventListener("pointerleave", resetFloatingCards);
}
