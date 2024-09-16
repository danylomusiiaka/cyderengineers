import confetti from "canvas-confetti";

export const triggerConfetti = () => {
  var count = 500;
  var defaults = {
    origin: { y: 0.7 }, // Start from near the bottom
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 120, // Increase spread for wider effect
    startVelocity: 55,
    origin: { x: 0, y: 0.7 }, // Start from the left edge
  });
  fire(0.2, {
    spread: 160, // Increase spread for wider effect
    origin: { x: 0.5, y: 0.7 }, // Center of the screen
  });
  fire(0.35, {
    spread: 200, // Increase spread for wider effect
    decay: 0.91,
    scalar: 0.8,
    origin: { x: 1, y: 0.7 }, // Start from the right edge
  });
  fire(0.1, {
    spread: 240, // Increase spread for wider effect
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    origin: { x: 0.5, y: 0.7 }, // Center of the screen
  });
  fire(0.1, {
    spread: 240, // Increase spread for wider effect
    startVelocity: 45,
    origin: { x: 0.5, y: 0.7 }, // Center of the screen
  });
};

