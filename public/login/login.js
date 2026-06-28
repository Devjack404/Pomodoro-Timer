gsap.from(".container", {
  opacity: 0,
  y: 40,
  duration: 1,
});

gsap.from(".input-group", {
  opacity: 0,
  y: 20,
  stagger: 0.15,
  delay: 0.4,
});

gsap.from(".login-btn", {
  opacity: 0,
  scale: 0.8,
  delay: 0.9,
});
