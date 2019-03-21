const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router = require('./config/router')
const { port, dbUri } = require('./config/environment')

const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
mongoose.connect(dbUri)

app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.json())

app.use('/api', router)

app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`))

const server = app.listen(port, () => console.log(`Express is listening on port ${port}`))

const socket = require('socket.io')
const io = socket(server)

io.on('connection', (socket) => {
  console.log(`socket is running, socket id: ${socket.id}`)

  socket.on('sendMessage', function(data) {
    io.emit('receiveMessage', data)
  })
})

module.exports = app
