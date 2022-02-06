export default ({ passName, onClickFn }) => {
  const html = `<div class="modal fade show" tabindex="-1" style="display: block;" role="dialog" aria-labelledby="passModalLabel" aria-modal="true" id="passDeleteModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="passModalLabel">${passName}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <p>Вы уверены, что хотите удалить пароль <strong>\"${escapeHtml(
        passName
      )}\"</strong>?</p>
      <button type="button" class="btn btn-danger" id="deletePassBtn">Удалить</button>
      </div>
     
    </div>
  </div>
</div>
<div class="modal-backdrop fade show"><div/>
`
  $('#modalRoot').innerHTML = html

  const $passDeleteModal = $('#passDeleteModal')

  // console.log($('.modal-backdrop'))

  function destroyModal() {
    $passDeleteModal.remove()
    $('.modal-backdrop.fade').remove()
  }

  $('#modalRoot').onclick = (e) => {
    // console.log(e.target)
    if (
      e.target.classList.contains('btn-close') ||
      e.target.classList.contains('modal')
    ) {
      destroyModal()
    }
  }
  $('#deletePassBtn').onclick = () => {
    onClickFn()
    destroyModal()
  }
}
