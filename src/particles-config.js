particlesJS('particles-background', {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#48b5e8" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#b548e8",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out"
    }
  },
  interactivity: {
    detect_on: "window",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      repulse: { distance: 150, duration: 0.4 },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});