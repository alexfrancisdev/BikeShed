const Booking = require('../models/booking')

function indexRoute(req, res, next) {
  Booking
    .find()
    .populate('service customer')
    .exec()
    .then(bookings => res.json(bookings))
    .catch(next)
}

function createRoute(req, res, next){
  req.body.customer = req.currentUser
  Booking
    .create(req.body)
    .then(booking => res.status(201).json(booking))
    .catch(next)
}

function showRoute(req, res, next){
  Booking
    .findById(req.params.id)
    .populate()
    .exec()
    .then(booking => res.json(booking))
    .catch(next)
}

function updateRoute(req, res, next){
  Booking
    .findById(req.params.id)
    .exec()
    .then(booking => {
      Object.assign(booking, req.body)
      return booking.save()
    })
    .then(booking => res.json(booking))
    .catch(next)
}

function deleteRoute(req, res, next){
  Booking
    .findById(req.params.id)
    .exec()
    .then(booking => booking.remove())
    .then(() => res.sendStatus(204))
    .catch(next)
}

function acceptBooking(req, res, next){
  Booking
    .findById(req.params.id)
    .then(booking =>{
      booking.accepted = true
      return booking.save()
    })
    .then(booking => res.json(booking))
    .catch(next)
}

function rejectBooking(req, res, next){
  Booking
    .findById(req.params.id)
    .then(booking =>{
      booking.rejected = true
      return booking.save()
    })
    .then(booking => res.json(booking))
    .catch(next)
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  accept: acceptBooking,
  reject: rejectBooking
}
