import { pinStore } from '../Store.js'
import { scryptHash, scryptVerify } from '../cryptoFunctions.js'
const crypto = require('crypto')

export default ({ isFirstLaunch, renderMainPage }) => {
  function openError(text) {
    $('#errorText').textContent = text
    $('#errorPasswordFormContainer').classList.remove('visually-hidden')

    setTimeout(() => {
      $('#errorPasswordFormContainer').classList.add('visually-hidden')
    }, 3000)
  }

  const headerText = isFirstLaunch
    ? 'Создайте ваш пароль'
    : 'Введите ваш пароль...'
  const buttonText = isFirstLaunch ? 'Создать' : 'Войти'

  const confirmInput = isFirstLaunch
    ? `<div class="form-floating 100 mt-2">
            <input
                type="password"
                class="form-control"
                id="confirmPassword"
                placeholder="1234"
            />
            <label for="confirmPassword">Повторите пароль</label>
        </div>`
    : ''

  $('#root').innerHTML = `<div
        class="
        container
        d-flex
        align-items-center
        justify-content-center
        flex-column
      "
        style="height: 100vh"
    >
        <h1 class="mb-4">${headerText}</h1>
        <form id="enterForm">
        <div class="form-floating 100">
            <input
                type="password"
                class="form-control"
                id="pinCode"
                placeholder="1234"
            />
            <label for="pinCode">Пароль</label>
        </div>
        ${confirmInput}
        <button id="enterButton" type="button" class="btn btn-primary mt-2" disabled>${buttonText}</button>
        </form>
        <div style="height: 183px"><div class="alert alert-danger d-flex align-items-center mt-5 visually-hidden position-fixed" style="left: 50%; transform: translateX(-50%)" id="errorPasswordFormContainer" role="alert">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            <div id="errorText">
              
            </div>
        </div>
        </div>
    </div>`
  const $input = $('#pinCode')
  const $form = $('#enterForm')
  const $button = $('#enterButton')

  $form.onsubmit = $button.onclick = async (e) => {
    e.preventDefault()
    if (!$input.value.trim()) return
    if ($('#confirmPassword')) {
      if ($('#confirmPassword').value.trim() !== $input.value.trim()) {
        openError('Пароли не совпадают')
        return
      }
    }

    let hashedPinInFile
    if (!pinStore.isExist('pin.key')) {
      const hashedPin = await scryptHash($input.value.trim())
      pinStore.set(hashedPin, { fileName: 'pin.key' })
    }
    hashedPinInFile = JSON.parse(pinStore.get('pin.key'))
    const isPinRight = await scryptVerify($input.value.trim(), hashedPinInFile)
    if (isPinRight) {
      renderMainPage()
      window.key = crypto
        .createHash('sha512')
        .update($input.value.trim())
        .digest('hex')
        .slice(0, 32)
    } else {
      $input.disabled = true
      setTimeout(() => {
        $input.disabled = false
      }, 1000)

      openError('Неверный пароль')
    }
  }

  $input.oninput = (e) => {
    if (e.target.value.trim() !== '') {
      $button.removeAttribute('disabled')
    } else {
      $button.setAttribute('disabled', 'true')
    }
  }
}
