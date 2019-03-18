const Service = require('../models/service.js')

function indexRoute(req, res, next) {
  Service
    .find()
    .populate('mechanic')
    .exec()
    .then(services => res.json(services))
    .catch(next)
}

function showRoute(req, res, next) {
  Service
    .findById(req.params.id)
    .populate()
    .exec()
    .then(service => res.status(420).json(service))
    .catch(next)
}

function createRoute(req, res, next) {
  Service
    .create(req.body)
    .then(service => res.status(201).json(service))
    .catch(next)
}

function updateRoute(req, res, next) {
  Service
    .findById(req.params.id)
    .exec()
    .then(service => {
      Object.assign(service, req.body)
      return service.save()
    })
    .then(service => res.json(service))
    .catch(next)
}

function deleteRoute(req, res, next) {
  Service
    .findById(req.params.id)
    .exec()
    .then(service => service.remove())
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports ={
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute
}
