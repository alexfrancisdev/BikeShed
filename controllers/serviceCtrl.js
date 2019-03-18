const Service = require('../models/service.js')

function indexRoute(req, res, next) {
  Service
    .find()
    .populate('mechanic')
    .exec()
    .then(Services => res.json(Services))
    .catch(next)
}

function showRoute(req, res, next) {
  Service
    .findById(req.params.id)
    .populate('mechanic')
    .exec()
    .then(Service => res.json(Service))
    .catch(next)
}

function createRoute(req, res, next) {
  Service
    .create(req.body)
    .then(Service => res.status(201).json(Service))
    .catch(next)
}

// function updateRoute(req, res, next) {
//   Service
//     .findById(req.params.id)
//     .exec()
//     .then(Service => {
//       Object.assign(Service, req.body)
//       return Service.save()
//     })
//     .then(Service => res.json(Service))
//     .catch(next)
// }
//
// function deleteRoute(req, res, next) {
//   Service
//     .findById(req.params.id)
//     .exec()
//     .then(Service => Service.remove())
//     .then(() => res.sendStatus(204))
//     .catch(next)
// }

module.exports ={
  index: indexRoute,
  show: showRoute,
  create: createRoute
  // update: updateRoute,
  // delete: deleteRoute
}
