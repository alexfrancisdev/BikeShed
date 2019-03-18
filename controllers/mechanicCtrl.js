const Mechanic = require('../models/mechanic')

function indexRoute(req, res, next) {
  Mechanic
    .find()
    .populate('services')
    .select('-password')
    .exec()
    .then(users => res.json(users))
    .catch(next)
}

function showRoute(req, res, next) {
  Mechanic
    .findById(req.params.id)
    .populate('services')
    .select('-password -services.description')
    .then(mechanic => {
      res.json(mechanic)
    })
    .catch(next)
}

module.exports = {
  index: indexRoute,
  show: showRoute
}
