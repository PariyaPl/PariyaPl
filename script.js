const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const siteHeader = document.querySelector(".site-header");


navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetSection = document.querySelector(link.hash);
    if (!targetSection) return;

    event.preventDefault();
    const targetHeading = targetSection.querySelector("h1, h2") || targetSection;
    const headerOffset = siteHeader.offsetHeight + 24;
    const targetPosition = targetHeading.getBoundingClientRect().top + window.scrollY - headerOffset;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.history.pushState(null, "", link.hash);
    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  });
});

function updateCurrentSection() {
  const readingLine = window.scrollY + window.innerHeight * 0.35;
  let currentSection = sections[0];

  sections.forEach((section) => {
    if (section.offsetTop <= readingLine) currentSection = section;
  });

  navLinks.forEach((link) => {
    const isCurrent = link.hash === `#${currentSection.id}`;
    if (isCurrent) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

let updateQueued = false;

function queueCurrentSectionUpdate() {
  if (updateQueued) return;
  updateQueued = true;

  window.requestAnimationFrame(() => {
    updateCurrentSection();
    updateQueued = false;
  });
}

updateCurrentSection();
window.addEventListener("scroll", queueCurrentSectionUpdate, { passive: true });
window.addEventListener("resize", queueCurrentSectionUpdate);
