function verifyTheme() {
  if (getLocalStorage('theme') == true) {
    document.querySelector('body').className = 'dark';
    document.querySelector('#dark-theme').classList.add('theme-enabled');
  } else {
    document.querySelector('body').className = 'light';
    document.querySelector('#light-theme').classList.add('theme-enabled')
    setLocalStorage('theme', false)
  }
}
window.onload = () => {
  verifyTheme()
}