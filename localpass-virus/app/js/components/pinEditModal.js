import { passStore, pinStore } from '../Store.js'
import {
  decrypt,
  encrypt,
  scryptHash,
  scryptVerify,
} from '../cryptoFunctions.js'
const crypto = require('crypto')

export default ({ onClickFn }) => {
  const html = `<div class="modal fade show" tabindex="-1" style="display: block;" role="dialog" aria-labelledby="passModalLabel" aria-modal="true" id="pinEditModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="passModalLabel">Изменение пароля приложения</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="alert alert-danger d-flex align-items-center visually-hidden" id="errorPinEditContainer" role="alert">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            <div id="errorText">
              
            </div>
        </div>

    <form id="pinEditForm">
     <div class="form-floating 100">
            <input
                type="password"
                class="form-control"
                id="oldPin"
                placeholder="1234"
            />
            <label for="oldPin">Старый пароль</label>
        </div>
        <div class="form-floating 100 mt-2">
            <input
                type="password"
                class="form-control"
                id="newPin"
                placeholder="1234"
            />
            <label for="newPin">Новый пароль</label>
        </div>
        <div class="form-floating 100 mt-2">
            <input
                type="password"
                class="form-control"
                id="confirmNewPin"
                placeholder="1234"
            />
            <label for="confirmNewPin">Подтвердите пароль</label>
        </div>
      <button type="submit" class="btn btn-danger mt-2" id="deletePassBtn">Изменить</button>
     </form>
      </div>
     
    </div>
  </div>
</div>
<div class="modal-backdrop fade show"><div/>
`
  $('#modalRoot').innerHTML = html

  const $pinEditModal = $('#pinEditModal')

  const $oldPinInput = $('#oldPin')
  const $newPinInput = $('#newPin')
  const $confirmNewPinInput = $('#confirmNewPin')

  function destroyModal() {
    $pinEditModal.remove()
    $('.modal-backdrop.fade').remove()
  }

  $('#modalRoot').onclick = (e) => {
    console.log(e.target)
    if (e.target.classList.contains('btn-close')) {
      destroyModal()
    }
  }

  function blockInputs() {
    $oldPinInput.disabled =
      $newPinInput.disabled =
      $confirmNewPinInput.disabled =
        true
    setTimeout(() => {
      $oldPinInput.disabled =
        $newPinInput.disabled =
        $confirmNewPinInput.disabled =
          false
    }, 1000)
  }

  $('#pinEditForm').onsubmit = async (e) => {
    e.preventDefault()
    if (
      $oldPinInput.value.trim() === '' ||
      $newPinInput.value.trim() === '' ||
      $confirmNewPinInput.value.trim() === ''
    ) {
      openError('Все поля должны быть заполнены')
      return
    }

    if ($newPinInput.value.trim() !== $confirmNewPinInput.value.trim()) {
      openError('Подтверждаемый и новый пароли не совпадают')
      return
    }

    if ($newPinInput.value.trim() === $oldPinInput.value.trim()) {
      openError('Старый и новый пароли не должны совпадать')
      return
    }

    let hashedPinInFile
    if (!pinStore.isExist('pin.key')) {
      const hashedPin = await scryptHash($oldPinInput.value.trim())
      pinStore.set(hashedPin, { fileName: 'pin.key' })
    }
    hashedPinInFile = JSON.parse(pinStore.get('pin.key'))
    const isPinRight = await scryptVerify(
      $oldPinInput.value.trim(),
      hashedPinInFile
    )

    if (!isPinRight) {
      openError('Старый пароль введён неверно!')
      return
    }

    const newKey = crypto
      .createHash('sha512')
      .update($newPinInput.value.trim())
      .digest('hex')
      .slice(0, 32)

    const hashedPin = await scryptHash($newPinInput.value.trim())
    pinStore.set(hashedPin, { fileName: 'pin.key' })
    const filePaths = passStore.getFilesPaths().filter((filePath) => {
      return filePath.slice(-5) === '.json'
    })
    filePaths.forEach((filePath) => {
      const { fileName, passData, passName } = JSON.parse(
        passStore.get(filePath)
      )

      const newPassData = {}

      for (const key in passData) {
        const decryptedKey = decrypt(key, window.key)
        const decryptedValue = decrypt(passData[key], window.key)

        const newEncryptedKey = encrypt(decryptedKey, newKey)
        const newEncryptedValue = encrypt(decryptedValue, newKey)
        newPassData[newEncryptedKey] = newEncryptedValue
      }

      passStore.set({ fileName, passData: newPassData, passName }, { fileName })
    })
    window.key = newKey
    onClickFn()
    destroyModal()
  }

  function openError(text) {
    blockInputs()
    $('#errorText').textContent = text
    $('#errorPinEditContainer').classList.remove('visually-hidden')

    setTimeout(() => {
      $('#errorPinEditContainer').classList.add('visually-hidden')
    }, 3000)
  }
}
