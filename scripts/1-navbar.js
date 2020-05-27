const themeMenu = document.querySelector(".theme-changer");
const themeSelect = document.querySelector(".theme-select");
const darkTheme = document.querySelector('#dark-theme');
const lightTheme = document.querySelector('#light-theme');


themeMenu.addEventListener("click", () => {
  themeMenu.classList.toggle("changer-active");
  themeSelect.classList.toggle("theme-active");
});


darkTheme.addEventListener('click', () => {
  changeTheme(lightTheme, darkTheme)
})

lightTheme.addEventListener('click', () => {
  changeTheme(lightTheme, darkTheme)
})

window.onload = () => {
  verifyTheme();
  if (getLocalStorage('theme') == true) {
    lightTheme.classList.remove('theme-enabled');
    darkTheme.classList.add('theme-enabled');
  } else {
    darkTheme.classList.remove('theme-enabled');
    lightTheme.classList.add('theme-enabled');
  }
}
