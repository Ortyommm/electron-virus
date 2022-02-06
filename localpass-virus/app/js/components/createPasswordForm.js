import passwordPair from './passwordPair.js'
import { passStore } from '../Store.js'
import { encrypt } from '../cryptoFunctions.js'

export default () => {
  let index = 0
  $('#contentMainPage').innerHTML = `
    <div class="alert alert-danger d-flex align-items-center mt-1 visually-hidden" style="left: 50%; transform: translateX(-50%)" id="errorPasswordFormContainer" role="alert">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            <div id="errorText">

            </div>
        </div>
        <div class="alert alert-success d-flex align-items-center mt-1 visually-hidden" style="left: 50%; transform: translateX(-50%)" id="successPasswordFormContainer" role="alert">
            <i class="bi bi-check me-2"></i>
            <div id="successText">
              
            </div>
        </div>
<div id="formData"></div>
<div id="controls">
  <div class="mt-2">
     <i class="bi bi-plus-circle-fill text-success" style="cursor: pointer; font-size: 1.2rem"></i>
  </div>
<button type="button" class="btn btn-success mt-5" id="savePassBtn">Сохранить</button>
</div>
`
  $('#formData').innerHTML = `
  <div class="form-floating w-100 mt-2">
    <input type="text" class="form-control" placeholder="Имя" id="passName">
    <label for="floatingInput">Имя</label>
   </div>
  ${passwordPair({ dataId: index })}
  `

  function openError(text) {
    $('#errorText').textContent = text
    $('#errorPasswordFormContainer').classList.remove('visually-hidden')

    setTimeout(() => {
      $('#errorPasswordFormContainer').classList.add('visually-hidden')
    }, 3000)
  }

  function openSuccess(text) {
    $('#successText').textContent = text
    $('#successPasswordFormContainer').classList.remove('visually-hidden')

    setTimeout(() => {
      $('#successPasswordFormContainer').classList.add('visually-hidden')
    }, 3000)
  }

  $('#savePassBtn').onclick = () => {
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
    passStore.set({ passName, passData }, { saveFileName: true })
    openSuccess('Успешно сохранено!')
  }

  //Add new key-value pair
  $('#controls i').onclick = () => {
    index++
    $('#formData').insertAdjacentHTML(
      'beforeend',
      passwordPair({ dataId: index })
    )
    $$('.keyValuePairControl').forEach((el) => {
      el.onclick = () => {
        if ($$('.keyValuePair').length === 1) return
        $(`#kvp${el.dataset.id}`).remove()
      }
    })
  }
}
