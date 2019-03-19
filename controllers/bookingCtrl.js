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

function dropoffBooking(req, res, next){
  Booking
    .findById(req.params.id)
    .then(booking =>{
      booking.withMechanic = true
      return booking.save()
    })
    .then(booking => res.json(booking))
    .catch(next)
}

function completedBooking(req, res, next){
  Booking
    .findById(req.params.id)
    .then(booking =>{
      booking.completed = true
      return booking.save()
    })
    .then(booking => res.json(booking))
    .catch(next)
}
function collectBooking(req, res, next){
  Booking
    .findById(req.params.id)
    .then(booking =>{
      booking.collected = true
      booking.withMechanic = false
      return booking.save()
    })
    .then(booking => res.json(booking))
    .catch(next)
}

function addExtras(req, res, next){
  Booking
    .findById(req.params.id)
    .populate()
    .exec()
    .then(booking => {
      booking.extraFees.push(req.body)
      return booking.save()
    })
    .then(booking => res.json(booking))
    .catch(next)
}

function updateExtras(req, res, next){
  console.log('id: ', req.params )
  Booking
    .findById(req.params.id)
    .populate()
    .then(booking => {
      const extra = booking.extraFees.id(req.params.extraId)
      Object.assign(extra, req.body)
      return booking.save()
    })
    .then(booking => res.json(booking))
    .catch(next)
}

function deleteExtra(req, res, next){
  Booking
    .findById(req.params.id)
    .populate()
    .then(booking => {
      const extra = booking.extraFees.id(req.params.extraId)
      extra.remove()
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
  reject: rejectBooking,
  dropoff: dropoffBooking,
  completed: completedBooking,
  collected: collectBooking,
  addExtra: addExtras,
  updateExtra: updateExtras,
  deleteExtra: deleteExtra
}
