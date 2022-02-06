import navItem from './navItem.js'
import renderPasswords from './passwords.js'
import renderCreatePasswordForm from './createPasswordForm.js'
import renderOptions from './options.js'

export default () => {
  let tabs = [
    { text: 'Пароли', isActive: true, id: 0 },
    { text: 'Создать пароль', isActive: false, id: 1 },
    { text: 'Опции', isActive: false, id: 2 },
  ]

  function setTabs(tabsData) {
    tabs = tabsData
    renderTabs()
    renderContent(tabsData)
  }

  function renderContent(tabsData) {
    console.log({ tabsData })
    const activeTabId = tabsData.find((tab) => tab.isActive).id
    switch (activeTabId) {
      case 0:
        renderPasswords()
        break
      case 1:
        renderCreatePasswordForm()
        break
      case 2:
        renderOptions()
        break
    }
  }

  function renderTabs() {
    const tabsHtml = tabs.map((tab) => navItem(tab)).join('')
    $('.nav.nav-tabs').innerHTML = tabsHtml
  }

  $('#root').innerHTML = `
<div class="container">
<ul class="nav nav-tabs">
  
</ul>
<div id="contentMainPage">

</div>

</div>`
  renderTabs()
  renderContent(tabs)
  // const popoverTriggerList = [].slice.call(
  //   document.querySelectorAll('[data-bs-toggle="popover"]')
  // )
  // const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  //   return new bootstrap.Popover(popoverTriggerEl)
  // })
  // console.log(popoverTriggerList)
  $('.nav.nav-tabs').onclick = (e) => {
    const newTabs = tabs.map((tab) => {
      tab.isActive = tab.id === +e.target.id
      return tab
    })
    setTabs(newTabs)
  }
}
