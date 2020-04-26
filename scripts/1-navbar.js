const themeMenu = document.querySelector(".theme-changer");
const themeSelect = document.querySelector(".theme-select");

themeMenu.addEventListener("click", () => {
  themeMenu.classList.toggle("changer-active");
  themeSelect.classList.toggle("theme-active");
});
