const corpHeader = document.getElementById("corp-header");
const corpMenuBtn = document.getElementById("corp-menu-btn");
const corpMobileNav = document.getElementById("corp-mobile-nav");

if (corpHeader) {
  const onScroll = () => {
    corpHeader.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

if (corpMenuBtn && corpMobileNav) {
  corpMenuBtn.addEventListener("click", () => {
    const isOpen = corpMenuBtn.getAttribute("aria-expanded") === "true";
    corpMenuBtn.setAttribute("aria-expanded", String(!isOpen));
    corpMobileNav.hidden = isOpen;
  });

  corpMobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      corpMenuBtn.setAttribute("aria-expanded", "false");
      corpMobileNav.hidden = true;
    });
  });
}

const revealTargets = document.querySelectorAll(".company-page .reveal");

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target);
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -6% 0px",
  }
);

revealTargets.forEach((el) => observer.observe(el));
