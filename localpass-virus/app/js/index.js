import renderPinScreen from './components/pinScreen.js'
import renderMainPage from './components/mainPage.js'
import { pinStore } from './Store.js'
import { chooseTheme } from './darkThemeHelpers.js'

chooseTheme()

// function disableDarkTheme() {
//   styleLink.setAttribute('href', '')
// }

const isFirstLaunch = !pinStore.isExist('pin.key')
renderPinScreen({
  isFirstLaunch,
  renderMainPage,
})

// if (isFirstLaunch) localStorage.setItem("isNotFirstLaunch", "true");
