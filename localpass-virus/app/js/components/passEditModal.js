import { decrypt, encrypt } from '../cryptoFunctions.js'
import passwordPair from './passwordPair.js'
import { passStore } from '../Store.js'

export default ({ passName, passData, fileName }) => {
  let htmlPasswords = ''
  let index = 0
  for (const key in passData) {
    const decryptedKey = decrypt(key, window.key)
    const decryptedValue = decrypt(passData[key], window.key)

    htmlPasswords += passwordPair({
      dataId: index,
      key: decryptedKey,
      value: decryptedValue,
    })
    index++
  }
  function renderHtml() {
    const html = `<div class="modal fade show" tabindex="-1" style="display: block;" role="dialog" aria-labelledby="passModalLabel" aria-modal="true" id="passEditModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <input id="passName" class="form-control" value="${passName}" placeholder="Имя"/>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <div class="alert alert-danger d-flex align-items-center mt-1 visually-hidden" style="left: 50%; transform: translateX(-50%)" id="errorPasswordFormContainer" role="alert">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            <div id="errorText">
              
            </div>
        </div>
      ${htmlPasswords}
      <div id="controls">
  <div class="mt-2">
     <i class="bi bi-plus-circle-fill text-success" style="cursor: pointer; font-size: 1.2rem"></i>
  </div>
<button type="button" class="btn btn-success mt-5" id="editPassBtn">Редактировать</button>
</div>
      </div>
     
    </div>
  </div>
</div>
<div class="modal-backdrop fade show"><div/>
`
    $('#modalRoot').innerHTML = html
    // createPassData()

    const $passModal = $('#passEditModal')

    // console.log($('.modal-backdrop'))

    function openError(text) {
      $('#errorText').textContent = text
      $('#errorPasswordFormContainer').classList.remove('visually-hidden')

      setTimeout(() => {
        $('#errorPasswordFormContainer').classList.add('visually-hidden')
      }, 3000)
    }

    $('#modalRoot').onclick = (e) => {
      console.log(e.target)
      if (e.target.classList.contains('btn-close')) {
        $passModal.remove()
        $('.modal-backdrop.fade').remove()
      }
    }

    $('#editPassBtn').onclick = () => {
      const passName = $('#passName').value
      if (!passName) {
        openError('Введите имя!')
        return
      }

      const keys = []
      $$('.form-control.key').forEach(($key) => keys.push($key.value.trim()))
      console.log({ keys: $$('.form-control.key') })
      if (keys.indexOf('') !== -1) {
        openError('Поля не должны быть пустыми!')
        return
      }
      const uniqueKeys = new Set(keys)
      if (uniqueKeys.size !== keys.length) {
        openError('Поля не должны повторяться!')
        return
      }

      const passData = {}
      for (let i = 0; i < index + 1; i++) {
        //key-value pair
        const el = $(`#kvp${i}`)
        if (!el) continue
        const key = encrypt(el.querySelector('.key').value, window.key)
        const value = encrypt(el.querySelector('.value').value, window.key)
        passData[key] = value
      }
      passStore.set({ passName, passData }, { saveFileName: true, fileName })
      window.updatePasswordPaths()
    }

    $('#controls i').onclick = () => {
      console.log('was here')
      index++
      htmlPasswords += passwordPair({ dataId: index })
      renderHtml()
      console.log(html)
      $$('.keyValuePairControl').forEach((el) => {
        el.onclick = () => {
          if ($$('.keyValuePair').length === 1) return
          $(`#kvp${el.dataset.id}`).remove()
        }
      })
    }
  }

  renderHtml()
}
