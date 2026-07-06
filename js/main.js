const dotLogo = document.getElementById("dot-logo");
const hero = document.getElementById("hero");
const heroContent = document.getElementById("hero-content");

const settleHeroLayout = () => {
  if (!hero) {
    return;
  }

  hero.classList.add("is-settled");
};

const revealHero = () => {
  if (!hero) {
    return;
  }

  hero.classList.add("is-revealed");

  if (heroContent) {
    heroContent.setAttribute("aria-hidden", "false");
  }

  if (window.matchMedia("(max-width: 760px)").matches) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      settleHeroLayout();
    } else {
      window.setTimeout(settleHeroLayout, 820);
    }
  }
};

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
      [0, 1, 1, 1],
      [1, 0, 0, 0],
      [1, 0, 1, 1],
      [1, 0, 0, 1],
      [0, 1, 1, 1],
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

  const typingStepMs = 220;
  const letters = [...text]
    .map((char) => buildLetter(char))
    .filter((letter) => letter !== null);
  let currentIndex = 0;

  const typeNext = () => {
    if (currentIndex >= letters.length) {
      dotLogo.classList.remove("is-typing");
      window.setTimeout(revealHero, 420);
      return;
    }

    dotLogo.appendChild(letters[currentIndex]);
    currentIndex += 1;
    window.setTimeout(typeNext, typingStepMs);
  };

  typeNext();
} else {
  revealHero();
}

const revealTargets = document.querySelectorAll(
  ".section .section-en, .section .section-title, .section .card, .section .price-card, .section .global-connect, .section .challenge-solution, .flow li, .faq details, .contact-form, .option-board"
);

revealTargets.forEach((el, index) => {
  el.classList.add("reveal");
  if (el.matches(".card, .price-card")) {
    el.classList.add("reveal-lift");
  }
  if (el.matches(".section-en")) {
    el.classList.add("reveal-left", "reveal-fast");
  }
  if (el.matches(".section-title")) {
    el.classList.add("reveal-right");
  }
  el.style.setProperty("--reveal-delay", `${(index % 6) * 70}ms`);
});

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
    threshold: 0.15,
    rootMargin: "0px 0px -8% 0px",
  }
);

revealTargets.forEach((el) => observer.observe(el));

const contactForm = document.getElementById("contact-form");
const contactFormStatus = document.getElementById("contact-form-status");

if (contactForm && contactFormStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
    }

    contactFormStatus.textContent = "送信中…";
    contactFormStatus.classList.remove("is-error", "is-success");

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: new FormData(contactForm),
      });

      const result = await response.json();

      if (!response.ok || result.success !== "true") {
        throw new Error(result.message || "送信に失敗しました");
      }

      contactForm.reset();
      contactFormStatus.textContent =
        "送信しました。ご連絡ありがとうございます。";
      contactFormStatus.classList.add("is-success");
    } catch {
      contactFormStatus.textContent =
        "送信に失敗しました。時間をおいて再度お試しください。";
      contactFormStatus.classList.add("is-error");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}
