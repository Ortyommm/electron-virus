import { pinStore } from '../Store.js'
import pinEditModal from './pinEditModal.js'
import { disableDarkTheme, enableDarkTheme } from '../darkThemeHelpers.js'

const getPath = require('platform-folders/src/index')
console.log(getPath)

const util = require('util')
const glob = require('glob')
const path = require('path')
const fs = require('fs')
const electron = require('electron')
const JSZip = require('jszip')
const homeDir = require('os').homedir()

const userDataPath = (electron.app || electron.remote.app).getPath('userData')

export default () => {
  const zip = new JSZip()
  const passwords = zip.folder('passwords')

  $('#contentMainPage').innerHTML = `

<div class="mt-2">
        <div class="alert alert-success d-flex align-items-center mt-1 visually-hidden" style="left: 50%; transform: translateX(-50%)" id="successOptions" role="alert">
            <i class="bi bi-check me-2"></i>
            <div id="successText">
              
            </div>
        </div>
<h2>Пароли:</h2>
<div class="mt-3 justify-content-between row">
<div class="col-12">
<button class="btn btn-primary" id="createBackupBtn">Создать резервную копию</button>
<!--<button class="btn btn-secondary col-5" id="openBackupBtn">Открыть резервную копию</button>-->
</div>
<div class="col-12 mt-2">
<button class="btn btn-danger" id="changePasswordBtn">Изменить пароль приложения</button>
</div>
<hr class="mt-4">
<h2>Внешний вид:</h2>
<div class="col-12 mt-2">
<button class="btn btn-primary" id="themeToggle">Поменять тему</button>
</div>
</div>
<!--  <input class="form-control visually-hidden" type="file" id="openBackupInput" accept=".zip">-->

</div>
`
  $('#themeToggle').textContent = isDark ? 'Светлая тема' : 'Тёмная тема'
  $('#createBackupBtn').onclick = () => {
    util
      .promisify(glob)(path.join(userDataPath, '/passwords/*'), null)
      .then((files) => {
        for (const file of files.filter((file) => file.endsWith('.json'))) {
          const { name, ext } = path.parse(file)
          passwords.file(`${name}${ext}`, fs.readFileSync(file))
        }
        zip.generateAsync({ type: 'uint8array' }).then(function (content) {
          let index = 0
          const desktopPath = getPath.getDesktopFolder()
          console.log({ desktopPath })
          let passwordsPath = `${desktopPath}/lp-passwords (${index}).zip`
          while (fs.existsSync(passwordsPath)) {
            index++
            passwordsPath = `${desktopPath}/lp-passwords (${index}).zip`
          }
          util
            .promisify(fs.writeFile)(passwordsPath, content)
            .then(() =>
              openSuccess(
                'Резервная копия была успешно создана на вашем рабочем столе!'
              )
            )
        })
      })
  }

  function openSuccess(text) {
    $('#successText').textContent = text
    $('#successOptions').classList.remove('visually-hidden')

    setTimeout(() => {
      $('#successOptions').classList.add('visually-hidden')
    }, 3000)
  }

  $('#changePasswordBtn').onclick = () =>
    pinEditModal({
      onClickFn: () => openSuccess('Пароль приложения был успешно изменен!'),
    })
  $('#themeToggle').onclick = toggleTheme
  function toggleTheme() {
    window.isDark = !window.isDark
    if (window.isDark) {
      enableDarkTheme()
    } else {
      disableDarkTheme()
    }
    localStorage.setItem('isDark', JSON.stringify(window.isDark))
    $('#themeToggle').textContent = window.isDark
      ? 'Светлая тема'
      : 'Тёмная тема'
  }

  // $('#openBackupBtn').onclick = () => {
  //   $('#openBackupInput').click()
  // }
  //
  // $('#openBackupInput').oninput = async (e) => {
  //   const archivePath = $('#openBackupInput').files[0].path
  //   const zipFile = await util.promisify(fs.readFile)(archivePath)
  //   console.log(zipFile)
  // }
}
