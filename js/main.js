const menuToggle = document.getElementById("menu-toggle");
const siteNav = document.getElementById("site-nav");
const navLinks = siteNav ? siteNav.querySelectorAll("a") : [];

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    siteNav.classList.toggle("open");
    const isOpen = siteNav.classList.contains("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const heroTitle = document.querySelector(".hero-title-only");

if (heroTitle) {
  const chars = heroTitle.textContent.trim().split("");
  heroTitle.textContent = "";

  chars.forEach((char, idx) => {
    const span = document.createElement("span");
    span.className = "hero-char";
    span.style.animationDelay = `${0.06 * idx}s`;
    span.textContent = char === " " ? "\u00A0" : char;
    heroTitle.appendChild(span);
  });
}
