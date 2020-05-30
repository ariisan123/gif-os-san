const themeMenu = document.querySelector(".theme-changer");
const themeSelect = document.querySelector(".theme-select");
const darkTheme = document.querySelector('#dark-theme');
const lightTheme = document.querySelector('#light-theme');


themeMenu.addEventListener("click", () => {
  themeMenu.classList.toggle("changer-active");
  themeSelect.classList.toggle("theme-active");
});


darkTheme.addEventListener('click', () => {
  changeTheme(false, darkTheme, lightTheme);
  document.querySelector('body').className = 'dark';
});

lightTheme.addEventListener('click', () => {
  changeTheme(true, lightTheme, darkTheme)
  document.querySelector('body').className = 'light';
});
