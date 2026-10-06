const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const progressBar = document.getElementById("progressBar");

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) root.dataset.theme = savedTheme;

themeBtn?.addEventListener("click", () => {
  const next = root.dataset.theme === "light" ? "dark" : "light";
  if (next === "dark") delete root.dataset.theme;
  else root.dataset.theme = next;
  localStorage.setItem("portfolio-theme", next);
});

menuBtn?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});

navLinks?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtn?.setAttribute("aria-expanded", "false");
}));

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${max ? (window.scrollY / max) * 100 : 0}%`;
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal, .section > .container, .skill-card, .project-card, .credential").forEach(el => {
  el.classList.add("reveal");
  observer.observe(el);
});

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card => {
      card.classList.toggle("hidden", filter !== "all" && !card.dataset.category.includes(filter));
    });
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
