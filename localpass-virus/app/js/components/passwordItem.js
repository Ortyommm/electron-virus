import renderPassModal from './passModal.js'
import renderPassEditModal from './passEditModal.js'
import { passStore } from '../Store.js'
import renderPassDeleteModal from './renderPassDeleteModal.js'

export default ({ isActive, passName, passData, fileName }) => {
  const stringData = JSON.stringify({
    passName,
    passData,
    fileName,
  })

  const $button = document.createElement('button')
  $button.type = 'button'
  $button.classList.add(
    'list-group-item',
    'list-group-item-action',
    isActive && 'active'
  )

  const $liDelete = document.createElement('li')
  $liDelete.innerHTML = `<a class="dropdown-item deletePass" href="#" data-filename="${fileName}">Удалить</a>`
  const $liEdit = document.createElement('li')
  $liEdit.innerHTML = `<a class="dropdown-item editPass" href="#">Редактировать</a>`

  $button.innerHTML = `
<div class="d-flex justify-content-between passwordItem">
  <div>${escapeHtml(passName)}</div>
  <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      Действия
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    </ul>
  </div>
</div>
`
  $button.onclick = (e) => {
    if (e.target.nodeName === 'DIV') renderPassModal({ passName, passData })
  }
  const $buttonMenu = $button.querySelector('.dropdown-menu')
  $buttonMenu.insertAdjacentElement('beforeend', $liDelete)
  $buttonMenu.insertAdjacentElement('beforeend', $liEdit)

  $liEdit.onclick = () => {
    renderPassEditModal({ passName, passData, fileName })
  }
  $liDelete.onclick = (e) => {
    console.log($liDelete)
    renderPassDeleteModal({
      passName,
      onClickFn: () => {
        passStore.delete(e.target.dataset.filename)
        updatePasswordPaths()
      },
    })
    // passStore.delete(e.target.dataset.filename)
    // updatePasswordPaths()
  }
  return $button
}
