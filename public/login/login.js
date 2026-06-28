gsap.from(".login-container", {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power3.out"
});

gsap.from(".input-group", {
    opacity: 0,
    y: 20,
    stagger: .15,
    delay: .4
});

gsap.from(".login-btn", {
    opacity: 0,
    scale: .9,
    delay: .8
});