export default ({ dataId, key, value }) => {
  if (key) {
    return `
  <div class="keyValuePair" id="kvp${dataId}">
  <div class="d-flex justify-content-between mt-2">
    <div class="form-floating w-25">
      <input type="text" class="form-control key" value="${key}" placeholder="Поле">
      <label for="floatingInput">Поле</label>
    </div>
    <div class="form-floating" style="width: 70%;">
      <textarea class="form-control textarea-controlled value" placeholder="Значение">${value}</textarea>
      <label for="floatingTextarea2">Значение</label>
    </div>
    <div class="keyValuePairControl align-self-center" data-id="${dataId}" >
        <i class="bi bi-dash-circle-fill text-danger" style="font-size: 1.2rem; cursor: pointer"></i>
    </div>
  </div>
</div>
  `
  }

  return `
<div class="keyValuePair" id="kvp${dataId}">
  <div class="d-flex justify-content-between mt-2">
    <div class="form-floating w-25">
      <input type="text" class="form-control key" placeholder="Поле">
      <label for="floatingInput">Поле</label>
    </div>
    <div class="form-floating" style="width: 70%;">
      <textarea class="form-control textarea-controlled value" placeholder="Значение"></textarea>
      <label for="floatingTextarea2">Значение</label>
    </div>
    <div class="keyValuePairControl align-self-center" data-id="${dataId}" >
        <i class="bi bi-dash-circle-fill text-danger" style="font-size: 1.2rem; cursor: pointer"></i>
    </div>
  </div>
</div>
`
}
