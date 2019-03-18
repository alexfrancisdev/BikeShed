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

module.exports = {
  index: indexRoute
}
