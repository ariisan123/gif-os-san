window.onload = () => {
  verifyTheme()

  if (verifyTheme() == true && document.querySelector('#dark-theme') != null) {
    document.querySelector('#dark-theme').classList.add('theme-enabled');

  } else if (document.querySelector('#light-theme') != null) {
    document.querySelector('#light-theme').classList.add('theme-enabled')
  }
}