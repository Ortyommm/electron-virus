const http = require('http')
const path = require('path')

const express = require('express')
const WebSocket = require('ws')

require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') })

const app = express()

const server = http.createServer(app)

const webSocketServer = new WebSocket.Server({ server })

webSocketServer.on('connection', (ws) => {
  ws.on('message', (m) => {
    webSocketServer.clients.forEach((client) => client.send(m))
  })

  ws.on('error', (e) => ws.send(e))

  ws.send('Hi there, I am a WebSocket server')
})

app.get('/steal_password', function (req, res) {
  res.status(200).json({
    status: 'success',
    message: 'successfully stolen data',
  })
})
console.log(process.env.PORT)
server.listen(process.env.PORT, () => console.log('Server started'))
