document.addEventListener("DOMContentLoaded", () => {
  const brandEl = document.getElementById("logo");
  const original = brandEl.dataset.text;
  const chars = original.split("");
  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);
  brandEl.addEventListener("mouseenter", () => {
    brandEl.textContent = shuffle(chars).join("");
  });
  brandEl.addEventListener("mouseleave", () => {
    brandEl.textContent = original;
  });

  document.querySelectorAll(".product").forEach((card) => {
    card.addEventListener("click", () => {
      const modalId = card.dataset.modal;
      const modal = document.getElementById(modalId);
      if (modal) modal.style.display = "flex";
    });
  });

  document.querySelectorAll(".modal .close").forEach((btn) => {
    btn.addEventListener(
      "click",
      () => (btn.closest(".modal").style.display = "none")
    );
  });

  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) e.target.style.display = "none";
  });
});
