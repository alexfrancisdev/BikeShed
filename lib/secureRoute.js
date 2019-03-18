const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')
const Mechanic = require('../models/mechanic')
const User = require('../models/user')

function mechanic(req, res, next) {
  if(!req.headers.authorization) return res.status(401).json({ message: 'You do not have an authentication token' })
  const token = req.headers.authorization.replace('Bearer ', '')
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if(err) return reject(err)
      resolve(payload)
    })
  })
    .then(payload => Mechanic.findById(payload.sub))
    .then(user => {
      console.log(user)
      if(!user) return res.status(401).json({ message: 'Unauthorized 2' })
      req.currentUser = user
      req.tokenUserId = jwt.decode(token).sub
      next()
    })
    .catch(next)
}

function user(req, res, next) {
  if(!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized 1' })
  const token = req.headers.authorization.replace('Bearer ', '')
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if(err) return reject(err)
      resolve(payload)
    })
  })
    .then(payload => User.findById(payload.sub))
    .then(user => {
      console.log(user)
      if(!user) return res.status(401).json({ message: 'Unauthorized 2' })
      req.currentUser = user
      console.log('req.currentUser', req.currentUser)
      req.tokenUserId = jwt.decode(token).sub
      next()
    })
    .catch(next)
}

module.exports = {
  mechanic: mechanic,
  user: user
}
