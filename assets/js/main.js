const navbar = document.querySelector("#mainNav");
const revealItems = document.querySelectorAll(".reveal");
const filterButtons = document.querySelectorAll(".filter-chip");
const projectItems = document.querySelectorAll(".project-item");
const progressBars = document.querySelectorAll(".progress-bar");
const backToTopButton = document.querySelector("#backToTop");
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");
const currentYear = document.querySelector("#currentYear");

const toggleNavbarState = () => {
  if (!navbar) {
    return;
  }

  navbar.classList.toggle("is-scrolled", window.scrollY > 16);
};

toggleNavbarState();
window.addEventListener("scroll", toggleNavbarState);

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.16,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const skillObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      progressBars.forEach((bar) => {
        const width = bar.getAttribute("data-width");
        bar.style.width = `${width}%`;
      });

      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.35,
  }
);

const skillsPanel = document.querySelector(".skills-panel");
if (skillsPanel) {
  skillObserver.observe(skillsPanel);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    filterButtons.forEach((chip) => chip.classList.remove("active"));
    button.classList.add("active");

    projectItems.forEach((item) => {
      const category = item.getAttribute("data-category");
      const shouldShow = filter === "all" || category === filter;
      item.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

const updateBackToTop = () => {
  if (!backToTopButton) {
    return;
  }

  backToTopButton.classList.toggle("show", window.scrollY > 480);
};

updateBackToTop();
window.addEventListener("scroll", updateBackToTop);

if (backToTopButton) {
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      formStatus.textContent = "Please fill in all required fields correctly.";
      formStatus.style.color = "#b54708";
      contactForm.classList.add("was-validated");
      return;
    }

    const formData = new FormData(contactForm);
    const name = formData.get("name");

    formStatus.textContent = `Thanks ${name}. Your message is ready to be connected to a backend handler.`;
    formStatus.style.color = "#2c6f57";
    contactForm.reset();
    contactForm.classList.remove("was-validated");
  });
}
