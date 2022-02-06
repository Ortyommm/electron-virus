import { passStore } from '../Store.js'
import passwordItem from './passwordItem.js'

export default () => {
  let passwordsPaths = passStore.getFilesPaths()
  let passwords = []
  for (const path of passwordsPaths) {
    passwords.push(JSON.parse(passStore.get(path)))
  }

  function updatePasswordPaths() {
    passwordsPaths = passStore.getFilesPaths()
    passwords = []
    for (const path of passwordsPaths) {
      passwords.push(JSON.parse(passStore.get(path)))
    }
    renderPasswords(passwords)
  }

  window.updatePasswordPaths = updatePasswordPaths

  function renderPasswords(passwordsData) {
    const passwordsHtmlElements = passwordsData.map((pass) =>
      passwordItem(pass)
    )
    console.log({ passwordsHtmlElements })
    $('.list-group.mt-2').innerHTML = ''
    for (const element of passwordsHtmlElements) {
      $('.list-group.mt-2').insertAdjacentElement('beforeend', element)
    }
  }

  $('#contentMainPage').innerHTML = `<div class="input-group mb-3 mt-2">
  <span class="input-group-text" >
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
       viewBox="0 0 16 16">
  <path
      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>
</span>
        <input type="text" class="form-control" placeholder="Поиск" aria-label="Поиск"
               aria-describedby="basic-addon1" id="passSearch">
    </div>
    <div class="list-group mt-2">
    </div>`

  renderPasswords(passwords)
  $('#passSearch').oninput = (e) => {
    renderPasswords(
      passwords.filter((pass) =>
        pass.passName.toLowerCase().includes(e.target.value.toLowerCase())
      )
    )
  }
}
