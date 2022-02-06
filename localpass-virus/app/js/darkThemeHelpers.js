const styleLink = $('#theme-style')

function chooseTheme() {
  if (window.isDark) {
    enableDarkTheme()
  } else {
    disableDarkTheme()
  }
}

function enableDarkTheme() {
  styleLink.setAttribute('href', 'css/bootstrap-dark.min.css')
}

function disableDarkTheme() {
  styleLink.setAttribute('href', 'css/bootstrap.min.css')
}
export { chooseTheme, disableDarkTheme, enableDarkTheme, styleLink }
