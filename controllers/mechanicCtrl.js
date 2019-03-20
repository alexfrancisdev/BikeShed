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

module.exports = {
  index: indexRoute,
  show: showRoute,
  bookings: allBookings
}
