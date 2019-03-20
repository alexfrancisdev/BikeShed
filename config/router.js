const router = require('express').Router()

const user = require('../controllers/userCtrl')
const userAuth = require('../controllers/userAuthCtrl')
const mechanic = require('../controllers/mechanicCtrl')
const mechanicAuth = require('../controllers/mechanicAuthCtrl')
const secureRoute = require('../lib/secureRoute')
const service = require('../controllers/serviceCtrl')
const booking = require('../controllers/bookingCtrl')

//User
router.post('/user/register', userAuth.register)
router.post('/user/login', userAuth.login)

router.get('/user', user.index)
router.route('/user/:id')
  .get(user.show)

//Mechanic
router.post('/mechanic/register', mechanicAuth.register)
router.post('/mechanic/login', mechanicAuth.login)

router.get('/mechanic', mechanic.index)
router.route('/mechanic/:id')
  .get(mechanic.show)
router.get('/mechanic/:id/bookings', mechanic.bookings)
router.get('/mechanic/:id/bookings/current', mechanic.currentBookings)
router.get('/mechanic/:id/bookings/past', mechanic.pastBookings)
router.get('/mechanic/:id/bookings/with-mechanic', mechanic.withMechanic)

//Services
router.get('/services', service.index)
router.post('/services/new', secureRoute.mechanic, service.create)
router.route('/services/:id')
  .get(service.show)
  .put(secureRoute.mechanic, service.update)
  .delete(secureRoute.mechanic, service.delete)

//Bookings
router.get('/bookings', booking.index)
router.post('/bookings/new', secureRoute.user, booking.create)
router.route('/bookings/:id')
  .get(booking.show)
  .put(secureRoute.mechanic, booking.update)
  .delete(secureRoute.mechanic, booking.delete)
router.post('/bookings/:id/accept', booking.accept)
router.post('/bookings/:id/reject', booking.reject)
router.post('/bookings/:id/dropoff', booking.dropoff)
router.post('/bookings/:id/completed', booking.completed)
router.post('/bookings/:id/collected', booking.collected)
router.post('/bookings/:id/extras', booking.addExtra)
router.route('/bookings/:id/extras/:extraId')
  .put(booking.updateExtra)
  .delete(booking.deleteExtra)

module.exports = router
