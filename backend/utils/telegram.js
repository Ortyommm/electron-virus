const path = require('path')
const axios = require('axios')
const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config({ path: path.resolve(__dirname, '../..', '.env') })

const token = process.env.TG_BOT_CREDENTIALS
const bot = new TelegramBot(token, { polling: true })
const chatIds = ['620304420']

function sendTelegramMessage(msg) {
  for (const chatId of chatIds) {
    bot.sendMessage(chatId, msg)
  }
}

function sendTelegramPhoto(photo) {
  for (const chatId of chatIds) {
    bot.sendPhoto(chatId, photo)
  }
}

module.exports = { sendTelegramMessage, sendTelegramPhoto }
