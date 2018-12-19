const Mechanic = require('../models/mechanic');

function indexRoute(req, res, next) {
  Mechanic
    .find()
    .populate()
    .exec()
    .then(users => res.json(users))
    .catch(next);
}

module.exports = {
  index: indexRoute
};
