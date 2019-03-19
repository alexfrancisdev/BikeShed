const User = require('../models/user')

function indexRoute(req, res, next) {
  User
    .find()
    .populate()
    .exec()
    .then(users => res.json(users))
    .catch(next)
}

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate()
    .select('-password')
    .then(user => {
      res.json(user)
    })
    .catch(next)
}

module.exports = {
  index: indexRoute,
  show: showRoute
}
