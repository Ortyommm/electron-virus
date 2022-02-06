const crypto = require('crypto')
const util = require('util')

const algorithm = 'aes-256-cbc'
function encrypt(string, key) {
  console.log(crypto.getCiphers())

  const iv = crypto.randomBytes(8).toString('hex')
  const cipher = crypto.createCipheriv(algorithm, key, iv)

  let encrypted = cipher.update(string, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return `${encrypted}:${iv}`
}

function decrypt(string, key) {
  const [encryptedString, iv] = string.split(':')
  const decipher = crypto.createDecipheriv(algorithm, key, iv)

  let decrypted = decipher.update(encryptedString, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

async function scryptHash(string, salt) {
  const saltInUse = salt || crypto.randomBytes(16).toString('hex')

  const hashBuffer = await util.promisify(crypto.scrypt)(string, saltInUse, 32)

  return `${hashBuffer.toString('hex')}:${saltInUse}`
}

async function scryptVerify(testString, hashAndSalt) {
  const [, salt] = hashAndSalt.split(':')
  return (await scryptHash(testString, salt)) === hashAndSalt
}

export { scryptHash, scryptVerify, encrypt, decrypt }
