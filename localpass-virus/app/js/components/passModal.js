import { decrypt } from '../cryptoFunctions.js'

export default ({ passName, passData }) => {
  function createPassData() {
    const buttonsArr = []

    let htmlString = ''
    let index = 0
    for (const key in passData) {
      const decryptedKey = decrypt(key, window.key)
      const decryptedValue = decrypt(passData[key], window.key)

      const $button = document.createElement('button')
      $button.classList.add('btn', 'btn-outline-secondary')
      $button.type = 'button'
      $button.innerHTML = '<i class="bi bi-clipboard"></i>'
      $button.dataset.key = `b-${index}`
      $button.onclick = () => {
        navigator.clipboard.writeText(decryptedValue)
      }
      buttonsArr.push($button)

      htmlString += `
<tr>
<td><p class="text-break">${escapeHtml(decryptedKey)}</p></td> 
<td>
<div class="d-flex justify-content-between">
<p class="text-break">${escapeHtml(decryptedValue)}</p>
<div class="buttonContainer" data-key="b-${index}"></div>
</div>
</td>
</tr>`
      index++
    }
    $('.modal-body').insertAdjacentHTML(
      'beforeend',
      `<table class="table table-striped">
<thead>
    <tr>
      <th scope="col">Ключ</th>
      <th scope="col">Значение</th>
    </tr>
  </thead>
<tbody>${htmlString}</tbody>
</table>`
    )
    buttonsArr.forEach(($button) => {
      // console.log($button.dataset.key)
      $(`[data-key="${$button.dataset.key}"]`).append($button)
    })
  }

  const html = `<div class="modal fade show" tabindex="-1" style="display: block;" role="dialog" aria-labelledby="passModalLabel" aria-modal="true" id="passModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="passModalLabel">${escapeHtml(passName)}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      </div>
     
    </div>
  </div>
</div>
<div class="modal-backdrop fade show"><div/>
`
  $('#modalRoot').innerHTML = html
  createPassData()

  const $passModal = $('#passModal')

  // console.log($('.modal-backdrop'))

  $('#modalRoot').onclick = (e) => {
    console.log(e.target)
    if (
      e.target.classList.contains('btn-close') ||
      e.target.classList.contains('modal')
    ) {
      $passModal.classList.remove('show')
      $passModal.style.display = 'none'
      $passModal.removeAttribute('aria-modal')
      $passModal.removeAttribute('role')
      $passModal.setAttribute('aria-hidden', 'true')
      $('.modal-backdrop.fade').remove()
    }
  }
}
