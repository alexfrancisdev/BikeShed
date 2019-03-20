const Mechanic = require('../models/mechanic')
const Booking = require('../models/booking')

function indexRoute(req, res, next) {
  Mechanic
    .find()
    .populate('services inProgress')
    .select('-password')
    .exec()
    .then(users => res.json(users))
    .catch(next)
}

function showRoute(req, res, next) {
  Mechanic
    .findById(req.params.id)
    .populate('services inProgress')
    .select('-password')
    .then(mechanic => {
      res.json(mechanic)
    })
    .catch(next)
}

function allBookings(req, res, next){
  const allBookings = []
  Booking
    .find()
    .populate('service')
    .then(bookings => {
      bookings.forEach(function(booking){
        if (booking.service.mechanic.toString() === req.params.id){
          allBookings.push(booking)
        }
      })
      res.json(allBookings)
    })
    .catch(next)
}

function currentBookings(req, res, next){
  const currentBookings = []
  Booking
    .find()
    .populate('service')
    .then(bookings => {
      bookings.forEach(function(booking){
        if (booking.service.mechanic.toString() === req.params.id && booking.rejected.toString() === 'false' && booking.collected.toString() === 'false'){
          currentBookings.push(booking)
        }
      })
      res.json(currentBookings)
    })
    .catch(next)
}

function pastBookings(req, res, next){
  const currentBookings = []
  Booking
    .find()
    .populate('service')
    .then(bookings => {
      bookings.forEach(function(booking){
        if (booking.service.mechanic.toString() === req.params.id && booking.collected.toString() === 'true'){
          currentBookings.push(booking)
        }
      })
      res.json(currentBookings)
    })
    .catch(next)
}

function withMechanic(req, res, next){
  const withMechanic = []
  Booking
    .find()
    .populate('service')
    .then(bookings => {
      bookings.forEach(function(booking){
        if (booking.service.mechanic.toString() === req.params.id && booking.withMechanic.toString() === 'true'){
          withMechanic.push(booking)
        }
      })
      res.json(withMechanic)
    })
    .catch(next)
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  bookings: allBookings,
  currentBookings: currentBookings,
  pastBookings: pastBookings,
  withMechanic: withMechanic
}
