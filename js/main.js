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

const dotLogo = document.getElementById("dot-logo");

if (dotLogo) {
  const text = (dotLogo.dataset.text || "N.PROLOGUE").toUpperCase();

  const patterns = {
    N: [
      [1, 0, 0, 1],
      [1, 1, 0, 1],
      [1, 0, 1, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
    ],
    ".": [[0], [0], [0], [0], [1]],
    P: [
      [1, 1, 1, 0],
      [1, 0, 0, 1],
      [1, 1, 1, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
    ],
    R: [
      [1, 1, 1, 0],
      [1, 0, 0, 1],
      [1, 1, 1, 0],
      [1, 0, 1, 0],
      [1, 0, 0, 1],
    ],
    O: [
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [0, 1, 1, 0],
    ],
    L: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 1],
    ],
    G: [
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [1, 0, 1, 1],
      [1, 0, 0, 1],
      [0, 1, 1, 0],
    ],
    U: [
      [1, 0, 1],
      [1, 0, 1],
      [1, 0, 1],
      [1, 0, 1],
      [0, 1, 0],
    ],
    E: [
      [1, 1, 1],
      [1, 0, 0],
      [1, 1, 0],
      [1, 0, 0],
      [1, 1, 1],
    ],
  };

  const buildLetter = (char) => {
    const pattern = patterns[char];
    if (!pattern) {
      return null;
    }

    const letter = document.createElement("span");
    letter.className = "dot-letter";
    letter.style.setProperty("--w", String(pattern[0].length));
    letter.style.setProperty("--h", String(pattern.length));

    pattern.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (!cell) {
          return;
        }
        const dot = document.createElement("span");
        dot.className = "dot";
        dot.style.setProperty("--x", String(x));
        dot.style.setProperty("--y", String(y));
        letter.appendChild(dot);
      });
    });

    return letter;
  };

  dotLogo.innerHTML = "";
  dotLogo.classList.add("is-typing");

  [...text].forEach((char, index) => {
    const letter = buildLetter(char);
    if (letter) {
      letter.style.setProperty("--type-delay", `${index * 0.12}s`);
      dotLogo.appendChild(letter);
    }
  });

  const typingDurationMs = text.length * 120 + 350;
  window.setTimeout(() => {
    dotLogo.classList.remove("is-typing");
  }, typingDurationMs);
}
