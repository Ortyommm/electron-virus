const electron = require('electron')
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')

class Store {
  userDataPath = (electron.app || electron.remote.app).getPath('userData')

  constructor(dir) {
    this.path = path.join(this.userDataPath, dir)
    if (!fs.existsSync(this.path)) {
      fs.mkdirSync(this.path)
    }
  }

  get(file) {
    return fs.readFileSync(path.join(this.path, file))
  }

  delete(file) {
    return fs.unlinkSync(path.join(this.path, file))
  }

  isExist(file) {
    return fs.existsSync(path.join(this.path, file))
  }

  getFilesPaths() {
    return fs.readdirSync(this.path)
  }

  set(data, options) {
    let dataToSave

    const stringData = JSON.stringify(data)
    let fileName =
      options?.fileName ||
      crypto
        .createHash('sha512')
        .update(stringData)
        .digest('hex')
        .slice(0, 64) + '.json'
    // while (this.isExist(fileName)) {
    //   fileName += Math.floor(Math.random() * 10000)
    // }

    if (options.saveFileName) {
      dataToSave = JSON.stringify({ ...data, fileName })
    } else {
      dataToSave = JSON.stringify(data)
    }
    fs.writeFileSync(path.join(this.path, fileName), dataToSave)
  }
}

export const passStore = new Store('passwords')
export const pinStore = new Store('pin')
